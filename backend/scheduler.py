import sqlite3
import schedule
import time
from emailer import send_email

def check_alerts(product_id, current_price, name, url):
    conn = sqlite3.connect('database.db')
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

def scrape_and_check_all_products():
    """
    This function should include your scraping logic that updates the
    current price for all products, then calls check_alerts for each.
    """
    # Example static data, replace with actual scraping logic:
    products = [
        # (product_id, current_price, name, url)
        (1, 999, "Example Product 1", "http://example.com/product1"),
        (2, 1999, "Example Product 2", "http://example.com/product2"),
    ]

    for product in products:
        product_id, current_price, name, url = product
        check_alerts(product_id, current_price, name, url)

# Schedule the job every 30 minutes
schedule.every(30).minutes.do(scrape_and_check_all_products)

print("Starting scheduled price alert checks every 30 minutes...")
while True:
    schedule.run_pending()
    time.sleep(1)
