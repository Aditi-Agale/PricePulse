-- Drop old tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS price_history;
DROP TABLE IF EXISTS tracked_products;

-- Main product table: unique products by URL
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    name TEXT,
    image TEXT,
    current_price REAL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price history for each product (linked by product_id)
CREATE TABLE price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    price REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- Alerts table: tracks user emails & desired price thresholds per product
CREATE TABLE tracked_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    email TEXT,
    target_price REAL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    email TEXT NOT NULL,
    target_price REAL NOT NULL,
    is_sent INTEGER DEFAULT 0,
    FOREIGN KEY(product_id) REFERENCES products(id)
);