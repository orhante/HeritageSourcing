const router = require('express').Router();
const db = require('../db');

const REQUIRED = ['productId', 'fullName', 'phone', 'street', 'city', 'postalCode', 'country', 'paymentMethod'];
const METHODS = ['cod', 'paypal', 'card'];

// POST /api/orders
router.post('/', (req, res) => {
  const b = req.body || {};
  const missing = REQUIRED.filter((k) => !String(b[k] ?? '').trim());
  if (missing.length) return res.status(400).json({ error: 'Missing fields', fields: missing });
  if (!METHODS.includes(b.paymentMethod)) return res.status(400).json({ error: 'Invalid payment method' });
  if (b.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return res.status(400).json({ error: 'Invalid email' });

  const placeOrder = db.transaction(() => {
    const product = db.prepare('SELECT id, price_km, status FROM products WHERE id = ?').get(b.productId);
    if (!product) return { code: 404, body: { error: 'Product not found' } };
    if (product.status !== 'available') return { code: 409, body: { error: 'This piece is no longer available' } };

    const info = db.prepare(`
      INSERT INTO orders (product_id, price_km, full_name, phone, email, street, city, postal_code, country, payment_method, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(product.id, product.price_km, b.fullName.trim(), b.phone.trim(), b.email?.trim() || null,
      b.street.trim(), b.city.trim(), String(b.postalCode).trim(), b.country.trim(), b.paymentMethod, b.note || null);

    db.prepare("UPDATE products SET status = 'reserved', updated_at = datetime('now') WHERE id = ?").run(product.id);
    return { code: 201, body: { orderId: info.lastInsertRowid, priceKM: product.price_km, status: 'pending' } };
  });

  const result = placeOrder();
  res.status(result.code).json(result.body);
});

// POST /api/orders/:id/paid  — customer clicks "Yes, I've paid"
router.post('/:id/paid', (req, res) => {
  const info = db.prepare(`
    UPDATE orders SET payment_status = 'claimed_paid', updated_at = datetime('now')
    WHERE id = ? AND payment_method IN ('paypal','card') AND payment_status = 'unpaid'
  `).run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Order not found or already updated' });
  res.json({ ok: true });
});

module.exports = router;
