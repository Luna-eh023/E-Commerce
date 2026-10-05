// Daftar status untuk menu di samping
const statusList = [
  ["all", "All"], ["belum", "Belum Bayar"], ["dikemas", "Sedang Dikemas"],
  ["dikirim", "Dikirim"], ["selesai", "Selesai"], ["batal", "Dibatalkan"],
  ["kembali", "Pengembalian Barang"]
];

// Teks label pada setiap status
const labelStatus = {
  belum: "BELUM BAYAR", dikemas: "DIKEMAS", dikirim: "DIKIRIM",
  selesai: "SELESAI", batal: "DIBATALKAN", kembali: "DIKEMBALIKAN"
};

// Data pesanan: nama, status, emoji gambar, warna latar gambar
const pesanan = [
  ["Jam Rolex Submariner 126613lb Yellow Gold", "selesai", "⌚", "linear-gradient(135deg,#1f6b3f,#0d3b22)", "Rp0", 1, "seed-rolex"],
  ["Pot Bunga", "belum", "🏺", "linear-gradient(135deg,#8a5a3a,#2b1a12)"],
  ["Gerobak sampah", "dikemas", "🗑️", "linear-gradient(135deg,#e9a8c7,#4b4f56)", "Rp0", 1, "seed-gerobak"],
  ["iPhone 17 Pro Max Silver 2TB Singapore", "dikirim", "📱", "linear-gradient(135deg,#cfd8e3,#1b1d22)", "Rp0", 1, "seed-iphone"],
  ["Patung 3D Manusia karya Davinci", "batal", "🗿", "linear-gradient(135deg,#e6e6e6,#6d6d6d)"]
];

// Pesanan dari keranjang (disimpan saat klik Checkout)
function formatRupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

function ambilPesananBaru() {
  try {
    const data = JSON.parse(localStorage.getItem("geboy_orders"));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

// Pesanan terbaru ditaruh paling atas
ambilPesananBaru().forEach(function (o, i) {
  pesanan.unshift([
    o.nama, o.status || "belum", o.icon || "🛍️",
    "linear-gradient(135deg,#5ABC81,#bfeacf)",
    formatRupiah(o.harga * o.jumlah), o.jumlah, "o" + i
  ]);
});

// Status yang bisa dilacak
const bisaDilacak = ["dikemas", "dikirim", "selesai"];

let statusAktif = "all";
let urutan = "def";
let kataCari = "";

function aman(teks) {
  return String(teks).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const el = function (id) { return document.getElementById(id); };

// Hitung jumlah pesanan untuk satu status
function hitung(kode) {
  if (kode === "all") return pesanan.length;
  return pesanan.filter(function (p) { return p[1] === kode; }).length;
}

// Gambar menu status
function tampilMenu() {
  let html = "";
  statusList.forEach(function (s) {
    const aktif = s[0] === statusAktif ? " on" : "";
    html += '<button class="tab' + aktif + '" data-k="' + s[0] + '"><i></i>' + s[1] + "<b>" + hitung(s[0]) + "</b></button>";
  });
  el("tabs").innerHTML = html;
}

// Ambil pesanan sesuai status, pencarian, dan urutan
function ambilPesanan() {
  let hasil = pesanan.filter(function (p) {
    const cocokStatus = statusAktif === "all" || p[1] === statusAktif;
    const cocokNama = p[0].toLowerCase().indexOf(kataCari.toLowerCase()) > -1;
    return cocokStatus && cocokNama;
  });
  if (urutan !== "def") {
    hasil = hasil.slice().sort(function (a, b) {
      const hasilBanding = a[0].localeCompare(b[0]);
      return urutan === "az" ? hasilBanding : -hasilBanding;
    });
  }
  return hasil;
}

// Gambar daftar pesanan
function tampilPesanan() {
  const hasil = ambilPesanan();
  if (hasil.length === 0) {
    el("list").innerHTML = '<div class="empty"><div>📭</div><p>Belum ada pesanan di sini.</p></div>';
    return;
  }
  let html = "";
  hasil.forEach(function (p, i) {
    html +=
      '<div class="card" style="--i:' + i + '">' +
        '<div class="ph" style="background:' + p[3] + '">' + p[2] + "</div>" +
        '<div><div class="nm">' + aman(p[0]) + '</div><div class="q">x' + (p[5] || 1) + '</div><div class="tot">Total Pesanan: <b>' + (p[4] || "Rp0") + '</b></div></div>' +
        '<div class="side"><span class="pill s-' + p[1] + '">' + labelStatus[p[1]] + "</span>" +
        '<div class="acts">' +
        (bisaDilacak.indexOf(p[1]) > -1 && p[6] ? '<a class="track" href="lacak.html?id=' + encodeURIComponent(p[6]) + '">Lacak Barang</a>' : "") +
        '<button class="buy" data-n="' + aman(p[0]) + '">Beli Lagi</button></div></div>' +
      "</div>";
  });
  el("list").innerHTML = html;
}

function tampilSemua() {
  tampilMenu();
  const judul = statusList.filter(function (s) { return s[0] === statusAktif; })[0][1];
  el("ttl").textContent = judul;
  tampilPesanan();
}

// Pesan kecil di bawah layar
let timerToast;
function toast(teks) {
  const t = el("toast");
  t.textContent = teks;
  t.classList.add("show");
  clearTimeout(timerToast);
  timerToast = setTimeout(function () { t.classList.remove("show"); }, 1800);
}

// Semua klik ditangani di sini
document.addEventListener("click", function (e) {
  const tab = e.target.closest(".tab");
  if (tab) {
    statusAktif = tab.dataset.k;
    tampilSemua();
    return;
  }
  const beli = e.target.closest(".buy");
  if (beli) {
    toast("✓ " + beli.dataset.n + " masuk keranjang");
    return;
  }
  const urut = e.target.closest("#pop button");
  if (urut) {
    urutan = urut.dataset.s;
    Array.from(el("pop").children).forEach(function (b) { b.classList.toggle("on", b === urut); });
    el("pop").classList.remove("open");
    tampilSemua();
    return;
  }
  if (e.target.closest("#fb")) {
    el("pop").classList.toggle("open");
    return;
  }
  el("pop").classList.remove("open");
});

// Ketik di kolom cari
el("q").oninput = function () {
  kataCari = this.value;
  tampilSemua();
};

tampilSemua();
