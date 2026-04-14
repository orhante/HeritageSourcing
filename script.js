// Mobile-only animated counter for Satisfied Clients
document.addEventListener('DOMContentLoaded', function () {
  var counter = document.getElementById('mobile-counter');
  var container = document.getElementById('mobile-counter-container');
  if (!counter || !container) return;
  // Only run on mobile
  if (window.innerWidth > 768) return;
  var duration = 1200; // ms
  var start = 0;
  var end = 100;
  var startTime = null;
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 2);
  }
  function animateCounter(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = easeOut(progress);
    var value = Math.floor(start + (end - start) * eased);
    counter.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      counter.textContent = end;
    }
  }
  requestAnimationFrame(animateCounter);
});
// Custom navigation for hero buttons
document.addEventListener("DOMContentLoaded", function () {
  // Target the hero section buttons only
  var hero = document.querySelector('.hero__actions');
  if (hero) {
    // 'Featured pieces' button (open in-stock section on collection page)
    var featuredBtn = Array.from(hero.querySelectorAll('a')).find(a => a.textContent.trim().toLowerCase() === 'featured pieces');
    if (featuredBtn) {
      featuredBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'collection.html#in-stock';
      });
    }
    // 'View Collection' button (open collection page and scroll to main collection)
    var viewCollectionBtn = Array.from(hero.querySelectorAll('a')).find(a => a.textContent.trim().toLowerCase() === 'view collection');
    if (viewCollectionBtn) {
      viewCollectionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'collection.html#main-collection';
      });
    }
  }

  // Cash on Delivery Order Now button handler for collection.html
  var orderBtns = document.querySelectorAll('.order-now-btn');
  orderBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var product = btn.getAttribute('data-product');
      var size = btn.getAttribute('data-size');
      var price = btn.getAttribute('data-price');
      var url = `checkout.html?product=${encodeURIComponent(product)}&size=${encodeURIComponent(size)}&price=${encodeURIComponent(price)}`;
      window.location.href = url;
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var yearEl = document.getElementById("year");
  var scrollLinks = document.querySelectorAll("a.js-scroll[href^='#']");

  // Update footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Subtle header shadow when scrolling
  var lastKnownScrollY = 0;
  var ticking = false;

  function onScroll() {
    lastKnownScrollY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (header) {
          if (lastKnownScrollY > 12) {
            header.classList.add("site-header--scrolled");
          } else {
            header.classList.remove("site-header--scrolled");
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Smooth scroll for in-page navigation
  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId.charAt(0) !== "#") return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      var headerOffset = (header && header.offsetHeight) || 0;
      var elementRect = target.getBoundingClientRect();
      var absoluteY = elementRect.top + window.pageYOffset;
      var offsetPosition = absoluteY - headerOffset - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Product detail page logic (image gallery + dynamic content)
  var productDetailEl = document.querySelector(".product-detail");

  if (productDetailEl) {
    var PRODUCTS = {
      "alta-coat": {
        name: "Double-Face Cashmere Coats",
        category: "Outerwear",
        tagline:
          "A softly structured coat in pure double-face cashmere, cut in a clean, fluid silhouette.",
        fabric: [
          "100% double-face cashmere",
          "Lightly brushed finish for a soft hand",
          "Fully unlined construction for fluid drape",
          "Horn buttons and hand-finished seams",
        ],
        sizes: "IT 44, IT 46, IT 48, IT 50",
        detailsMain:
          "The Alta coat is designed to slip effortlessly over knitwear or tailoring. Minimal topstitching, discreet pockets, and a slightly dropped shoulder create a relaxed yet precise line.",
        detailsSub: "Made in Italy from responsibly sourced cashmere.",
        whatsappText:
          "I would like to inquire about the Alta Double-Face Cashmere Coat.",
        images: [
          {
            src: "https://i.pinimg.com/1200x/65/8e/fa/658efa731b953c335d90b82d2f1242e8.jpg",
            alt: "Alta Double-Face Cashmere Coat in sand hanging on a wooden hanger",
          },
          {
            src: "https://i.pinimg.com/1200x/84/d1/6e/84d16e3ea8b0fd55a3241062ef225f71.jpg",
            alt: "Alta coat on a wooden hanger against a neutral wall",
          },
          {
            src: "https://i.pinimg.com/736x/17/97/9d/17979d8bab1da34c9e1bc1adc08dc38f.jpg",
            alt: "Detail of Alta coat lapel and collar",
          },
          {
            src: "https://i.pinimg.com/736x/1a/20/33/1a20334a926a244a4354fdcfb55ebe41.jpg",
            alt: "Close-up of cashmere fabric texture",
          },
          {
            src: "https://i.pinimg.com/736x/63/41/26/6341264e4662c92abafbef5d6a87cadc.jpg",
            alt: "Back view of the Alta coat",
          },
        ],
      },
      "lido-knit-polo": {
        name: "Cashmere Knitwear Polos",
        category: "Knitwear",
        tagline:
          "A featherweight cashmere polo designed for effortless layering.",
        fabric: [
          "Cashmere-silk blend",
          "Fine-gauge knit for year-round wear",
          "Ribbed cuffs and hem for a clean line",
          "Mother-of-pearl buttons",
        ],
        sizes: "IT 44, IT 46, IT 48, IT 50",
        detailsMain:
          "The Lido knit polo sits neatly at the hip and pairs as easily with tailoring as with denim. A relaxed collar and subtle sheen give it a refined, easy presence.",
        detailsSub: "Spun in Italy from traceable cashmere and silk.",
        whatsappText:
          "I would like to inquire about the Lido Cashmere Knit Polo.",
        images: [
          {
            src: "https://i.pinimg.com/736x/53/75/b7/5375b789e80b2a23365484e50f19cd9a.jpg",
            alt: "Stack of lightweight knitwear in neutral tones",
          },
          {
            src: "https://i.pinimg.com/1200x/90/f1/bb/90f1bb3751615f3f2f440c819e98c948.jpg",
            alt: "Cashmere knit polo folded on a table",
          },
          {
            src: "https://i.pinimg.com/1200x/43/d2/e0/43d2e0659e12d692dd9e09fc237c6d26.jpg",
            alt: "Close-up of knit polo collar and placket",
          },
          {
            src: "https://i.pinimg.com/1200x/7a/22/87/7a2287f30bbea74c06ec4ecb99a886e7.jpg",
            alt: "Detail of ribbed hem of knit polo",
          },
          {
            src: "https://i.pinimg.com/1200x/35/23/db/3523db65525b5e8b49c60f829b992120.jpg",
            alt: "Knit polo styled with tailored trousers",
          },
        ],
      },
      "via-condotti-trouser": {
        name: "Linen Trousers and Shorts",
        category: "Tailoring",
        tagline:
          "A softly tailored linen trouser with an easy, elongated line.",
        fabric: [
          "100% pure linen",
          "Breathable plain weave",
          "Half-lined to the knee for comfort",
          "Horn buttons and clean waistband finish",
        ],
        sizes: "IT 44, IT 46, IT 48, IT 50",
        detailsMain:
          "The Via Condotti trouser is cut with a mid-rise and a gently tapered leg. Pressed creases sharpen the silhouette without sacrificing ease.",
        detailsSub: "Woven in Italy from European-grown linen.",
        whatsappText:
          "I would like to inquire about the Via Condotti Linen Trouser.",
        images: [
          {
            src: "https://i.pinimg.com/736x/1e/39/7d/1e397d7e3f010f257aeff987598a3b06.jpg",
            alt: "Tailored linen trousers on a neutral background",
          },
          {
            src: "https://i.pinimg.com/1200x/85/1f/9e/851f9e373d94272122705590c16db537.jpg",
            alt: "Linen trousers folded to show waistband detail",
          },
          {
            src: "https://i.pinimg.com/1200x/92/03/cc/9203cc7bc80277427dfe61f4669f3011.jpg",
            alt: "Side view of linen trouser leg and crease",
          },
          {
            src: "https://i.pinimg.com/1200x/7d/a2/92/7da29271c71d11a0697e9be303dbbc03.jpg",
            alt: "Close-up of linen fabric texture",
          },
          {
            src: "https://i.pinimg.com/736x/60/e9/1a/60e91a7ac136dfbee31f314535ba55d5.jpg",
            alt: "Linen trouser styled with knitwear",
          },
        ],
      },
      "portofino-crew": {
        name: "Cashmere Crews",
        category: "Knitwear",
        tagline: "A refined crewneck knit in whisper-light cashmere.",
        fabric: [
          "100% lightweight cashmere",
          "Fine rib at neckline, cuffs and hem",
          "Fully fashioned seams",
          "Softly brushed for comfort",
        ],
        sizes: "IT 44, IT 46, IT 48, IT 50",
        detailsMain:
          "The Portofino crew is designed to skim the body without clinging. Wear it alone or layered under tailoring for subtle warmth.",
        detailsSub: "Knitted in Italy using long-staple cashmere yarn.",
        whatsappText:
          "I would like to inquire about the Portofino Cashmere Crew.",
        images: [
          {
            src: "https://i.pinimg.com/1200x/c9/98/f6/c998f61f1d31e28e894bc0e526678414.jpg",
            alt: "Soft knit sweater folded on a neutral surface",
          },
          {
            src: "https://i.pinimg.com/1200x/ed/1c/57/ed1c57e3b9a1707e6eeb195c4ade2222.jpg",
            alt: "Cashmere crewneck draped over a chair",
          },
          {
            src: "https://i.pinimg.com/1200x/78/e5/3e/78e53e2a93ecbf7f20ab4c25031f86a1.jpg",
            alt: "Close-up of cashmere crewneck collar",
          },
          {
            src: "https://i.pinimg.com/1200x/26/5a/7a/265a7add90f5682fc56ad7ccb656fd01.jpg",
            alt: "Folded sleeves of cashmere crewneck",
          },
          {
            src: "https://i.pinimg.com/736x/a2/ff/9f/a2ff9f7713a17359b94160367fb38abe.jpg",
            alt: "Portofino crew styled with tailored trousers",
          },
        ],
      },
      "cortina-cardigan": {
        name: "Cashmere and Cotton Cardigan",
        category: "Knitwear",
        tagline: "A chunky cashmere cardigan with a cocooning fit.",
        fabric: [
          "100% chunky cashmere",
          "Hand-linked seams",
          "Ribbed cuffs, hem, and placket",
          "Horn buttons",
        ],
        sizes: "IT 44, IT 46, IT 48, IT 50",
        detailsMain:
          "The Cortina cardigan is cut relaxed through the body with slightly dropped shoulders. It layers easily over shirts or knitwear for added warmth.",
        detailsSub: "Crafted in Italy from plush, brushed cashmere yarn.",
        whatsappText:
          "I would like to inquire about the Cortina Cashmere Cardigan.",
        images: [
          {
            src: "https://i.pinimg.com/1200x/16/e7/0a/16e70af1e824f7cc5af494511afcfbee.jpg",
            alt: "Cream-colored knitwear on a wooden chair",
          },
          {
            src: "https://i.pinimg.com/1200x/19/cd/0e/19cd0ec62bb2cb668cfb18f0b54f0a1a.jpg",
            alt: "Cortina cardigan folded on a bench",
          },
          {
            src: "https://i.pinimg.com/1200x/e1/94/e8/e194e87c21180d749798afd4b5eecbd2.jpg",
            alt: "Close-up of cardigan knit texture",
          },
          {
            src: "https://i.pinimg.com/1200x/16/e7/0a/16e70af1e824f7cc5af494511afcfbee.jpg?2",
            alt: "Cardigan draped casually on a chair",
          },
          {
            src: "https://i.pinimg.com/1200x/16/e7/0a/16e70af1e824f7cc5af494511afcfbee.jpg?3",
            alt: "Cortina cardigan styled with trousers",
          },
        ],
      },
      "timeless-footwear": {
        name: "Timeless Footwear",
        category: "Footwear",
        tagline: "An edit of classic shoes designed to endure.",
        fabric: [
          "Premium calf leather upper",
          "Leather lining and insole",
          "Blake-stitched leather sole",
          "Hand-burnished finish",
        ],
        sizes: "EU 40, EU 41, EU 42, EU 43, EU 44 , EU 45",
        detailsMain:
          "Our footwear is shaped on a refined last that balances comfort with a sleek profile. Subtle details and considered proportions make each pair a wardrobe anchor.",
        detailsSub: "Made in Italy by third-generation shoemakers.",
        whatsappText: "I would like to inquire about the Timeless Footwear.",
        images: [
          {
            src: "https://i.pinimg.com/1200x/54/c4/29/54c429937f8a632174754f24c1aa9ac3.jpg",
            alt: "Elegant, classic footwear designed to never go out of style",
          },
          {
            src: "https://i.pinimg.com/1200x/0b/13/77/0b1377a73a7d0a58187ea561aaa3bc76.jpg",
            alt: "Leather shoes on a neutral backdrop",
          },
          {
            src: "https://i.pinimg.com/1200x/09/ec/74/09ec7455fd301c2f3bff0a535f7f69b2.jpg",
            alt: "Close-up of shoe stitching and welt",
          },
          {
            src: "https://i.pinimg.com/1200x/f3/de/33/f3de333417b5cd32570fb4461fd9d158.jpg",
            alt: "Pair of shoes viewed from above",
          },
          {
            src: "https://i.pinimg.com/1200x/78/ad/c0/78adc06777654eb1a9c939d07a753a57.jpg",
            alt: "Shoes styled with tailored trousers",
          },
        ],
      },
      "timeless-accessories": {
        name: "Timeless Accessories",
        category: "Accessories",
        tagline:
          "Quietly luxurious accessories designed to complement the collection.",
        fabric: [
          "Mixed metal hardware",
          "Premium leather or woven materials",
          "Subtle branding",
          "Considered proportions for everyday use",
        ],
        sizes: "One size / assorted dimensions",
        detailsMain:
          "Each accessory is designed to sit harmoniously alongside the collection. Clean lines and thoughtful details ensure enduring relevance.",
        detailsSub: "Crafted in small batches in Italian workshops.",
        whatsappText:
          "I would like to inquire about the Timeless Accessories.",
        images: [
          {
            src: "https://i.pinimg.com/1200x/82/41/60/8241608778cc519e9251522a8eab1543.jpg",
            alt: "Timeless accessories arranged on a table",
          },
          {
            src: "https://i.pinimg.com/736x/9d/71/54/9d7154cf2bd1d1e2358f5d83ffff1665.jpg",
            alt: "Close-up of metal accessories",
          },
          {
            src: "https://i.pinimg.com/736x/83/7b/41/837b41cef63dbf98d0981c3cae189eb7.jpg",
            alt: "Accessories styled with knitwear",
          },
          {
            src: "https://i.pinimg.com/1200x/6b/1d/f3/6b1df3bf020f095e6ad0e196dfb73ee5.jpg",
            alt: "Detail of clasp and hardware",
          },
          {
            src: "https://i.pinimg.com/1200x/35/53/5d/35535dc41b3f2c0e9190826209ba225e.jpg",
            alt: "Accessories on neutral background",
          },
        ],
      },
      "roma-blazer": {
        name: "Soft Tailored Blazer",
        category: "Tailoring",
        tagline:
          "A softly structured blazer in a wool-silk blend, cut for ease.",
        fabric: [
          "Wool-silk blend",
          "Half-canvas construction",
          "Light shoulder padding",
          "Horn buttons and hand-finished buttonholes",
        ],
        sizes: "IT 44, IT 46, IT 48, IT 50",
        detailsMain:
          "The Roma blazer is tailored with a relaxed, softly nipped waist and a gently extended lapel. It pairs easily with denim, flannel, or linen.",
        detailsSub: "Woven and tailored in Italy.",
        whatsappText:
          "I would like to inquire about the Soft Tailored Blazer.",
        images: [
          {
            src: "https://i.pinimg.com/1200x/2f/9d/d4/2f9dd4e7ce795b4382334e1dbd3dd0ea.jpg",
            alt: "Soft tailored blazer in neutral color",
          },
          {
            src: "https://i.pinimg.com/1200x/c4/a7/49/c4a74919a7df4f05b864860100139f56.jpg",
            alt: "Blazer hanging on a wooden hanger",
          },
          {
            src: "https://i.pinimg.com/1200x/ce/db/a2/cedba29558a4ecbd64b3f07c5fb86f9f.jpg",
            alt: "Close-up of blazer lapel and chest pocket",
          },
          {
            src: "https://i.pinimg.com/1200x/ec/fa/c7/ecfac75467936a000dd5b5e7b0d01c60.jpg",
            alt: "Blazer sleeve and cuff buttons",
          },
          {
            src: "https://i.pinimg.com/1200x/1f/8a/fa/1f8afa4649ee6347a2a530a8ce2350fb.jpg",
            alt: "Roma blazer styled with trousers",
          },
        ],
      },
    };

    var params = new URLSearchParams(window.location.search);
    var productId = params.get("id") || "alta-coat";
    var product = PRODUCTS[productId] || PRODUCTS["alta-coat"];

    var mainImageEl = document.getElementById("product-main-image");
    var categoryEl = document.getElementById("product-category");
    var titleEl = document.getElementById("product-title");
    var taglineEl = document.getElementById("product-tagline");
    var fabricListEl = document.getElementById("product-fabric-list");
    var sizesEl = document.getElementById("product-sizes");
    var detailsMainEl = document.getElementById("product-details-main");
    var detailsSubEl = document.getElementById("product-details-sub");
    var inquireLinkEl = document.getElementById("product-inquire-link");
    var prevBtn = document.querySelector(".product-detail__nav--prev");
    var nextBtn = document.querySelector(".product-detail__nav--next");

    if (product) {
      // Update document title based on product
      if (document && product.name) {
        document.title = product.name + " — Grisch Sourcing";
      }

      if (categoryEl) categoryEl.textContent = product.category;
      if (titleEl) titleEl.textContent = product.name;
      if (taglineEl) taglineEl.textContent = product.tagline;

      if (fabricListEl && Array.isArray(product.fabric)) {
        fabricListEl.innerHTML = "";
        product.fabric.forEach(function (item) {
          var li = document.createElement("li");
          li.textContent = item;
          fabricListEl.appendChild(li);
        });
      }

      if (sizesEl) sizesEl.textContent = product.sizes;
      if (detailsMainEl) detailsMainEl.textContent = product.detailsMain;
      if (detailsSubEl) detailsSubEl.textContent = product.detailsSub;

      if (inquireLinkEl && product.whatsappText) {
        const myNumber = "38763368323"; // your WhatsApp number
        // only append the text from the product
        inquireLinkEl.href = "https://wa.me/" + myNumber + "?text=" + encodeURIComponent(product.whatsappText);
      }

      var currentIndex = 0;

      function showImage(index) {
        if (!product.images || !product.images.length) return;

        var safeIndex =
          ((index % product.images.length) + product.images.length) %
          product.images.length;
        currentIndex = safeIndex;

        var image = product.images[safeIndex];
        if (mainImageEl && image) {
          mainImageEl.src = image.src;
          mainImageEl.alt = image.alt;
        }
      }

      // Initialize gallery at first image
      showImage(0);

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          showImage(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          showImage(currentIndex + 1);
        });
      }
    }
  }
});

