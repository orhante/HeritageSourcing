// Add to collection.html:  <div id="in-stock-grid"></div>  and  <script src="js/collection.js"></script>
const API = window.HERITAGE_API || '/api';
const WA = '38763368323';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function card(p) {
  const sold = p.status !== 'available';
  const label = p.status === 'sold' ? '🔴SOLD🔴' : p.status === 'reserved' ? 'Reserved' : 'Ready to ship';
  const waText = encodeURIComponent(`I am interested in seeing more photos of the ${p.name} (${p.variant})`);
  return `
    <article class="product-card${sold ? ' is-sold' : ''}">
      <img src="${encodeURI(p.image)}" alt="${esc(p.name)} ${esc(p.variant)}" loading="lazy">
      <h2>${esc(p.name)}</h2>
      <p>Size <strong>${esc(p.size)}</strong> · ${esc(p.variant)} – ${label} – <strong>${p.price_km}KM</strong></p>
      <a class="btn-outline" href="https://wa.me/${WA}?text=${waText}" target="_blank" rel="noopener">Request a Closer Look</a>
      ${sold ? '<span class="btn-disabled">Own This Piece</span>'
             : `<a class="btn-primary" href="checkout.html?id=${p.id}">Own This Piece</a>`}
    </article>`;
}

(async () => {
  const grid = document.getElementById('in-stock-grid');
  try {
    const res = await fetch(`${API}/products`);
    const products = await res.json();
    grid.innerHTML = products.map(card).join('');
  } catch (e) {
    grid.innerHTML = '<p>Collection could not be loaded. Please contact us on WhatsApp.</p>';
  }
})();
