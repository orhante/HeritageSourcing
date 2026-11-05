const router = require('express').Router();
const db = require('../db');

// GET /api/products?status=available&category=knitwear&brand=Stone%20Island
router.get('/', (req, res) => {
  const where = ["status != 'hidden'"];
  const params = {};
  for (const key of ['status', 'category', 'brand', 'size']) {
    if (req.query[key]) {
      where.push(`${key} = @${key}`);
      params[key] = req.query[key];
    }
  }
  const rows = db.prepare(`
    SELECT id, slug, name, brand, variant, size, price_km, image, category, status
    FROM products WHERE ${where.join(' AND ')}
    ORDER BY CASE status WHEN 'available' THEN 0 WHEN 'reserved' THEN 1 ELSE 2 END, id
  `).all(params);
  res.json(rows);
});

// GET /api/products/:idOrSlug
router.get('/:key', (req, res) => {
  const row = db.prepare(`
    SELECT id, slug, name, brand, variant, size, price_km, image, category, status
    FROM products WHERE (id = ? OR slug = ?) AND status != 'hidden'
  `).get(req.params.key, req.params.key);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(row);
});

module.exports = router;
