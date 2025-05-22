import requests
from bs4 import BeautifulSoup

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
