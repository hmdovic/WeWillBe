(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     ANALYTICS — Google Analytics 4, loaded only after consent.
     Replace GA_MEASUREMENT_ID with the real ID from Google Analytics
     (Admin → Data Streams → your stream → Measurement ID, format
     G-XXXXXXXXXX). Until a real ID is set, this entire block is a
     no-op: no banner shown, nothing ever loaded or sent, no fake ID
     anywhere. Once a real ID is in place, EU/UK visitors legally need
     a privacy policy to link from the banner — there isn't one yet,
     add it before this goes live for real traffic.
     ========================================================= */
  var GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  var GA_CONFIGURED = GA_MEASUREMENT_ID.indexOf("XXXX") === -1;
  var CONSENT_KEY = "wewillbe_consent";

  if (GA_CONFIGURED) {
    var loadGA = function () {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID);
    };
    var getConsent = function () {
      try { return window.localStorage.getItem(CONSENT_KEY); } catch (err) { return null; }
    };
    var setConsent = function (value) {
      try { window.localStorage.setItem(CONSENT_KEY, value); } catch (err) { /* storage unavailable */ }
    };

    var consent = getConsent();
    if (consent === "granted") {
      loadGA();
    } else if (consent !== "denied") {
      var cookieBanner = document.querySelector("[data-cookie-banner]");
      if (cookieBanner) {
        cookieBanner.hidden = false;
        var acceptBtn = cookieBanner.querySelector("[data-cookie-accept]");
        var declineBtn = cookieBanner.querySelector("[data-cookie-decline]");
        if (acceptBtn) acceptBtn.addEventListener("click", function () {
          setConsent("granted");
          cookieBanner.hidden = true;
          loadGA();
        });
        if (declineBtn) declineBtn.addEventListener("click", function () {
          setConsent("denied");
          cookieBanner.hidden = true;
        });
      }
    }
  }

  /* =========================================================
     SMOOTH SCROLL (Lenis)
     ========================================================= */
  var lenis = null;
  if (!reduceMotion && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* =========================================================
     PAGE TRANSITION — fade in on load, fade out before internal nav
     ========================================================= */
  if (!reduceMotion) {
    document.documentElement.classList.add("is-loading");
    window.addEventListener("DOMContentLoaded", function () {
      requestAnimationFrame(function () { document.documentElement.classList.remove("is-loading"); });
    });
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || a.target === "_blank" || href.indexOf("mailto:") === 0 || href.indexOf("http") === 0) return;
      a.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        document.documentElement.classList.add("is-leaving");
        window.setTimeout(function () { window.location.href = href; }, 320);
      });
    });
  }

  /* =========================================================
     NAV — condense on scroll, mobile drawer
     ========================================================= */
  var nav = document.querySelector("[data-nav]");
  if (nav) {
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      nav.classList.toggle("is-condensed", y > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMobile = document.querySelector("[data-nav-mobile]");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var open = navMobile.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    navMobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navMobile.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* =========================================================
     REVEAL — generic scroll-in for [data-reveal], staggered groups
     for [data-reveal-group], and clip-path wipes for [data-reveal-frame]
     ========================================================= */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.hasAttribute("data-reveal-group")) {
          Array.prototype.forEach.call(el.children, function (child, i) {
            child.style.setProperty("--reveal-delay", Math.min(i * 70, 420) + "ms");
          });
        }
        el.classList.add("is-in");
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll("[data-reveal], [data-reveal-group], [data-reveal-frame]").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll("[data-reveal], [data-reveal-group], [data-reveal-frame]").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* =========================================================
     TEASER — the pre-launch homepage: full-bleed photo backdrop that
     auto-cycles, a click-to-jump dot nav, and a subtle mouse-parallax
     drift on desktop. No-ops entirely on every other page.
     ========================================================= */
  var teaserBg = document.querySelector("[data-teaser-bg]");
  if (teaserBg) {
    var teaserSlides = Array.prototype.slice.call(teaserBg.querySelectorAll("[data-teaser-slide]"));
    var teaserDots = Array.prototype.slice.call(document.querySelectorAll("[data-teaser-dot]"));
    var teaserIndex = 0;
    var teaserTimer = null;

    function showTeaserSlide(i) {
      teaserIndex = (i + teaserSlides.length) % teaserSlides.length;
      teaserSlides.forEach(function (slide, idx) {
        slide.classList.remove("is-active");
        if (idx === teaserIndex) {
          void slide.offsetWidth; /* restart the Ken Burns animation */
          slide.classList.add("is-active");
        }
      });
      teaserDots.forEach(function (dot, idx) { dot.classList.toggle("is-active", idx === teaserIndex); });
    }

    function scheduleTeaser() {
      window.clearTimeout(teaserTimer);
      teaserTimer = window.setTimeout(function () {
        showTeaserSlide(teaserIndex + 1);
        scheduleTeaser();
      }, 6000);
    }

    teaserDots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () {
        showTeaserSlide(idx);
        scheduleTeaser();
      });
    });

    scheduleTeaser();

    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var teaserStage = document.querySelector(".teaser-stage");
      teaserStage.addEventListener("mousemove", function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 2;
        var y = (e.clientY / window.innerHeight - 0.5) * 2;
        teaserBg.style.transform = "translate(" + (x * -10).toFixed(1) + "px, " + (y * -8).toFixed(1) + "px)";
      });
      teaserStage.addEventListener("mouseleave", function () { teaserBg.style.transform = ""; });
    }
  }

  /* =========================================================
     COUNTDOWN — data-countdown-target="2026-08-08T12:00:00"
     Digits animate in on change (skipped under reduced-motion); once
     the target passes, the unit grid is swapped for a "Live now" state.
     ========================================================= */
  document.querySelectorAll("[data-countdown]").forEach(function (el) {
    var target = new Date(el.dataset.countdownTarget).getTime();
    var dayEl = el.querySelector("[data-cd-days]");
    var hourEl = el.querySelector("[data-cd-hours]");
    var minEl = el.querySelector("[data-cd-mins]");
    var secEl = el.querySelector("[data-cd-secs]");
    var liveEl = el.querySelector("[data-cd-live]");
    function pad(n) { return String(Math.max(n, 0)).padStart(2, "0"); }
    function setDigit(digitEl, value) {
      if (!digitEl || digitEl.textContent === value) return;
      digitEl.textContent = value;
      if (reduceMotion) return;
      digitEl.classList.remove("is-ticking");
      void digitEl.offsetWidth; /* force reflow so the animation restarts every tick */
      digitEl.classList.add("is-ticking");
    }
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        setDigit(dayEl, "00"); setDigit(hourEl, "00"); setDigit(minEl, "00"); setDigit(secEl, "00");
        el.classList.add("is-live");
        if (liveEl) liveEl.hidden = false;
        return;
      }
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600); s -= h * 3600;
      var m = Math.floor(s / 60); s -= m * 60;
      setDigit(dayEl, pad(d));
      setDigit(hourEl, pad(h));
      setDigit(minEl, pad(m));
      setDigit(secEl, pad(s));
      window.setTimeout(tick, 1000);
    }
    tick();
  });

  /* =========================================================
     FORMS — notify-me / newsletter: static capture (no backend yet)
     ========================================================= */
  document.querySelectorAll("[data-notify-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var btn = form.querySelector("button");
      if (!input || !input.value.trim()) return;
      if (btn) {
        var original = btn.innerHTML;
        btn.disabled = true;
        btn.classList.add("is-loading");
        window.setTimeout(function () {
          btn.classList.remove("is-loading");
          btn.classList.add("is-done");
          if (btn.tagName === "BUTTON" && btn.type === "submit" && btn.textContent.trim()) btn.textContent = "You're on the list";
        }, 550);
      }
      input.value = "";
      input.placeholder = "We'll email you at drop time";
    });
  });

  /* =========================================================
     PRODUCT GALLERY — real-image thumbnail swap with a quick crossfade
     ========================================================= */
  var galleryThumbs = document.querySelectorAll("[data-gallery-thumb]");
  var galleryImg = document.querySelector("[data-gallery-main] [data-gallery-img]");
  if (galleryThumbs.length && galleryImg) {
    galleryThumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        if (thumb.classList.contains("is-active")) return;
        galleryThumbs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-pressed", "false"); });
        thumb.classList.add("is-active");
        thumb.setAttribute("aria-pressed", "true");
        var src = thumb.dataset.gallerySrc;
        var alt = thumb.dataset.galleryAlt || "";
        if (reduceMotion) {
          galleryImg.src = src;
          galleryImg.alt = alt;
        } else {
          galleryImg.style.opacity = "0";
          window.setTimeout(function () {
            galleryImg.src = src;
            galleryImg.alt = alt;
            galleryImg.style.opacity = "1";
          }, 180);
        }
      });
    });
  }

  /* =========================================================
     SIZE SELECTOR
     ========================================================= */
  document.querySelectorAll("[data-size-grid]").forEach(function (grid) {
    var buttons = grid.querySelectorAll("button:not(:disabled)");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-selected"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("is-selected");
        btn.setAttribute("aria-pressed", "true");
      });
    });
  });

  /* =========================================================
     QUANTITY STEPPER
     ========================================================= */
  document.querySelectorAll("[data-qty]").forEach(function (stepper) {
    var display = stepper.querySelector("[data-qty-value]");
    var qty = 1;
    stepper.querySelector("[data-qty-minus]").addEventListener("click", function () {
      qty = Math.max(1, qty - 1);
      display.textContent = qty;
    });
    stepper.querySelector("[data-qty-plus]").addEventListener("click", function () {
      qty = Math.min(9, qty + 1);
      display.textContent = qty;
    });
  });

  /* =========================================================
     ACCORDION
     ========================================================= */
  document.querySelectorAll("[data-accordion] .accordion-item__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = trigger.closest(".accordion-item");
      var wasOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".accordion-item.is-open").forEach(function (open) {
        open.classList.remove("is-open");
        open.querySelector(".accordion-item__trigger").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* =========================================================
     FILTER CHIPS (visual only — static catalogue for now)
     ========================================================= */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var chips = group.querySelectorAll(".chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); c.setAttribute("aria-pressed", "false"); });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
      });
    });
  });

  /* =========================================================
     CART — persisted in localStorage, shared across pages.
     Still no real backend/checkout: see README.md §Integration points.
     ========================================================= */
  var CART_KEY = "wewillbe_cart";

  function readCart() {
    try {
      var raw = window.localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function writeCart(items) {
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (err) { /* storage unavailable, degrade silently */ }
  }

  function cartCount(items) {
    return items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function formatEUR(n) { return "€" + n.toFixed(2).replace(".", ","); }

  function updateCartBadges() {
    var items = readCart();
    var count = cartCount(items);
    document.querySelectorAll("[data-cart-count]").forEach(function (el) { el.textContent = String(count); });
    document.querySelectorAll("[data-cart-toggle]").forEach(function (el) {
      el.setAttribute("aria-label", "Open bag, " + count + " item" + (count === 1 ? "" : "s"));
    });
  }

  function renderCartDrawer() {
    var body = document.querySelector("[data-cart-body]");
    var subtotalEl = document.querySelector("[data-cart-subtotal]");
    if (!body) return;
    var items = readCart();
    if (!items.length) {
      body.innerHTML = '<p class="cart-drawer__empty">Your bag is empty. Time to fix that.</p>';
      if (subtotalEl) subtotalEl.textContent = formatEUR(0);
      return;
    }
    var subtotal = 0;
    body.innerHTML = items.map(function (item, i) {
      subtotal += item.price * item.qty;
      var thumb = item.image
        ? '<img class="cart-item__thumb" src="' + item.image + '" alt="" aria-hidden="true" />'
        : '<div class="frame" aria-hidden="true"><div class="frame__mono">' + item.frame + '</div></div>';
      return (
        '<div class="cart-item">' +
          thumb +
          '<div>' +
            '<p class="cart-item__name">' + item.name + '</p>' +
            '<p class="cart-item__meta">Size ' + item.size + ' &middot; Qty ' + item.qty + '</p>' +
            '<button type="button" class="cart-item__remove" data-cart-remove="' + i + '">Remove</button>' +
          '</div>' +
          '<p class="cart-item__price">' + formatEUR(item.price * item.qty) + '</p>' +
        '</div>'
      );
    }).join("");
    if (subtotalEl) subtotalEl.textContent = formatEUR(subtotal);
    body.querySelectorAll("[data-cart-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = parseInt(btn.dataset.cartRemove, 10);
        var current = readCart();
        current.splice(idx, 1);
        writeCart(current);
        updateCartBadges();
        renderCartDrawer();
      });
    });
  }

  var cartOverlay = document.querySelector("[data-cart-overlay]");
  function openCart() {
    if (!cartOverlay) return;
    renderCartDrawer();
    cartOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    if (!cartOverlay) return;
    cartOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-cart-toggle]").forEach(function (btn) { btn.addEventListener("click", openCart); });
  document.querySelectorAll("[data-cart-close]").forEach(function (btn) { btn.addEventListener("click", closeCart); });
  if (cartOverlay) {
    cartOverlay.addEventListener("click", function (e) { if (e.target === cartOverlay) closeCart(); });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });
  document.querySelectorAll("[data-cart-checkout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var original = btn.textContent;
      btn.textContent = "Checkout coming soon";
      window.setTimeout(function () { btn.textContent = original; }, 1800);
    });
  });

  updateCartBadges();

  document.querySelectorAll("[data-add-to-cart]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.dataset.productName || "WEWILLBE Item";
      var price = parseFloat(btn.dataset.productPrice || "0");
      var frame = btn.dataset.productFrame || "01";
      var image = btn.dataset.productImage || null;
      var sizeGrid = document.querySelector("[data-size-grid]");
      var selectedSize = sizeGrid ? (sizeGrid.querySelector(".is-selected") || {}).textContent : null;
      var qtyEl = document.querySelector("[data-qty-value]");
      var qty = qtyEl ? parseInt(qtyEl.textContent, 10) || 1 : 1;
      var size = selectedSize || "One Size";

      var items = readCart();
      var existing = items.find(function (i) { return i.name === name && i.size === size; });
      if (existing) existing.qty += qty; else items.push({ name: name, price: price, size: size, qty: qty, frame: frame, image: image });
      writeCart(items);
      updateCartBadges();

      var original = btn.textContent;
      btn.textContent = "Added to Bag";
      btn.classList.add("is-added");
      window.setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove("is-added");
        openCart();
      }, 700);
    });
  });
})();
