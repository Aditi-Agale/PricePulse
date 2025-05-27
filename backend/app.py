import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_apscheduler import APScheduler
from scraper import scrape_amazon
from emailer import send_email
import hashlib

# --- Flask Setup ---
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

class Config:
    SCHEDULER_API_ENABLED = True

app.config.from_object(Config())
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

# --- DB Helper ---
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# --- Alert Checker ---
def check_alerts(product_id, current_price, name, url):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, email, target_price FROM alerts WHERE product_id=? AND is_sent=0', (product_id,))
    alerts = cur.fetchall()

    for alert in alerts:
        alert_id, email, target_price = alert
        if current_price <= target_price:
            subject = f"Price Alert: {name} is ₹{current_price}"
            body = f"The product you're tracking has dropped to ₹{current_price}!\n\nLink: {url}"
            send_email(email, subject, body)
            cur.execute('UPDATE alerts SET is_sent=1 WHERE id=?', (alert_id,))
            print(f"[ALERT TRIGGERED] Email sent to {email}")

    conn.commit()
    conn.close()

# --- Scheduled Scraping Every 30 Minutes ---
def scheduled_scrape():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, url FROM products')
    products = cur.fetchall()

    for product in products:
        data, error = scrape_amazon(product['url'])
        if data and data['price'] is not None:
            print(f"[UPDATED] {data['name']} — ₹{data['price']}")
            cur.execute('UPDATE products SET name=?, image=?, current_price=? WHERE id=?',
                        (data['name'], data['image'], data['price'], product['id']))
            cur.execute('INSERT INTO price_history (product_id, price) VALUES (?, ?)', (product['id'], data['price']))
            check_alerts(product['id'], data['price'], data['name'], product['url'])

    conn.commit()
    conn.close()

scheduler.add_job(id='Scheduled Scrape', func=scheduled_scrape, trigger='interval', minutes=30)

# --- API Routes ---

@app.route('/api/products/track', methods=['POST', 'OPTIONS'])
def track_product():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    url = request.json.get('url')
    data, error = scrape_amazon(url)
    if error:
        return jsonify({'error': error}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM products WHERE url = ?', (url,))
    row = cur.fetchone()
    if row:
        product_id = row['id']
        cur.execute('UPDATE products SET name=?, image=?, current_price=? WHERE id=?',
                    (data['name'], data['image'], data['price'], product_id))
    else:
        cur.execute('INSERT INTO products (url, name, image, current_price) VALUES (?, ?, ?, ?)',
                    (url, data['name'], data['image'], data['price']))
        product_id = cur.lastrowid

    if data['price'] is not None:
        cur.execute('INSERT INTO price_history (product_id, price) VALUES (?, ?)', (product_id, data['price']))
    conn.commit()

    cur.execute('SELECT price, timestamp FROM price_history WHERE product_id=? ORDER BY timestamp', (product_id,))
    history = [{'price': row[0], 'timestamp': row[1]} for row in cur.fetchall()]
    conn.close()

    return jsonify({
        'id': product_id,
        'name': data['name'],
        'image': data['image'],
        'url': url,
        'currentPrice': data['price'],
        'priceHistory': history
    })

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM products WHERE id=?', (product_id,))
    product = cur.fetchone()
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    cur.execute('SELECT price, timestamp FROM price_history WHERE product_id=? ORDER BY timestamp', (product_id,))
    history = [{'price': row[0], 'timestamp': row[1]} for row in cur.fetchall()]
    conn.close()

    return jsonify({
        'id': product['id'],
        'name': product['name'],
        'image': product['image'],
        'url': product['url'],
        'currentPrice': product['current_price'],
        'priceHistory': history
    })

@app.route('/api/submit', methods=['POST', 'OPTIONS'])
def submit_url():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    url = request.json.get('url')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO products (url) VALUES (?)', (url,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Product submitted for tracking"})

@app.route('/api/history', methods=['GET'])
def get_history():
    url = request.args.get('url')
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM products WHERE url=?', (url,))
    product = cur.fetchone()
    if not product:
        return jsonify({"error": "Product not found"}), 404

    cur.execute('SELECT price, timestamp FROM price_history WHERE product_id=? ORDER BY timestamp', (product['id'],))
    history = [{'price': row[0], 'timestamp': row[1]} for row in cur.fetchall()]
    conn.close()
    return jsonify(history)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()
users = {}

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email in users:
        return jsonify({'error': 'User already exists'}), 400
    
    users[email] = password
    return jsonify({'email': email}), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if users.get(email) != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return jsonify({'email': email}), 200


@app.route('/api/alerts', methods=['POST', 'OPTIONS'])
def set_alert():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200

    data = request.json
    product_id = data.get('product_id')
    email = data.get('email')
    target_price = data.get('target_price')

    if not all([product_id, email, target_price]):
        return jsonify({'error': 'Missing required fields'}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO alerts (product_id, email, target_price, is_sent) VALUES (?, ?, ?, 0)',
                (product_id, email, target_price))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Alert set successfully'})

# --- Run Server ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)
