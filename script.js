// MENU

const menuBtn = document.getElementById("menuBtn");
const menuDropdown = document.getElementById("menuDropdown");

if (menuBtn && menuDropdown) {

  menuBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    const opened =
      menuDropdown.classList.toggle("show");

    menuBtn.setAttribute(
      "aria-expanded",
      String(opened)
    );

  });


  document.addEventListener("click", () => {

    menuDropdown.classList.remove("show");

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

  });


  menuDropdown.addEventListener("click", (event) => {

    event.stopPropagation();

  });

}


// CATEGORY

const categoryToggle =
  document.getElementById("categoryToggle");

const categoryPanel =
  document.getElementById("categoryPanel");

const categoryButtons =
  document.querySelectorAll(".category-detail");

const categoryCards =
  document.querySelectorAll(".category-card");

const productCards =
  document.querySelectorAll(".product-card");

const productInfo =
  document.getElementById("productInfo");

let selectedCategory = "all";


function filterProducts(category) {

  selectedCategory = category;


  productCards.forEach((card) => {

    const match =
      category === "all" ||
      card.dataset.category === category;

    card.style.display =
      match ? "block" : "none";

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


  productInfo.textContent =
    `Menampilkan ${names[category]}.`;


  document.getElementById("produk")?.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}


function toggleCategoryPanel() {

  const isOpen =
    categoryPanel.classList.toggle("show");


  categoryToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );


  categoryToggle.textContent =
    isOpen
      ? "Tutup Kategori"
      : "Buka Kategori";

}


if (categoryToggle && categoryPanel) {

  categoryToggle.addEventListener(
    "click",
    toggleCategoryPanel
  );

}


categoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterProducts(
      button.dataset.category
    );

  });

});


categoryCards.forEach((card) => {

  card.addEventListener("click", () => {

    const category =
      card.dataset.categoryCard;


    if (!categoryPanel.classList.contains("show")) {

      categoryPanel.classList.add("show");

      categoryToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      categoryToggle.textContent =
        "Tutup Kategori";

    }


    filterProducts(category);

  });

});


// SEARCH

const searchInput =
  document.getElementById("searchInput");


if (searchInput) {

  searchInput.addEventListener(
    "input",
    () => {

      const keyword =
        searchInput.value
          .trim()
          .toLowerCase();


      productCards.forEach((card) => {

        const name =
          card.dataset.name.toLowerCase();

        const category =
          card.dataset.category.toLowerCase();


        const match =
          keyword === "" ||
          name.includes(keyword) ||
          category.includes(keyword);


        const categoryMatch =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;


        card.style.display =
          match && categoryMatch
            ? "block"
            : "none";

      });


      if (keyword) {

        productInfo.textContent =
          `Hasil pencarian untuk "${searchInput.value}".`;

      } else {

        const names = {

          all: "semua produk",

          hp: "kategori Handphone",

          elektronik: "kategori Elektronik",

          hewan: "kategori Perawatan Hewan",

          keuangan: "kategori Keuangan",

          komputer: "kategori Komputer"

        };


        productInfo.textContent =
          `Menampilkan ${names[selectedCategory]}.`;

      }

    }
  );

}


// Semua produk tampil ketika dashboard dibuka.

filterProducts("all");


// NOTIFIKASI

const notificationBell =
  document.getElementById(
    "notificationBell"
  );

const notificationPopup =
  document.getElementById(
    "notificationPopup"
  );

const notificationClose =
  document.getElementById(
    "notificationClose"
  );

const notificationBadge =
  document.getElementById(
    "notificationBadge"
  );

const notificationList =
  document.getElementById(
    "notificationList"
  );


// DATA NOTIFIKASI

const notifications = [

  {
    icon: "💬",
    title: "Nina Store",
    text: "Pagi kak untuk Lamborghininya mau warna apa ya kak?",
    emoji: ["😍", "🤗"]
  },

  {
    icon: "🕒",
    title: "08:12",
    text: "Pesanan Rolex anda belum dibayar! Segera Check out sebelum kehabisan.",
    emoji: ["😠", "😭"]
  },

  {
    icon: "👤",
    title: "Kang Info Paket",
    text: "Paket kamu sudah sampai!!!",
    emoji: ["😍", "😋"]
  },

  {
    icon: "📦",
    title: "Pria Solo",
    text: "Baik kak. Pesannya sedang dikemas ya.",
    emoji: ["❤️", "😄"]
  }

];


// MEMBUAT NOTIFIKASI

function createNotification(data, index) {

  const item =
    document.createElement("div");


  item.className =
    "notification-item";


  item.style.animationDelay =
    `${index * 70}ms`;


  item.innerHTML = `

    <div class="notification-avatar">
      ${data.icon}
    </div>

    <div class="notification-text">

      <div class="notification-title">
        ${data.title}
      </div>

      <div class="notification-description">
        ${data.text}
      </div>

    </div>

    <div class="notification-emoji"></div>

  `;


  const emojiContainer =
    item.querySelector(
      ".notification-emoji"
    );


  data.emoji.forEach((emoji) => {

    const button =
      document.createElement("button");


    button.textContent =
      emoji;


    button.type =
      "button";


    button.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();


        emojiContainer
          .querySelectorAll("button")
          .forEach((btn) => {

            btn.classList.remove("active");

          });


        void button.offsetWidth;


        button.classList.add("active");

      }
    );


    emojiContainer.appendChild(
      button
    );

  });


  return item;

}


// TAMPILKAN NOTIFIKASI

if (notificationList) {

  notifications.forEach(
    (data, index) => {

      notificationList.appendChild(
        createNotification(
          data,
          index
        )
      );

    }
  );

}


// KLIK BELL

if (
  notificationBell &&
  notificationPopup
) {

  notificationBell.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      const isOpen =
        notificationPopup
          .classList
          .toggle("show");


      // Hilangkan badge

      if (notificationBadge) {

        notificationBadge.style.visibility =
          "hidden";

      }


      // Bell shake

      notificationBell.classList.remove(
        "ring"
      );

      void notificationBell.offsetWidth;

      notificationBell.classList.add(
        "ring"
      );


      // Jalankan animasi item

      if (isOpen) {

        const items =
          notificationPopup
            .querySelectorAll(
              ".notification-item"
            );


        items.forEach(
          (item, index) => {

            item.style.animation =
              "none";

            void item.offsetWidth;

            item.style.animation =
              "notificationIn 0.4s both";

            item.style.animationDelay =
              `${index * 70}ms`;

          }
        );

      }

    }
  );

}


// KLIK X

if (notificationClose) {

  notificationClose.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      notificationPopup.classList.remove(
        "show"
      );

    }
  );

}


// KLIK DI LUAR POPUP

document.addEventListener(
  "click",
  (event) => {

    if (
      notificationPopup &&
      notificationBell &&
      !notificationPopup.contains(event.target) &&
      !notificationBell.contains(event.target)
    ) {

      notificationPopup.classList.remove(
        "show"
      );

    }

  }
);