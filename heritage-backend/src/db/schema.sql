CREATE TABLE IF NOT EXISTS products (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  brand       TEXT    NOT NULL,
  variant     TEXT,
  size        TEXT,
  price_km    INTEGER NOT NULL CHECK (price_km >= 0),
  image       TEXT,
  category    TEXT,
  status      TEXT    NOT NULL DEFAULT 'available'
              CHECK (status IN ('available','reserved','sold','hidden')),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS orders (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id      INTEGER NOT NULL REFERENCES products(id),
  price_km        INTEGER NOT NULL,
  full_name       TEXT    NOT NULL,
  phone           TEXT    NOT NULL,
  email           TEXT,
  street          TEXT    NOT NULL,
  city            TEXT    NOT NULL,
  postal_code     TEXT    NOT NULL,
  country         TEXT    NOT NULL,
  payment_method  TEXT    NOT NULL CHECK (payment_method IN ('cod','paypal','card')),
  payment_status  TEXT    NOT NULL DEFAULT 'unpaid'
                  CHECK (payment_status IN ('unpaid','claimed_paid','paid')),
  status          TEXT    NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','confirmed','shipped','completed','cancelled')),
  note            TEXT,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_status   ON orders(status);
