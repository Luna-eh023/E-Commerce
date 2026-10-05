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
      kotakEmoji.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
      void tombol.offsetWidth;
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
