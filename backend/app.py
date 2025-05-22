import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape_amazon
from flask_apscheduler import APScheduler

# --- Flask setup ---
app = Flask(__name__)
CORS(app)

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

# --- Scheduled Scraping ---
def scheduled_scrape():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, url FROM products')
    products = cur.fetchall()
    for product in products:
        data, error = scrape_amazon(product['url'])
        if data and data['price'] is not None:
            print(f"[UPDATED] {data['name']} — ₹{data['price']}")
            cur.execute('UPDATE products SET current_price=? WHERE id=?', (data['price'], product['id']))
            cur.execute('INSERT INTO price_history (product_id, price) VALUES (?, ?)', (product['id'], data['price']))
    conn.commit()
    conn.close()

scheduler.add_job(id='Scheduled Scrape', func=scheduled_scrape, trigger='interval', minutes=60)

# --- API Routes ---
@app.route('/api/products/track', methods=['POST'])
def track_product():
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

if __name__ == '__main__':
    app.run(port=5000)
