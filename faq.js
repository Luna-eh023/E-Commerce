const cats=[
  ["Umum","Panduan singkat","Meliputi cara menggunakan layanan, ketentuan dasar, dan informasi akun.","linear-gradient(#f2a05a,#6b2e1b)"],
  ["Akun","Login & profil","Masalah lupa password, verifikasi email/nomor, dan pengaturan profil.","linear-gradient(#cfd6bf,#6c7a50)"],
  ["Pembayaran","Metode & kendala","Pembayaran gagal, perubahan metode, dan bukti transaksi.","linear-gradient(#f0c242,#c4232b)"],
  ["Pengiriman","Estimasi & pelacakan","Resi, keterlambatan, dan langkah jika paket tidak ditemukan.","linear-gradient(#5a4a3a,#b8b8c4)"]];


const pop=[
  ["⏱️","Berapa lama proses pesanan?","Estimasi waktu","Umumnya sekitar 1 - 3 hari kerja bergantung pada stock produk."],
  ["📍","Bagaimana cara melacak pesanan?","Status & resi","Masuk ke Akun → Pesanan → pilih pesanan → lihat nomor resi dan pembaruan."],
  ["💵","Refund memerlukan waktu berapa lama?","Proses pengembalian","Proses persetujuan 1–2 hari kerja, lalu refund mengikuti jadwal bank (3–7 hari)."],
  ["🧾","Saya belum menerima invoice","Dokumen transaksi","Cek email Anda atau unduh dari Akun → Riwayat Transaksi → Invoice."]];

const full=[
  ["Pembayaran gagal — apa yang harus dilakukan?","Pembayaran","Pastikan saldo mencukupi dan data kartu/akun benar. Jika masih gagal, coba metode pembayaran lain.","linear-gradient(#9c2230,#d8a24a)"],
  ["Pesanan masih 'diproses' terlalu lama","Status Pesanan","Normalnya pemrosesan memakan waktu 1–3 hari kerja. Jika melewati estimasi, periksa ketersediaan stok.","linear-gradient(#7d8452,#d9c9a8)"],
  ["Paket 'terkirim' tapi saya belum menerimanya","Pengiriman","Cek alamat pengiriman, jam pengantaran, dan status di kurir. Jika paket tidak ditemukan dalam 1 hari, hubungi kami.","linear-gradient(#3b3b3b,#c9a487)"]];

const el = function (id) { return document.getElementById(id); };

const menuAtas = [["Beranda", "top"], ["Produk", "populer"], ["Bantuan", "faq"], ["Kontak", "kontak"]];
const menuBubble = [
  ["FAQ Populer", "populer"], ["Status Pesanan", "semua"], ["Pengiriman", "semua"],
  ["Pembayaran", "semua"], ["Refund & Retur", "populer"], ["Keamanan Akun", "faq"]
];

function buatLink(daftar) {
  let html = "";
  daftar.forEach(function (m) { html += '<a data-go="' + m[1] + '">' + m[0] + "</a>"; });
  return html;
}

let htmlKategori = "";
cats.forEach(function (c, i) {
  htmlKategori += '<div class="cat" data-i="' + i + '"><div class="img" style="background-image:' + c[3] + '"></div>' +
    "<div><h3>" + c[0] + "</h3><small>" + c[1] + "</small><p>" + c[2] + "</p></div></div>";
});
el("cats").innerHTML = htmlKategori;

let htmlPopuler = "";
pop.forEach(function (p) {
  htmlPopuler += '<article><div class="ico">' + p[0] + "</div><h4>" + p[1] + "</h4><small>" + p[2] + "</small><p>" + p[3] + "</p></article>";
});
el("pop").innerHTML = htmlPopuler;

let htmlLengkap = "";
full.forEach(function (f) {
  htmlLengkap += '<div class="item"><div class="img" style="background-image:' + f[3] + '"></div>' +
    "<div><h3>" + f[0] + "</h3><small>" + f[1] + "</small><p>" + f[2] + "</p></div></div>";
});
el("full").innerHTML = htmlLengkap;

let htmlPilihan = "";
["Umum", "Akun", "Pembayaran", "Pengiriman", "Refund & Retur", "Lainnya"].forEach(function (k) {
  htmlPilihan += '<button type="button">' + k + "</button>";
});
el("kc").innerHTML = htmlPilihan;

el("topnav").innerHTML = buatLink(menuAtas);
el("sidenav").innerHTML = buatLink(menuBubble);
el("m1").innerHTML = buatLink(menuAtas);
el("m2").innerHTML = buatLink(menuBubble);

function go(id) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    el(id).scrollIntoView({ behavior: "smooth" });
  }
}

function cari(kata) {
  kata = kata.toLowerCase();
  let ada = 0;
  Array.from(el("pop").children).forEach(function (a) {
    const cocok = a.textContent.toLowerCase().indexOf(kata) > -1;
    a.style.display = cocok ? "" : "none";
    if (cocok) ada++;
  });
  el("empty").style.display = ada ? "none" : "block";
}

el("gs").oninput = function () { cari(this.value); };
el("hs").oninput = function () { cari(this.value); };

document.querySelectorAll(".chip").forEach(function (chip) {
  chip.onclick = function () {
    el("hs").value = chip.textContent;
    cari(chip.textContent);
    go("faq");
  };
});

el("cats").onclick = function (e) {
  const kartu = e.target.closest(".cat");
  if (!kartu) return;
  const sudahAktif = kartu.classList.contains("on");
  Array.from(el("cats").children).forEach(function (k) { k.classList.remove("on"); });
  if (sudahAktif) {
    cari("");
  } else {
    kartu.classList.add("on");
    cari(cats[kartu.dataset.i][0]);
  }
};

el("kc").onclick = function (e) {
  if (e.target.tagName !== "BUTTON") return;
  Array.from(el("kc").children).forEach(function (b) { b.classList.remove("on"); });
  e.target.classList.add("on");
};

el("f").onsubmit = function (e) {
  e.preventDefault();
  el("ok").style.display = "block";
  this.reset();
};

function tutupMenu() {
  el("m1").classList.remove("open");
  el("m2").classList.remove("open");
}

function bukaTutup(id) {
  const terbuka = el(id).classList.contains("open");
  tutupMenu();
  if (!terbuka) el(id).classList.add("open");
}

document.addEventListener("click", function (e) {
  const link = e.target.closest("[data-go]");
  if (link) {
    go(link.dataset.go);
    tutupMenu();
  } else if (e.target.closest("#b1")) {
    bukaTutup("m1");
  } else if (e.target.closest("#b2")) {
    bukaTutup("m2");
  } else if (!e.target.closest(".glass")) {
    tutupMenu();
  }
});
