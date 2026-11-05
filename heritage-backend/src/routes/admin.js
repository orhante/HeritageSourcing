const crypto = require('crypto');
const router = require('express').Router();
const db = require('../db');

// Auth: header  Authorization: Bearer <ADMIN_TOKEN>
router.use((req, res, next) => {
  const expected = process.env.ADMIN_TOKEN || '';
  const given = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const ok = expected.length >= 16 && given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });
  next();
});

const PRODUCT_FIELDS = ['slug', 'name', 'brand', 'variant', 'size', 'price_km', 'image', 'category', 'status'];

// ---------- Products ----------
router.get('/products', (req, res) => {
  res.json(db.prepare('SELECT * FROM products ORDER BY id DESC').all());
});

router.post('/products', (req, res) => {
  const p = req.body || {};
  if (!p.name || !p.brand || !Number.isInteger(p.price_km)) {
    return res.status(400).json({ error: 'name, brand and integer price_km are required' });
  }
  p.slug ||= `${p.name}-${p.variant || ''}-${p.size || ''}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  try {
    const info = db.prepare(`
      INSERT INTO products (slug, name, brand, variant, size, price_km, image, category, status)
      VALUES (@slug, @name, @brand, @variant, @size, @price_km, @image, @category, @status)
    `).run({ variant: null, size: null, image: null, category: null, status: 'available', ...p });
    res.status(201).json(db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.patch('/products/:id', (req, res) => {
  const updates = Object.keys(req.body || {}).filter((k) => PRODUCT_FIELDS.includes(k));
  if (!updates.length) return res.status(400).json({ error: 'No valid fields' });
  try {
    const set = updates.map((k) => `${k} = @${k}`).join(', ');
    const info = db.prepare(`UPDATE products SET ${set}, updated_at = datetime('now') WHERE id = @id`)
      .run({ ...req.body, id: req.params.id });
    if (!info.changes) return res.status(404).json({ error: 'Product not found' });
    res.json(db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/products/:id', (req, res) => {
  // soft delete — keeps order history intact
  const info = db.prepare("UPDATE products SET status = 'hidden', updated_at = datetime('now') WHERE id = ?").run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: 'Product not found' });
  res.json({ ok: true });
});

// ---------- Orders ----------
router.get('/orders', (req, res) => {
  const status = req.query.status;
  const rows = db.prepare(`
    SELECT o.*, p.name AS product_name, p.variant AS product_variant, p.size AS product_size
    FROM orders o JOIN products p ON p.id = o.product_id
    ${status ? 'WHERE o.status = ?' : ''}
    ORDER BY o.created_at DESC
  `).all(...(status ? [status] : []));
  res.json(rows);
});

router.patch('/orders/:id', (req, res) => {
  const { status, payment_status } = req.body || {};
  const update = db.transaction(() => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) return { code: 404, body: { error: 'Order not found' } };

    db.prepare(`
      UPDATE orders SET status = COALESCE(?, status), payment_status = COALESCE(?, payment_status),
      updated_at = datetime('now') WHERE id = ?
    `).run(status ?? null, payment_status ?? null, order.id);

    // keep product status in sync with order lifecycle
    if (status === 'cancelled') {
      db.prepare("UPDATE products SET status = 'available', updated_at = datetime('now') WHERE id = ? AND status = 'reserved'").run(order.product_id);
    } else if (['shipped', 'completed'].includes(status)) {
      db.prepare("UPDATE products SET status = 'sold', updated_at = datetime('now') WHERE id = ?").run(order.product_id);
    }
    return { code: 200, body: db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id) };
  });

  try {
    const r = update();
    res.status(r.code).json(r.body);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
