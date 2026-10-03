const menuBtn = document.getElementById("menuBtn");
const menuDropdown = document.getElementById("menuDropdown");

if (menuBtn && menuDropdown) {
  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const opened = menuDropdown.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(opened));
  });

  document.addEventListener("click", () => {
    menuDropdown.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  });

  menuDropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

const CART_KEY = "bhariq_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;

  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + Number(item.jumlah || 0), 0);

  if (total > 0) {
    cartCount.textContent = total;
    cartCount.style.display = "grid";
  } else {
    cartCount.style.display = "none";
  }
}

updateCartCount();
