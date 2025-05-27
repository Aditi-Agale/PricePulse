-- Drop old tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS price_history;
DROP TABLE IF EXISTS tracked_products;
DROP TABLE IF EXISTS alerts;

-- Main product table: unique products by URL
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    name TEXT,
    image TEXT,
    current_price REAL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price history for each product
CREATE TABLE price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    price REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- Tracked products by users
CREATE TABLE tracked_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    email TEXT,
    target_price REAL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- Alerts when price drops below target
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    email TEXT NOT NULL,
    target_price REAL NOT NULL,
    is_sent INTEGER DEFAULT 0,
    FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  password_hash TEXT
);
CREATE TABLE user_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  product_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(product_id) REFERENCES products(id)
);
