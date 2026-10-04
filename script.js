/* ==========================================================
   Digeboy Store – all JavaScript in one place
   Used by: index.html (product), storefront.html, inddex-pay.html
   Each page is picked by the class on <body>:
     page-product | page-store | page-pay
   Data is shared between pages (and teammates' pages) through
   localStorage using the keys in KEY below.
   ========================================================== */
(() => {
  'use strict';

  /* ---------- Settings you may want to edit ---------- */
  const SHIPPING_FEE = 500;   // flat shipping, USD
  const TAX = 250;            // flat tax, USD
  const PAGES = { cart: 'cart.html', store: 'storefront.html', product: 'index.html' };

  // Demo item used on the payment page when the cart is empty
  const DEMO_ITEM = { id: 'zr1-demo', name: 'Chevrolet ZR1', store: 'digeboy Official', price: 1000000, qty: 1, image: 'zr1.avif' };

  // Voucher rules (codes match data-code on the storefront cards)
  const VOUCHERS = {
    OFF10:    { label: '10% Off Voucher',       type: 'percent', value: 10, min: 50000, cap: 5000 },
    FREESHIP: { label: 'Free Shipping Voucher', type: 'shipping', min: 10000 }
  };

  /* ---------- localStorage helpers (shared keys) ---------- */
  const KEY = {
    cart: 'digeboy.cart',          // [{id,name,store,price,qty,image}]
    vouchers: 'digeboy.vouchers',  // ['OFF10', ...] claimed codes
    following: 'digeboy.following',// true | false
    orders: 'digeboy.orders'       // [{id,items,subtotal,...,status}]
  };
  const load = (k, fallback) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fallback; } catch { return fallback; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = n => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Toast message ---------- */
  let toastTimer;
  function toast(msg) {
    let t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast'; t.className = 'toast-msg';
      t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- Cart ---------- */
  const getCart = () => load(KEY.cart, []);
  const cartCount = () => getCart().reduce((n, i) => n + i.qty, 0);
  function updateCartBadges() {
    const n = cartCount();
    $$('[data-nav="cart"]').forEach(a => {
      let b = $('.cart-count', a);
      if (!b) { b = document.createElement('span'); b.className = 'cart-count'; a.appendChild(b); }
      b.textContent = n; b.hidden = n === 0;
      a.setAttribute('aria-label', `Cart, ${n} item${n === 1 ? '' : 's'}`);
    });
  }

  /* ---------- Shared: navbar (all shop pages) ---------- */
  function initNavbar() {
    const toggle = $('.toggle'), menu = $('#menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
      });
    }
    // Navbar search: the storefront filters in place, other pages go to the storefront
    const form = $('.nav-search');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      const q = $('input', form).value.trim();
      if (document.body.classList.contains('page-store')) {
        const box = $('#shopSearch'); if (box) { box.value = q; box.dispatchEvent(new Event('input')); }
        $('.grid')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        location.href = `${PAGES.store}${q ? '?q=' + encodeURIComponent(q) : ''}`;
      }
    });
    updateCartBadges();
  }

  /* ---------- Product page ---------- */
  function initProduct() {
    const mainImg = $('#mainImg');
    const thumbs = $$('.thumb');
    thumbs.forEach(t => t.addEventListener('click', () => {
      thumbs.forEach(x => { x.classList.remove('active'); x.removeAttribute('aria-current'); });
      t.classList.add('active'); t.setAttribute('aria-current', 'true');
      mainImg.src = t.dataset.full;
    }));

    const card = $('.card'), btn = $('#addToCart');
    btn?.addEventListener('click', () => {
      const cart = getCart();
      const id = card.dataset.id;
      const found = cart.find(i => i.id === id);
      if (found) found.qty += 1;
      else cart.push({
        id, name: card.dataset.name, store: card.dataset.store,
        price: Number(card.dataset.price), qty: 1, image: thumbs[0]?.dataset.full || mainImg.src
      });
      save(KEY.cart, cart);
      updateCartBadges();
      toast(`${card.dataset.name} added to your collection`);
    });
  }

  /* ---------- Storefront ---------- */
  function initStore() {
    // Follow / Following
    const follow = $('.btn-follow');
    const paintFollow = on => {
      follow.classList.toggle('following', on);
      follow.setAttribute('aria-pressed', on);
      follow.lastChild.textContent = on ? 'Following' : 'Follow';
    };
    paintFollow(load(KEY.following, false));
    follow.addEventListener('click', () => {
      const on = !load(KEY.following, false);
      save(KEY.following, on); paintFollow(on);
      toast(on ? 'You are now following digeboy Official' : 'You unfollowed digeboy Official');
    });

    // Chat – teammates can define window.openChat() to replace this message
    $('.btn-chat').addEventListener('click', () => {
      if (typeof window.openChat === 'function') window.openChat('digeboy Official');
      else toast('Chat is not connected yet');
    });

    // Vouchers: claim and remember
    const claimed = new Set(load(KEY.vouchers, []));
    $$('.voucher').forEach(v => {
      const btn = $('.claim', v), code = v.dataset.code;
      const paint = () => {
        const on = claimed.has(code);
        btn.classList.toggle('claimed', on);
        btn.disabled = on;
        btn.textContent = on ? 'Claimed' : 'Claim';
      };
      paint();
      btn.addEventListener('click', () => {
        claimed.add(code); save(KEY.vouchers, [...claimed]); paint();
        toast(`${VOUCHERS[code]?.label || 'Voucher'} claimed – it is applied at checkout`);
      });
    });

    // Tabs + shop search filter the product grid
    const tabs = $$('.tabs a'), items = $$('.grid .item'), empty = $('.empty-note'), box = $('#shopSearch');
    let cat = 'all';
    function applyFilter() {
      const q = box.value.trim().toLowerCase();
      let shown = 0;
      items.forEach(it => {
        const ok = (cat === 'all' || it.dataset.cat === cat) && (!q || it.dataset.name.toLowerCase().includes(q));
        it.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
      });
      empty.hidden = shown > 0;
      empty.textContent = q ? `No products match “${box.value.trim()}”.` : 'No products in this category yet.';
    }
    function selectTab(tab) {
      tabs.forEach(t => { t.classList.remove('active'); t.removeAttribute('aria-current'); });
      tab.classList.add('active'); tab.setAttribute('aria-current', 'page');
      cat = tab.dataset.cat; applyFilter();
    }
    tabs.forEach(t => t.addEventListener('click', e => { e.preventDefault(); selectTab(t); }));
    box.addEventListener('input', applyFilter);
    $('.search').addEventListener('submit', e => { e.preventDefault(); applyFilter(); });
    $('#seeAll').addEventListener('click', e => { e.preventDefault(); box.value = ''; selectTab(tabs.find(t => t.dataset.cat === 'all' && t.textContent.includes('All'))); });

    // ?q=term from the navbar search on other pages
    const q = new URLSearchParams(location.search).get('q');
    if (q) { box.value = q; applyFilter(); }
  }

  /* ---------- Payment page ---------- */
  function initPay() {
    const items = getCart().length ? getCart() : [DEMO_ITEM];
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    // Apply claimed vouchers
    let discount = 0, shipping = SHIPPING_FEE;
    const claimed = load(KEY.vouchers, []);
    claimed.forEach(code => {
      const v = VOUCHERS[code]; if (!v || subtotal < v.min) return;
      if (v.type === 'percent') discount += Math.min(subtotal * v.value / 100, v.cap);
      if (v.type === 'shipping') shipping = 0;
    });
    const total = subtotal - discount + shipping + TAX;

    // Order summary
    $('#orderItems').innerHTML = items.map(i => `
      <h4>${esc(i.name)}</h4>
      <div class="estimasi">
        <div class="images"><img src="${esc(i.image)}" width="100" alt=""></div>
        <ul>
          <li><a>${esc(i.store)}</a></li>
          <li>cost: ${money(i.price)}</li>
          <li>Item QTY: ${i.qty}</li>
        </ul>
      </div>`).join('');
    $('#subtotal').textContent = money(subtotal);
    $('#discountRow').hidden = discount === 0;
    $('#discount').textContent = '-' + money(discount);
    $('#shipping').textContent = shipping === 0 ? 'FREE' : money(shipping);
    $('#tax').textContent = money(TAX);
    $('#total').textContent = money(total);

    // Input formatting
    const name = $('#cardHolderName'), num = $('#cardNumber'), exp = $('#expiryDate'), cvv = $('#cvv');
    num.addEventListener('input', () => { num.value = num.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); });
    exp.addEventListener('input', () => { const d = exp.value.replace(/\D/g, '').slice(0, 4); exp.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; });
    cvv.addEventListener('input', () => { cvv.value = cvv.value.replace(/\D/g, '').slice(0, 4); });

    // Validation
    const luhn = digits => {
      let sum = 0, dbl = false;
      for (let i = digits.length - 1; i >= 0; i--) {
        let d = +digits[i]; if (dbl) { d *= 2; if (d > 9) d -= 9; }
        sum += d; dbl = !dbl;
      }
      return sum % 10 === 0;
    };
    const rules = [
      [name, v => /^[\p{L} .'-]{2,}$/u.test(v.trim()) ? '' : 'Enter the name printed on the card.'],
      [num,  v => { const d = v.replace(/\s/g, ''); return d.length >= 13 && luhn(d) ? '' : 'Enter a valid card number.'; }],
      [exp,  v => {
        const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(v); if (!m) return 'Use the format MM/YY.';
        const now = new Date(), y = 2000 + +m[2], mo = +m[1];
        return (y < now.getFullYear() || (y === now.getFullYear() && mo < now.getMonth() + 1) || y > now.getFullYear() + 20) ? 'This card has expired.' : '';
      }],
      [cvv,  v => /^\d{3,4}$/.test(v) ? '' : 'Enter the 3 or 4 digit security code.']
    ];
    function check(input, rule) {
      const msg = rule(input.value);
      let fb = input.parentElement.querySelector('.invalid-feedback');
      if (!fb) { fb = document.createElement('div'); fb.className = 'invalid-feedback'; input.insertAdjacentElement('afterend', fb); }
      fb.textContent = msg;
      input.classList.toggle('is-invalid', !!msg);
      input.classList.toggle('is-valid', !msg);
      input.setAttribute('aria-invalid', !!msg);
      return !msg;
    }
    rules.forEach(([input, rule]) => input.addEventListener('blur', () => check(input, rule)));

    // Confirm / return
    const confirmBtn = $('#confirmBtn');
    function pay() {
      const results = rules.map(([i, r]) => check(i, r));
      if (results.includes(false)) { rules[results.indexOf(false)][0].focus(); return; }
      confirmBtn.disabled = true; confirmBtn.textContent = 'Processing…';
      setTimeout(() => {
        const order = {
          id: 'DGB-' + Date.now().toString(36).toUpperCase(),
          date: new Date().toISOString(), status: 'Processing',
          items, subtotal, discount, shipping, tax: TAX, total
        };
        save(KEY.orders, [order, ...load(KEY.orders, [])]);   // card details are never stored
        save(KEY.cart, []);
        $('.payment-information').innerHTML = `
          <div class="w-100 text-center py-5">
            <h2>Payment successful</h2>
            <p class="mt-3">Thank you! Your order <strong>${order.id}</strong> is being processed.</p>
            <p>Total paid: <strong>${money(total)}</strong></p>
            <a class="btn mt-3" href="${PAGES.store}">Back to store</a>
          </div>`;
      }, 1200);
    }
    confirmBtn.addEventListener('click', pay);
    $('#returnBtn').addEventListener('click', () => { location.href = PAGES.cart; });
    $('#payment-form').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); pay(); } });
  }

  /* ---------- Start ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const b = document.body.classList;
    if (b.contains('shop-page') || b.contains('page-pay')) initNavbar();
    if (b.contains('page-product')) initProduct();
    if (b.contains('page-store')) initStore();
    if (b.contains('page-pay')) initPay();
  });
})();
