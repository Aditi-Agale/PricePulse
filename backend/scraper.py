def scrape_amazon(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
    }
    try:
        r = requests.get(url, headers=headers, timeout=15)
        r.raise_for_status()
    except Exception as e:
        return None, f"Request failed: {e}"

    soup = BeautifulSoup(r.text, 'html.parser')
    name = soup.select_one('#productTitle')
    image = soup.select_one('#imgTagWrapperId img')
    price = soup.select_one('#priceblock_ourprice, #priceblock_dealprice, #priceblock_saleprice')

    if not name:
        return None, "Product title not found"
    if not image:
        return None, "Product image not found"

    price_value = None
    if price:
        price_text = price.get_text(strip=True).replace(',', '').replace('₹', '')
        try:
            price_value = float(price_text)
        except ValueError:
            price_value = None

    return {
        "name": name.get_text(strip=True),
        "image": image['src'],
        "price": price_value
    }, None
