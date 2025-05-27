import sqlite3
import schedule
import time
from scraper import get_product_data
from emailer import send_email

DB = 'pricepulse.db'

def check_alerts(product_id, current_price, name, url):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute('SELECT id, email, target_price FROM alerts WHERE product_id=? AND is_sent=0', (product_id,))
    alerts = cur.fetchall()

    for alert in alerts:
        alert_id, email, target_price = alert
        if current_price <= target_price:
            subject = f"Price Alert: {name} is ₹{current_price}"
            body = f"The product you're tracking has dropped to ₹{current_price}!\n\nCheck it out here: {url}"
            send_email(email, subject, body)
            cur.execute('UPDATE alerts SET is_sent=1 WHERE id=?', (alert_id,))
            print(f"[ALERT TRIGGERED] Email sent to {email} for product ID {product_id}")

    conn.commit()
    conn.close()

def scrape_and_check_all_products():
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute("SELECT id, url, name FROM products")
    products = cur.fetchall()

    for product_id, url, name in products:
        try:
            data = get_product_data(url)
            current_price = data["price"]
            if current_price is None:
                print(f"[SKIPPED] No price found for {name}")
                continue

            # Update current price
            cur.execute("UPDATE products SET current_price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                        (current_price, product_id))
            # Insert into price history
            cur.execute("INSERT INTO price_history (product_id, price) VALUES (?, ?)",
                        (product_id, current_price))

            print(f"[UPDATED] {name} - ₹{current_price}")
            check_alerts(product_id, current_price, name, url)

        except Exception as e:
            print(f"[ERROR] Failed to scrape or update product {name}: {e}")

    conn.commit()
    conn.close()

# Schedule the job every 30 minutes
schedule.every(30).minutes.do(scrape_and_check_all_products)

print("✅ Scheduler started: checking prices and alerts every 30 minutes...")
while True:
    schedule.run_pending()
    time.sleep(1)
