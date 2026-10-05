// ========================================
// DATA PAKET
// Diambil dari pesanan di Status Pesanan:
// barang contoh + barang hasil checkout
// ========================================

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const KURIR = ["Anteraja", "J&T Express", "SiCepat"];

// Status pesanan -> status pelacakan
const PETA_STATUS = {
    dikemas: { status: "process", teks: "Sedang dikemas" },
    dikirim: { status: "shipping", teks: "Dalam perjalanan" },
    selesai: { status: "delivered", teks: "Sudah sampai" }
};

function pad(n) {
    return String(n).padStart(2, "0");
}

function tgl(ms) {
    const d = new Date(ms);
    return pad(d.getDate()) + " " + BULAN[d.getMonth()] + " " + d.getFullYear();
}

function jam(ms) {
    const d = new Date(ms);
    return pad(d.getHours()) + ":" + pad(d.getMinutes());
}

function riwayat(daftar) {
    // daftar: [teks, waktu(ms)] dari yang terbaru ke terlama
    return daftar.map(function (x) {
        return { status: x[0], date: tgl(x[1]), time: jam(x[1]) };
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// Buat riwayat otomatis sesuai status & waktu pesanan dibuat
function buatRiwayat(status, t0) {
    const mnt = 60 * 1000;
    const jm = 60 * mnt;
    const dibuat = ["Pesanan dibuat", t0];
    const bayar = ["Pembayaran dikonfirmasi", t0 + 1 * mnt];
    const kemas = ["Pesanan sedang dikemas oleh penjual", t0 + 2 * mnt];

    if (status === "dikemas") {
        return riwayat([kemas, bayar, dibuat]);
    }

    const kurir = ["Paket diserahkan ke kurir", t0 + 3 * mnt];
    const jalan = ["Paket dalam perjalanan ke alamat tujuan", t0 + 4 * mnt];

    if (status === "dikirim") {
        return riwayat([jalan, kurir, kemas, bayar, dibuat]);
    }

    return riwayat([
        ["Paket diterima oleh penerima", t0 + 2 * jm],
        ["Kurir menuju alamat tujuan", t0 + 1 * jm],
        jalan, kurir, kemas, bayar, dibuat
    ]);
}

function buatPaket(key, nama, icon, jumlah, statusPesanan, t0, idx) {
    const peta = PETA_STATUS[statusPesanan];
    return {
        id: key,
        name: nama,
        icon: icon,
        qty: jumlah,
        resi: "GBY" + String(t0).slice(-9) + pad(idx),
        courier: KURIR[idx % KURIR.length],
        status: peta.status,
        statusText: peta.teks,
        estimate: statusPesanan === "selesai"
            ? "Diterima " + tgl(t0 + 2 * 60 * 60 * 1000)
            : "Estimasi tiba " + tgl(t0 + 2 * 24 * 60 * 60 * 1000),
        from: "Gudang Geboy",
        destination: "Alamat kamu",
        history: buatRiwayat(statusPesanan, t0)
    };
}

function ambilOrders() {
    try {
        const data = JSON.parse(localStorage.getItem("geboy_orders"));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

const sekarang = Date.now();
const HARI = 24 * 60 * 60 * 1000;

// Barang contoh (sama dengan yang ada di Status Pesanan)
const packages = [
    buatPaket("seed-iphone", "iPhone 17 Pro Max Silver 2TB Singapore", "📱", 1, "dikirim", sekarang - 1 * HARI, 0),
    buatPaket("seed-gerobak", "Gerobak sampah", "🗑️", 1, "dikemas", sekarang - 3 * 60 * 60 * 1000, 1),
    buatPaket("seed-rolex", "Jam Rolex Submariner 126613lb Yellow Gold", "⌚", 1, "selesai", sekarang - 4 * HARI, 2)
];

// Barang hasil checkout (terbaru di atas)
ambilOrders().forEach(function (o, i) {
    if (!PETA_STATUS[o.status]) {
        return;
    }
    packages.unshift(
        buatPaket("o" + i, o.nama, o.icon || "🛍️", o.jumlah || 1, o.status, o.waktu || sekarang, i + 3)
    );
});


// ========================================
// ELEMENT
// ========================================

const homePage =
    document.getElementById("homePage");

const trackingPage =
    document.getElementById("trackingPage");

const packageList =
    document.getElementById("packageList");

const trackingDetail =
    document.getElementById("trackingDetail");

const trackingHistory =
    document.getElementById("trackingHistory");

const searchInput =
    document.getElementById("searchInput");

const totalPackage =
    document.getElementById("totalPackage");

const backButton =
    document.getElementById("backButton");


// ========================================
// RENDER PACKAGE
// ========================================

function renderPackages(
    data = packages
) {

    packageList.innerHTML = "";

    totalPackage.textContent =
        `${data.length} paket`;


    if (data.length === 0) {

        packageList.innerHTML = `

            <div class="empty">

                Paket tidak ditemukan.

            </div>

        `;

        return;
    }


    data.forEach((item) => {

        const card =
            document.createElement("div");


        card.className =
            "package-card";


        card.innerHTML = `

            <div class="package-top">

                <div class="package-icon">
                    ${item.icon}
                </div>


                <div class="package-info">

                    <div class="package-name">
                        ${escapeHtml(item.name)}
                    </div>

                    <div class="package-number">
                        ${item.resi}
                    </div>

                    <div class="package-qty">
                        x${item.qty}
                    </div>

                </div>


                <div class="arrow">
                    ›
                </div>

            </div>


            <div class="package-bottom">

                <div class="
                    status
                    ${item.status}
                ">

                    <span class="status-dot"></span>

                    ${item.statusText}

                </div>


                <div class="estimate">

                    ${item.estimate}

                </div>

            </div>

        `;


        // Ketika card diklik
        card.addEventListener(
            "click",
            () => {

                openTracking(item.id);

            }
        );


        packageList.appendChild(card);

    });

}


// ========================================
// BUKA TRACKING
// ========================================

function openTracking(id) {

    const item =
        packages.find(
            packageItem =>
                packageItem.id === id
        );


    if (!item) {
        return;
    }


    // Sembunyikan home
    homePage.classList.add("hidden");


    // Tampilkan tracking
    trackingPage.classList.remove("hidden");


    // Render detail
    renderTrackingDetail(item);


    // Scroll ke atas
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DETAIL TRACKING
// ========================================

function renderTrackingDetail(item) {

    trackingDetail.innerHTML = `

        <div class="detail-product">

            <div class="detail-icon">
                ${item.icon}
            </div>


            <div>

                <h2>
                    ${escapeHtml(item.name)}
                </h2>

                <p>
                    x${item.qty}
                    •
                    ${item.courier}
                    •
                    ${item.resi}
                </p>

                <span class="status-badge ${item.status}">
                    ${item.statusText}
                </span>

            </div>

        </div>


        <div class="current-status">

            <div class="current-status-label">
                STATUS TERKINI
            </div>

            <div class="current-status-text">
                ${item.statusText}
            </div>

        </div>


        <div class="route">

            ${item.from}
            →
            ${item.destination}

            <br>

            ${item.estimate}

        </div>

    `;


    renderHistory(item.history);

}


// ========================================
// RENDER HISTORY
// ========================================

function renderHistory(history) {

    trackingHistory.innerHTML = "";


    history.forEach(
        (item, index) => {

            const element =
                document.createElement("div");


            element.className =
                "history-item";


            element.innerHTML = `

                <div class="history-marker">

                    <div class="history-dot"></div>

                </div>


                <div>

                    <div class="history-status">

                        ${item.status}

                    </div>


                    <div class="history-time">

                        ${item.date}
                        •
                        ${item.time}

                    </div>

                </div>

            `;


            trackingHistory.appendChild(
                element
            );

        }
    );

}


// ========================================
// KEMBALI KE DAFTAR
// ========================================

backButton.addEventListener(
    "click",
    () => {

        trackingPage.classList.add("hidden");

        homePage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ========================================
// SEARCH
// ========================================

searchInput.addEventListener(
    "input",
    function () {

        const keyword =
            this.value
                .toLowerCase()
                .trim();


        const filtered =
            packages.filter(item => {

                return (

                    item.name
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    item.resi
                        .toLowerCase()
                        .includes(keyword)

                );

            });


        renderPackages(filtered);

    }
);


// ========================================
// FILTER
// ========================================

const filters =
    document.querySelectorAll(
        ".filter"
    );


filters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            () => {

                // hapus active
                filters.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                // active button
                filter.classList.add(
                    "active"
                );


                const type =
                    filter.dataset.filter;


                if (type === "all") {

                    renderPackages(packages);

                    return;
                }

                const filtered =
                    packages.filter(
                        item =>
                            item.status === type
                    );

                renderPackages(filtered);
            }
        );
    }
);

renderPackages();

// Dibuka dari tombol "Lacak Barang" di Status Pesanan
const idDariUrl = new URLSearchParams(window.location.search).get("id");

if (idDariUrl) {
    openTracking(idDariUrl);
}
