require('dotenv').config();
const db = require('./index');

const IMG = 'SLIKE ZA STRANICU/';

// [name, brand, variant, size, priceKM, image, category, status]
const items = [
  ['Christian Louboutin Wallet', 'Christian Louboutin', 'Black Spike', 'Regular', 450, 'IMG4.png', 'wallets', 'available'],
  ['Christian Louboutin Sneakers', 'Christian Louboutin', 'Black Spike', '42', 800, 'IMG8.png', 'footwear', 'available'],
  ['Ermenegildo Zegna Espadrilles', 'Ermenegildo Zegna', 'Natural Canvas', '42', 800, 'IMG6.png', 'footwear', 'available'],
  ['Stone Island Cardigan', 'Stone Island', 'Grey', 'L', 300, 'IMG2.png', 'knitwear', 'available'],
  ['Christian Louboutin Sneakers', 'Christian Louboutin', 'Grey Spikes', '42', 700, 'IMG9.png', 'footwear', 'available'],
  ['Ralph Lauren Sweater', 'Ralph Lauren', 'Cable Knit Blue', 'L', 180, 'IMG3.png', 'knitwear', 'available'],
  ['Tommy Hilfiger Casual Shoes', 'Tommy Hilfiger', 'Leather', '42', 120, 'IMG5.png', 'footwear', 'available'],
  ['Yves Saint Laurent Sweater', 'Yves Saint Laurent', 'Monogram Logo', 'L', 200, 'IMG13.png', 'knitwear', 'available'],
  ['Ralph Lauren Sweater', 'Ralph Lauren', 'Quarter Zip Royal Blue', 'L', 150, 'IMG_4783.png', 'knitwear', 'available'],
  ['Ralph Lauren Polo Shirt', 'Ralph Lauren', 'Green White', 'L', 100, 'IMG14.png', 'polos-tshirts', 'available'],
  ['Lacoste Polo Shirt', 'Lacoste', 'Burgundy', 'L', 100, 'IMG15.png', 'polos-tshirts', 'available'],
  ['Ralph Lauren Polo Shirt', 'Ralph Lauren', 'Grey', 'L', 100, 'IMG7.png', 'polos-tshirts', 'available'],
  ['Billionaire Boys Club T-Shirt', 'Billionaire Boys Club', 'Pink Blue', 'L', 100, 'IMG12.png', 'polos-tshirts', 'available'],
  ['Tommy Hilfiger Quarter-Zip Sweater', 'Tommy Hilfiger', 'Red White Christmas', 'L', 100, 'IMG11.png', 'knitwear', 'available'],
  ['Moncler Padded Cable Knit Jacket', 'Moncler', 'Navy Knit', 'L', 500, 'IMG_4782.png', 'outerwear', 'available'],
  ['Ralph Lauren Polo Bear T-Shirt', 'Ralph Lauren', 'Grey Bear Print', 'L', 100, 'IMG_4785.png', 'polos-tshirts', 'available'],
  ['US Polo Assn. Padded Gilet', 'US Polo Assn.', 'Green', 'L', 100, 'IMG_4784.png', 'outerwear', 'sold'],
  ['Christian Louboutin Sneakers', 'Christian Louboutin', 'Low Top White Spikes', '42', 700, 'IMG10.png', 'footwear', 'available'],
  ['Hermès Neck Tie', 'Hermès', 'Silk Print', 'Normal', 170, 'IMG16.png', 'belts-ties', 'available'],
  ['Ralph Lauren Polo Shirt', 'Ralph Lauren', 'Blue', 'L', 120, 'IMG17.png', 'polos-tshirts', 'available'],
  ['Ralph Lauren Polo Shirt', 'Ralph Lauren', 'Black White', 'L', 120, 'IMG18.png', 'polos-tshirts', 'available'],
  ['Lyle and Scott Sweater', 'Lyle & Scott', 'Cotton Green', 'L', 120, 'IMG19.png', 'knitwear', 'available'],
  ['Massimo Dutti Quarter-Zip', 'Massimo Dutti', 'Wool-Cotton', 'L', 100, 'IMG20.png', 'knitwear', 'available'],
  ['Lacoste Polo Shirt', 'Lacoste', 'Sports Fit Green', 'L', 100, 'IMG21.png', 'polos-tshirts', 'available'],
  ['Moncler Cap', 'Moncler', 'Wool-Cotton', 'L', 100, 'IMG22.png', 'accessories', 'available'],
  ['Lyle Scott Jacket', 'Lyle & Scott', 'Wool-Cotton', 'L', 120, 'IMG23.png', 'outerwear', 'sold'],
  ['Off-White Hoodie', 'Off-White', 'Cotton', 'L', 600, 'IMG24.png', 'knitwear', 'available'],
  ['Ermenegildo Zegna Suit', 'Ermenegildo Zegna', 'Wool-Cotton', 'L', 1500, 'IMG25.png', 'tailoring', 'available'],
  ['Calvin Klein Sneakers', 'Calvin Klein', 'Leather', 'L', 230, 'IMG26.png', 'footwear', 'available'],
  ['Lyle Scott T-Shirt', 'Lyle & Scott', 'Cotton', 'L', 80, 'IMG29.png', 'polos-tshirts', 'available'],
  ['Stone Island Sweater', 'Stone Island', 'Cotton', 'L', 400, 'IMG27.png', 'knitwear', 'available'],
  ['Billionaire Boys Club T-Shirt', 'Billionaire Boys Club', 'Leather', 'XL', 200, 'IMG28.png', 'polos-tshirts', 'available'],
  ['Stone Island Zip-Up Hoodie', 'Stone Island', 'Light Blue', 'XL', 400, 'IMG30.png', 'knitwear', 'available'],
  ['Lyle & Scott Jacket', 'Lyle & Scott', 'Dark Blue', 'XL', 120, 'IMG31.png', 'outerwear', 'available'],
  ['CP Company Jacket', 'CP Company', 'Off-white', 'L', 400, 'IMG32.png', 'outerwear', 'available'],
  ['CP Company Jacket', 'CP Company', 'Deep Blue', 'L', 400, 'IMG33.png', 'outerwear', 'available'],
  ['Weekend Offender Polo Shirt', 'Weekend Offender', 'Long Sleeve', 'L', 110, 'IMG34.png', 'polos-tshirts', 'available'],
  ['Weekend Offender T-Shirt', 'Weekend Offender', 'Cotton White', 'L', 90, 'IMG35.png', 'polos-tshirts', 'available'],
  ['Weekend Offender T-Shirt', 'Weekend Offender', 'Cotton Black', 'XL', 100, 'IMG36.png', 'polos-tshirts', 'available'],
  ['Weekend Offender Polo Shirt', 'Weekend Offender', 'Multicolour', 'L', 100, 'IMG37.png', 'polos-tshirts', 'available'],
  ['Weekend Offender Polo Shirt', 'Weekend Offender', 'Light Blue', 'L', 100, 'IMG38.png', 'polos-tshirts', 'available'],
  ['Stone Island Sweater', 'Stone Island', 'Grey', 'L', 400, 'IMG39.png', 'knitwear', 'available'],
  ['Weekend Offender T-Shirt', 'Weekend Offender', 'White', 'L', 90, 'IMG40.png', 'polos-tshirts', 'available'],
  ['Stone Island x Supreme Hoodie', 'Stone Island', 'Dark Grey', 'L', 700, 'IMG41.png', 'knitwear', 'available'],
  ['Ralph Lauren Cable Knit Sweater', 'Ralph Lauren', 'Cream-White', 'L', 180, 'IMG42.png', 'knitwear', 'sold'],
  ['Ralph Lauren Cable Knit Quarter-Zip', 'Ralph Lauren', 'Navy', 'L', 180, 'IMG43.png', 'knitwear', 'sold'],
];

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const insert = db.prepare(`
  INSERT OR IGNORE INTO products (slug, name, brand, variant, size, price_km, image, category, status)
  VALUES (@slug, @name, @brand, @variant, @size, @price_km, @image, @category, @status)
`);

const run = db.transaction(() => {
  let added = 0;
  for (const [name, brand, variant, size, price, img, category, status] of items) {
    const slug = slugify(`${name}-${variant}-${size}`);
    added += insert.run({ slug, name, brand, variant, size, price_km: price, image: IMG + img, category, status }).changes;
  }
  return added;
});

console.log(`Seeded ${run()} products (${items.length} in list).`);
