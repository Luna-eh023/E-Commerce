const CART_KEY = "bhariq_cart";

function getCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function getTotalItems(cart) {
  return cart.reduce((total, item) => {
    return total + Number(item.jumlah || 0);
  }, 0);
}

function updateCartCount() {
  const cart = getCart();
  const count = getTotalItems(cart);

  document.querySelectorAll("#cartCount").forEach((element) => {
    if (count > 0) {
      element.textContent = count;
      element.style.display = "grid";
    } else {
      element.style.display = "none";
    }
  });
}

function addToCart(product) {
  const cart = getCart();

  const found = cart.find((item) => String(item.id) === String(product.id));

  if (found) {
    found.jumlah += 1;
  } else {
    cart.push({
      id: product.id,
      nama: product.nama,
      harga: Number(product.harga),
      jumlah: 1,
      icon: product.icon || "🛍️"
    });
  }

  saveCart(cart);
  updateCartCount();
}

function changeQuantity(id, amount) {
  const cart = getCart();
  const item = cart.find((product) => String(product.id) === String(id));

  if (!item) return;

  item.jumlah += amount;

  if (item.jumlah <= 0) {
    const newCart = cart.filter((product) => String(product.id) !== String(id));
    saveCart(newCart);
  } else {
    saveCart(cart);
  }

  renderCart();
}

function removeItem(id) {
  const cart = getCart().filter(
    (item) => String(item.id) !== String(id)
  );

  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}

function renderCart() {
  const cart = getCart();

  const container = document.getElementById("cartItems");
  const emptyState = document.getElementById("emptyState");
  const summary = document.getElementById("cartSummary");
  const totalItemsElement = document.getElementById("totalItems");
  const totalPriceElement = document.getElementById("totalPrice");
  const grandTotalElement = document.getElementById("grandTotal");

  if (!container) {
    updateCartCount();
    return;
  }

  const totalItems = getTotalItems(cart);
  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.harga) * Number(item.jumlah),
    0
  );

  summary.textContent = `${totalItems} barang`;
  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = formatRupiah(totalPrice);
  grandTotalElement.textContent = formatRupiah(totalPrice);

  if (cart.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    emptyState.style.display = "flex";
    updateCartCount();
    return;
  }

  emptyState.style.display = "none";
  container.style.display = "block";

  container.innerHTML = cart.map((item) => {
    const subtotal = Number(item.harga) * Number(item.jumlah);

    return `
      <article class="cart-item">
        <div class="item-thumb">${item.icon || "🛍️"}</div>

        <div class="item-info">
          <h3>${escapeHtml(item.nama)}</h3>
          <div class="item-price">${formatRupiah(item.harga)}</div>
          <div class="item-total">Subtotal: ${formatRupiah(subtotal)}</div>

          <div class="item-actions">
            <div class="qty-control">
              <button type="button" onclick="changeQuantity('${item.id}', -1)">−</button>
              <span>${item.jumlah}</span>
              <button type="button" onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>

            <button class="remove-btn" type="button" onclick="removeItem('${item.id}')">
              Hapus
            </button>
          </div>
        </div>

        <div class="item-side">
          <strong>${formatRupiah(subtotal)}</strong>
        </div>
      </article>
    `;
  }).join("");

  updateCartCount();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ================= TOMBOL CHECKOUT =================

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();
    const message = document.getElementById("checkoutMessage");

    if (cart.length === 0) {
      message.textContent = "Keranjang masih kosong.";
      return;
    }

    message.textContent = "Checkout berhasil.";
  });
}

const clearCartBtn = document.getElementById("clearCartBtn");

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (getCart().length === 0) return;

    const confirmed = confirm("Kosongkan semua barang dari keranjang?");
    if (confirmed) {
      clearCart();
    }
  });
}

// Dipakai oleh tombol + Keranjang di Dashboard
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart({
      id: button.dataset.id,
      nama: button.dataset.name,
      harga: button.dataset.price,
      icon: button.dataset.icon
    });

    const originalText = button.textContent;
    button.textContent = "✓ Ditambahkan";

    setTimeout(() => {
      button.textContent = originalText;
    }, 900);
  });
});

renderCart();