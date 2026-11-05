require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: (process.env.CORS_ORIGINS || '*').split(',') }));
app.use(express.json({ limit: '100kb' }));

app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Serve the website from the project folder, plus the backend's js files
const siteRoot = path.join(__dirname, '..', '..');
app.use('/heritage-backend', (req, res) => res.status(404).end());
app.use(express.static(path.join(__dirname, '..', 'public'), { extensions: ['html'] }));
app.use(express.static(siteRoot, { extensions: ['html'], dotfiles: 'ignore' }));

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.code === 'EADDRINUSE'
      ? `Port ${PORT} is already in use. Stop the other server first: lsof -ti :${PORT} | xargs kill`
      : err);
    process.exit(1);
  }
  console.log(`Heritage backend running on http://localhost:${PORT}`);
});
