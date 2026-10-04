// ========================================
// DATA PAKET
// ========================================

const packages = [

    {
        id: 1,

        name: "Keyboard Mechanical",

        resi: "ANJ123456789",

        courier: "Anteraja",

        status: "shipping",

        statusText: "Dalam perjalanan",

        estimate: "Estimasi tiba 5 Okt",

        from: "Jakarta",

        destination: "Bandung",

        history: [

            {
                status: "Paket sedang diantar kurir",
                date: "04 Okt 2026",
                time: "09:32"
            },

            {
                status: "Paket tiba di Bandung",
                date: "04 Okt 2026",
                time: "07:15"
            },

            {
                status: "Paket diberangkatkan dari Jakarta",
                date: "03 Okt 2026",
                time: "22:10"
            },

            {
                status: "Paket diproses oleh kurir",
                date: "03 Okt 2026",
                time: "15:30"
            },

            {
                status: "Pesanan dibuat",
                date: "03 Okt 2026",
                time: "13:20"
            }

        ]
    },


    {
        id: 2,

        name: "Headset Wireless",

        resi: "ANJ987654321",

        courier: "J&T Express",

        status: "delivered",

        statusText: "Sudah sampai",

        estimate: "Diterima 3 Okt",

        from: "Depok",

        destination: "Jakarta",

        history: [

            {
                status: "Paket diterima oleh penerima",
                date: "03 Okt 2026",
                time: "16:42"
            },

            {
                status: "Kurir menuju alamat tujuan",
                date: "03 Okt 2026",
                time: "14:20"
            },

            {
                status: "Paket tiba di lokasi transit",
                date: "03 Okt 2026",
                time: "11:15"
            },

            {
                status: "Paket diproses oleh kurir",
                date: "02 Okt 2026",
                time: "19:40"
            },

            {
                status: "Pesanan dibuat",
                date: "02 Okt 2026",
                time: "17:30"
            }

        ]
    },


    {
        id: 3,

        name: "Mouse Wireless",

        resi: "ANJ555666777",

        courier: "SiCepat",

        status: "process",

        statusText: "Sedang diproses",

        estimate: "Estimasi tiba 7 Okt",

        from: "Tangerang",

        destination: "Bekasi",

        history: [

            {
                status: "Pesanan sedang diproses oleh penjual",
                date: "04 Okt 2026",
                time: "10:15"
            },

            {
                status: "Menunggu paket diserahkan ke kurir",
                date: "04 Okt 2026",
                time: "08:30"
            },

            {
                status: "Pesanan telah dikonfirmasi",
                date: "04 Okt 2026",
                time: "08:10"
            },

            {
                status: "Pesanan dibuat",
                date: "04 Okt 2026",
                time: "07:45"
            }

        ]
    }

];


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
                    📦
                </div>


                <div class="package-info">

                    <div class="package-name">
                        ${item.name}
                    </div>

                    <div class="package-number">
                        ${item.resi}
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
                📦
            </div>


            <div>

                <h2>
                    ${item.name}
                </h2>

                <p>
                    ${item.courier}
                    •
                    ${item.resi}
                </p>

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