// Add to checkout.html: <script src="js/checkout.js"></script>
// Expected element ids (rename to match your HTML):
//   #summary-name, #summary-size, #summary-price
//   <form id="checkout-form"> with inputs name="fullName" "phone" "email" "street" "city" "postalCode" "country"
//   radio inputs name="paymentMethod" value="cod" | "paypal" | "card"
//   #paid-yes button (the "Yes, I've paid" button), #form-message for errors
const API = window.HERITAGE_API || '/api';
const productId = new URLSearchParams(location.search).get('id');
const $ = (s) => document.querySelector(s);
let currentOrderId = null;

async function loadProduct() {
  if (!productId) return showMsg('No product selected.');
  const res = await fetch(`${API}/products/${encodeURIComponent(productId)}`);
  if (!res.ok) return showMsg('This piece could not be found.');
  const p = await res.json();
  $('#summary-name').textContent = `${p.name} (${p.variant})`;
  $('#summary-size').textContent = `Size: ${p.size}`;
  $('#summary-price').textContent = `${p.price_km}KM`;
  if (p.status !== 'available') {
    showMsg('This piece is no longer available.');
    $('#checkout-form button[type=submit]').disabled = true;
  }
}

function showMsg(text) {
  const el = $('#form-message');
  if (el) el.textContent = text;
}

$('#checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.productId = Number(productId);

  const btn = e.target.querySelector('button[type=submit]');
  btn.disabled = true;
  try {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) {
      btn.disabled = false;
      return showMsg(body.fields ? `Please fill in: ${body.fields.join(', ')}` : body.error);
    }
    currentOrderId = body.orderId;
    if (data.paymentMethod === 'cod') {
      showMsg(`Order #${body.orderId} received. We will contact you on WhatsApp to confirm delivery.`);
    } else {
      showMsg(`Order #${body.orderId} created. Complete the payment of ${body.priceKM}KM, then confirm below.`);
      // TODO: open PayPal / card payment here
    }
  } catch {
    btn.disabled = false;
    showMsg('Network error, please try again.');
  }
});

$('#paid-yes')?.addEventListener('click', async () => {
  if (!currentOrderId) return;
  const res = await fetch(`${API}/orders/${currentOrderId}/paid`, { method: 'POST' });
  showMsg(res.ok ? 'Thank you — we are preparing your shipment.' : 'Could not confirm payment, contact us on WhatsApp.');
});

loadProduct();
