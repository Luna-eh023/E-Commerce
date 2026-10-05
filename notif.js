// ===== Halaman notif.html =====

if (document.body.classList.contains("halaman-notif")) {

  const notifikasi = [
    { ikon: "💬", judul: "Nina Store", isi: "Pagi kak untuk Lamborghininya mau warna apa ya kak?", emoji: ["😍", "🤗"] },
    { ikon: "🕒", judul: "08:12", isi: "Pesanan Rolex anda belum dibayar! Segera Check out sebelum kehabisan.", emoji: ["😠", "😭"] },
    { ikon: "👤", judul: "Kang Info Paket", isi: "Paket kamu sudah sampai!!!", emoji: ["😍", "😋"] },
    { ikon: "📦", judul: "Pria Solo", isi: "Baik kak. Pesannya sedang dikemas ya.", emoji: ["❤️", "😄"] }
  ];

  const list = document.getElementById("list");
  const card = document.getElementById("card");
  const bell = document.getElementById("bell");
  const badge = document.getElementById("badge");

  function buatItem(data, urutan) {
    const item = document.createElement("div");
    item.className = "item";
    item.style.animationDelay = urutan * 70 + "ms";
    item.innerHTML =
      '<div class="ava">' + data.ikon + "</div>" +
      '<div class="txt"><div class="t">' + data.judul + '</div><div class="d">' + data.isi + "</div></div>" +
      '<div class="emo"></div>';

    const kotakEmoji = item.querySelector(".emo");
    data.emoji.forEach(function (e) {
      const tombol = document.createElement("button");
      tombol.textContent = e;
      tombol.onclick = function () {
        // hapus pilihan lama, lalu tandai yang diklik
        kotakEmoji.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
        void tombol.offsetWidth; // supaya animasi bisa diulang
        tombol.classList.add("on");
      };
      kotakEmoji.appendChild(tombol);
    });
    return item;
  }

  notifikasi.forEach(function (data, i) {
    list.appendChild(buatItem(data, i));
  });

  bell.onclick = function () {
    const tersembunyi = card.classList.toggle("hide");
    bell.classList.remove("ring");
    void bell.offsetWidth;
    bell.classList.add("ring");
    badge.style.visibility = tersembunyi ? "visible" : "hidden";
  };

}


// ===== NOTIF di Dashboard (index.html) =====

if (document.body.classList.contains("halaman-dashboard")) {

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

          text:
              "Pagi kak untuk Lamborghininya mau warna apa ya kak?",

          emoji: [
              "😍",
              "🤗"
          ]
      },


      {
          icon: "🕒",

          title: "08:12",

          text:
              "Pesanan Rolex anda belum dibayar! Segera Check out sebelum kehabisan.",

          emoji: [
              "😠",
              "😭"
          ]
      },


      {
          icon: "👤",

          title: "Kang Info Paket",

          text:
              "Paket kamu sudah sampai!!!",

          emoji: [
              "😍",
              "😋"
          ]
      },


      {
          icon: "📦",

          title: "Pria Solo",

          text:
              "Baik kak. Pesannya sedang dikemas ya.",

          emoji: [
              "❤️",
              "😄"
          ]
      }

  ];


  // BUAT ITEM NOTIFIKASI

  function createNotification(
      data,
      index
  ) {

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


      data.emoji.forEach(
          (emoji) => {

              const button =
                  document.createElement(
                      "button"
                  );


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
                          .forEach(
                              (btn) => {

                                  btn.classList.remove(
                                      "active"
                                  );

                              }
                          );


                      void button.offsetWidth;


                      button.classList.add(
                          "active"
                      );

                  }
              );


              emojiContainer.appendChild(
                  button
              );

          }
      );


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


              if (notificationBadge) {

                  notificationBadge.style.visibility =
                      "hidden";

              }


              notificationBell
                  .classList
                  .remove("ring");


              void notificationBell.offsetWidth;


              notificationBell
                  .classList
                  .add("ring");


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
                              "notificationIn .4s both";


                          item.style.animationDelay =
                              `${index * 70}ms`;

                      }
                  );

              }

          }
      );

  }


  // KLIK CLOSE NOTIFIKASI

  if (notificationClose) {

      notificationClose.addEventListener(
          "click",
          (event) => {

              event.stopPropagation();


              notificationPopup
                  .classList
                  .remove("show");

          }
      );

  }


  // KLIK DI LUAR NOTIFIKASI

  document.addEventListener(
      "click",
      (event) => {

          if (
              notificationPopup &&
              notificationBell &&
              !notificationPopup.contains(
                  event.target
              ) &&
              !notificationBell.contains(
                  event.target
              )
          ) {

              notificationPopup
                  .classList
                  .remove("show");

          }

      }
  );

}
