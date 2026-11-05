// Loads the "Available – Ready to ship" products from the database.
// If the database can't be reached, the products already written in collection.html stay visible.
(function () {
  var WA_NUMBER = '38763368323';
  var grid = document.getElementById('in-stock-grid');
  if (!grid || !window.heritageFetch) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function card(p) {
    var available = p.status === 'available';
    var label = p.status === 'sold' ? '🔴SOLD🔴' : p.status === 'reserved' ? 'Reserved' : 'Ready to ship';
    var waText = encodeURIComponent('I am interested in seeing more photos of the ' + p.name + ' (' + p.variant + ')');
    var ownLink = available ? 'checkout.html?id=' + p.id : 'javascript:void(0)';
    return (
      '<article class="product-card" data-cat="' + esc(p.category) + '" data-size="' + esc(p.size) + '">' +
        '<figure class="product-card__media">' +
          '<img src="' + esc(encodeURI(p.image || '')) + '" alt="' + esc(p.name + ' ' + (p.variant || '')) + '" class="product-card__image product-image" loading="lazy" />' +
        '</figure>' +
        '<div class="product-card__body">' +
          '<h2 class="product-card__title">' + esc(p.name) + '</h2>' +
          '<p class="product-card__meta">Size <strong>' + esc(p.size) + '</strong> · ' + esc(p.variant) + ' – ' + label + ' – <strong>' + p.price_km + 'KM</strong></p>' +
          '<a href="https://wa.me/' + WA_NUMBER + '?text=' + waText + '" class="whatsapp-inquiry" target="_blank">Request a Closer Look</a>' +
          '<a href="' + ownLink + '" class="button button--primary">Own This Piece</a>' +
        '</div>' +
      '</article>'
    );
  }

  window.heritageFetch('/products')
    .then(function (r) {
      if (!r.ok || !Array.isArray(r.body) || !r.body.length) return;
      grid.innerHTML = r.body.map(card).join('');
    })
    .catch(function () { /* keep the products written in the HTML */ });
})();
