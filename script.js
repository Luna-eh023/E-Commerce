// ================= MENU =================

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

// ================= CATEGORY =================

const categoryToggle = document.getElementById("categoryToggle");
const categoryPanel = document.getElementById("categoryPanel");
const categoryButtons = document.querySelectorAll(".category-detail");
const categoryCards = document.querySelectorAll(".category-card");
const productCards = document.querySelectorAll(".product-card");
const productInfo = document.getElementById("productInfo");

let selectedCategory = "all";

function filterProducts(category) {
  selectedCategory = category;

  productCards.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.style.display = match ? "block" : "none";
  });

  categoryCards.forEach((card) => {
    card.classList.toggle(
      "active",
      card.dataset.categoryCard === category
    );
  });

  categoryButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });

  const names = {
    all: "semua produk",
    hp: "kategori Handphone",
    elektronik: "kategori Elektronik",
    hewan: "kategori Perawatan Hewan",
    keuangan: "kategori Keuangan",
    komputer: "kategori Komputer"
  };

  productInfo.textContent = `Menampilkan ${names[category]}.`;

  document.getElementById("produk")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function toggleCategoryPanel() {
  const isOpen = categoryPanel.classList.toggle("show");
  categoryToggle.setAttribute("aria-expanded", String(isOpen));
  categoryToggle.textContent = isOpen ? "Tutup Kategori" : "Buka Kategori";
}

if (categoryToggle && categoryPanel) {
  categoryToggle.addEventListener("click", toggleCategoryPanel);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterProducts(button.dataset.category);
  });
});

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.categoryCard;

    if (!categoryPanel.classList.contains("show")) {
      categoryPanel.classList.add("show");
      categoryToggle.setAttribute("aria-expanded", "true");
      categoryToggle.textContent = "Tutup Kategori";
    }

    filterProducts(category);
  });
});

// ================= SEARCH =================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    productCards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category.toLowerCase();

      const match =
        keyword === "" ||
        name.includes(keyword) ||
        category.includes(keyword);

      const categoryMatch =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.style.display = match && categoryMatch ? "block" : "none";
    });

    if (keyword) {
      productInfo.textContent = `Hasil pencarian untuk "${searchInput.value}".`;
    } else {
      const names = {
        all: "semua produk",
        hp: "kategori Handphone",
        elektronik: "kategori Elektronik",
        hewan: "kategori Perawatan Hewan",
        keuangan: "kategori Keuangan",
        komputer: "kategori Komputer"
      };
      productInfo.textContent = `Menampilkan ${names[selectedCategory]}.`;
    }
  });
}

// Semua produk tampil ketika dashboard dibuka.
filterProducts("all");
