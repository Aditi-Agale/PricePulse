import requests
from bs4 import BeautifulSoup
from datetime import datetime
import sqlite3

DB_PATH = 'database.db'

# --- Scraper function for a single product URL ---
def scrape_amazon(url):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://www.amazon.in/",
        "DNT": "1",
        "Connection": "keep-alive",
    }

    try:
        r = requests.get(url, headers=headers, timeout=15)
        r.raise_for_status()
    except Exception as e:
        print(f"[ERROR] Request failed: {e}")
        return None, f"Request failed: {e}"

    soup = BeautifulSoup(r.text, 'html.parser')
    name = soup.select_one('#productTitle')
    image = soup.select_one('#imgTagWrapperId img')

    price = (
        soup.select_one('#priceblock_ourprice') or
        soup.select_one('#priceblock_dealprice') or
        soup.select_one('#priceblock_saleprice') or
        soup.select_one('.a-price .a-offscreen')  # Fallback
    )

    if not name or not image:
        print("[ERROR] Product title or image not found")
        return None, "Product unavailable or elements missing"

    try:
        price_text = price.get_text(strip=True).replace(',', '').replace('₹', '') if price else None
        price_value = float(price_text) if price_text else None
    except Exception as e:
        print(f"[ERROR] Failed to extract price: {e}")
        price_value = None

    return {
        "name": name.get_text(strip=True),
        "image": image['src'],
        "price": price_value
    }, None

# --- Main function to scrape all products from DB ---
def scrape_all_products():
    print("[SCRAPER] Running hourly scrape...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get all products
    cursor.execute("SELECT id, url FROM products")
    products = cursor.fetchall()

    for product_id, url in products:
        result, error = scrape_amazon(url)
        if result and result['price']:
            now = datetime.utcnow()

            # Update products table
            cursor.execute("""
                UPDATE products
                SET name = ?, image = ?, current_price = ?, updated_at = ?
                WHERE id = ?
            """, (result['name'], result['image'], result['price'], now, product_id))

            # Insert into price_history
            cursor.execute("""
                INSERT INTO price_history (product_id, price, timestamp)
                VALUES (?, ?, ?)
            """, (product_id, result['price'], now))

            print(f"[SCRAPER] Stored price for {url}: ₹{result['price']}")

            # --- Alert checking logic ---
            cursor.execute("""
                SELECT email, target_price FROM tracked_products
                WHERE product_id = ? AND target_price >= ?
            """, (product_id, result['price']))

            alerts = cursor.fetchall()
            for email, target_price in alerts:
                print(f"[ALERT] Target price hit for {url} → ₹{result['price']} (Threshold: ₹{target_price})")
                print(f"[ALERT] Would send email to: {email}")  # Placeholder for email sending

        else:
            print(f"[SCRAPER] Failed to get price for {url}: {error if error else 'Unknown error'}")

    conn.commit()
    conn.close()