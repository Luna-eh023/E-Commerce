// TOAST

function beriPesan(pesan) {

    let toast =
        document.querySelector(
            ".toast-message"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.className =
            "toast-message";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        pesan;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


// DATA VOUCHER

const semuaVoucher = [

    {
        image:
            "images/geboy.jpg",

        title:
            "Diskon 12% s.d Rp100RB",

        min:
            "Min. Blj Rp300RB",

        tag:
            "Semua Metode Pembayaran",

        date:
            "Berlaku dalam: 1 hari"
    },


    {
        image:
            "images/geboy.jpg",

        title:
            "Diskon 8% s.d Rp500RB",

        min:
            "Min. Blj Rp50RB",

        tag:
            "Semua Kategori",

        date:
            "Berlaku dalam: 7 hari"
    },


    {
        image:
            "images/geboy.jpg",

        title:
            "Diskon 12% s.d Rp300RB",

        min:
            "Min. Blj Rp200RB",

        tag:
            "GeboyPay",

        date:
            "Berlaku dalam: 3 hari"
    },


    {
        image:
            "images/geboy.jpg",

        title:
            "Diskon 5% s.d Rp300RB",

        min:
            "Min. Blj Rp200RB",

        tag:
            "Pilihan Geboy",

        date:
            "Berlaku dalam: 2 hari"
    }

];


const geboyVoucher = [

    {
        image:
            "images/geboy1.jpg",

        title:
            "Diskon 8% s.d Rp500RB",

        min:
            "Min. Blj Rp50RB",

        tag:
            "Semua Kategori",

        date:
            "Berlaku dalam: 3 hari"
    },


    {
        image:
            "images/geboy1.jpg",

        title:
            "Diskon 5% s.d Rp300RB",

        min:
            "Min. Blj Rp200RB",

        tag:
            "Koleksi Pilihan",

        date:
            "Berlaku dalam: 1 hari"
    },


    {
        image:
            "images/geboy1.jpg",

        title:
            "Diskon 20% s.d Rp500RB",

        min:
            "Min. Blj Rp200RB",

        tag:
            "GeboyPay",

        date:
            "Berlaku dalam: 5 hari"
    },


    {
        image:
            "images/geboy1.jpg",

        title:
            "Diskon 12% s.d Rp10RB",

        min:
            "Min. Blj Rp30RB",

        tag:
            "GeboyPay",

        date:
            "Berlaku dalam: 1 hari"
    }

];


const vipVoucher = [

    {
        image:
            "images/vip.jpg",

        title:
            "Gratis Ongkir",

        min:
            "Min. Blj Rp0",

        tag:
            "GeboyVIP",

        date:
            "Hingga: 01.11.2026"
    },


    {
        image:
            "images/vip.jpg",

        title:
            "Gratis Ongkir",

        min:
            "Min. Blj Rp0",

        tag:
            "GeboyVIP",

        date:
            "Hingga: 01.11.2026"
    },


    {
        image:
            "images/vip.jpg",

        title:
            "Diskon s.d. 12% hingga Rp500RB",

        min:
            "Min. Blj Rp500RB",

        tag:
            "GeboyVIP",

        date:
            "Hingga: 01.11.2026"
    },


    {
        image:
            "images/vip.jpg",

        title:
            "Diskon 20% s.d. Rp10RB",

        min:
            "Min. Blj Rp1RB",

        tag:
            "GeboyVIP",

        date:
            "Berakhir dalam: 22 jam"
    }

];


const tokoVoucher = [

    {
        image:
            "images/flower.jpg",

        title:
            "Diskon Rp5RB",

        min:
            "Min. Blj Rp198RB",

        tag:
            "Flower22",

        date:
            "Hingga: 15.11.2026"
    },


    {
        image:
            "images/baju.jpg",

        title:
            "Diskon Rp10RB",

        min:
            "Min. Blj Rp50RB",

        tag:
            "baju1",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/voucher.jpg",

        title:
            "Diskon Rp500",

        min:
            "Min. Blj Rp20RB",

        tag:
            "Voucher Pembelian Pertama",

        date:
            "Hingga: 08.10.2026"
    }

];


const foodVoucher = [

    {
        image:
            "images/food.jpg",

        title:
            "Diskon 15% s.d. Rp10RB",

        min:
            "Min. Blj Rp65RB",

        tag:
            "Kartu Debit Geboy",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/food.jpg",

        title:
            "Diskon Rp25RB",

        min:
            "Min. Blj Rp125RB",

        tag:
            "Kartu Kredit Geboy",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/food.jpg",

        title:
            "Diskon Rp25RB",

        min:
            "Min. Blj Rp125RB",

        tag:
            "Kartu Debit Geboy",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/food.jpg",

        title:
            "Diskon Rp20RB",

        min:
            "Min. Blj Rp200RB",

        tag:
            "Kartu Kredit Geboy",

        date:
            "Hingga: 31.10.2026"
    }

];


const geboyPayVoucher = [

    {
        image:
            "images/star.jpg",

        title:
            "Starbucks",

        min:
            "Min. Blj Rp1",

        tag:
            "GEBOYVIP",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/tian.jpg",

        title:
            "Tianlala",

        min:
            "Min. Blj Rp1",

        tag:
            "GEBOYVIP",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/yosi.jpg",

        title:
            "Yoshinoya",

        min:
            "Min. Blj Rp16RB",

        tag:
            "GEBOYVIP",

        date:
            "Hingga: 31.10.2026"
    },


    {
        image:
            "images/kfc.jpg",

        title:
            "KFC",

        min:
            "Min. Blj Rp20RB",

        tag:
            "GEBOYVIP",

        date:
            "Hingga: 31.10.2026"
    }

];


// TAMPILKAN VOUCHER

function tampilkanVoucher(data) {

    const voucherList =
        document.getElementById(
            "voucherList"
        );


    voucherList.innerHTML =
        "";


    data.forEach(
        function (voucher) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "voucher-card";


            card.innerHTML = `

                <img
                    src="${voucher.image}"
                    alt="Voucher"
                    class="voucher-image"
                >

                <div class="voucher-content">

                    <h2>
                        ${voucher.title}
                    </h2>

                    <p>
                        ${voucher.min}
                    </p>

                    <span class="voucher-tag">
                        ${voucher.tag}
                    </span>

                    <p class="expired">
                        ${voucher.date}
                    </p>

                    <button
                        class="use-button"
                        onclick="pakaiVoucher('${voucher.title}', this)"
                        type="button"
                    >
                        Pakai Nanti
                    </button>

                </div>

            `;


            voucherList.appendChild(
                card
            );

        }
    );

}


// PAKAI VOUCHER

function pakaiVoucher(
    namaVoucher,
    tombol
) {

    tombol.textContent =
        "Dipilih";


    tombol.disabled =
        true;


    tombol.style.background =
        "#eaf8f0";


    tombol.style.color =
        "#479d6b";


    const card =
        tombol.closest(
            ".voucher-card"
        );


    card.classList.add(
        "used"
    );


    beriPesan(
        'Voucher "' +
        namaVoucher +
        '" berhasil dipilih.'
    );

}


// FILTER KATEGORI

function showCategory(
    category,
    button
) {

    const moreMenu =
        document.getElementById(
            "moreMenu"
        );


    moreMenu.classList.remove(
        "show"
    );


    document
        .querySelectorAll(
            ".category"
        )
        .forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }


    if (
        category ===
        "semua"
    ) {

        tampilkanVoucher(
            semuaVoucher
        );

    }


    else if (
        category ===
        "geboy"
    ) {

        tampilkanVoucher(
            geboyVoucher
        );

    }


    else if (
        category ===
        "vip"
    ) {

        tampilkanVoucher(
            vipVoucher
        );

    }


    else if (
        category ===
        "toko"
    ) {

        tampilkanVoucher(
            tokoVoucher
        );

    }


    else if (
        category ===
        "food"
    ) {

        tampilkanVoucher(
            foodVoucher
        );

    }


    else if (
        category ===
        "geboypay"
    ) {

        tampilkanVoucher(
            geboyPayVoucher
        );

    }

}


// MORE MENU

function toggleMore() {

    const menu =
        document.getElementById(
            "moreMenu"
        );


    menu.classList.toggle(
        "show"
    );

}


// SIMPAN KODE VOUCHER

function simpanVoucher() {

    const input =
        document.getElementById(
            "voucherCode"
        );


    const kode =
        input.value.trim();


    if (
        kode ===
        ""
    ) {

        beriPesan(
            "Silakan masukkan kode voucher terlebih dahulu."
        );

        return;
    }


    let kodeVoucher =
        JSON.parse(
            localStorage.getItem(
                "kodeVoucherGeboy"
            )
        ) || [];


    if (
        kodeVoucher.includes(
            kode
        )
    ) {

        beriPesan(
            "Kode voucher tersebut sudah disimpan."
        );

        return;
    }


    kodeVoucher.push(
        kode
    );


    localStorage.setItem(
        "kodeVoucherGeboy",
        JSON.stringify(
            kodeVoucher
        )
    );


    input.value =
        "";


    tampilkanVoucherTersimpan();


    beriPesan(
        "Kode voucher " +
        kode +
        " berhasil disimpan."
    );

}


// TAMPILKAN KODE TERSIMPAN

function tampilkanVoucherTersimpan() {

    const container =
        document.getElementById(
            "savedVoucherList"
        );


    if (!container) {
        return;
    }


    const data =
        JSON.parse(
            localStorage.getItem(
                "kodeVoucherGeboy"
            )
        ) || [];


    container.innerHTML =
        "";


    if (
        data.length ===
        0
    ) {

        return;

    }


    data.forEach(
        function (
            kode,
            index
        ) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "saved-voucher";


            div.innerHTML = `

                <div>

                    Kode voucher:

                    <span>
                        ${kode}
                    </span>

                </div>


                <button
                    onclick="hapusVoucherTersimpan(${index})"
                    type="button"
                >
                    Hapus
                </button>

            `;


            container.appendChild(
                div
            );

        }
    );

}


// HAPUS KODE

function hapusVoucherTersimpan(
    index
) {

    let data =
        JSON.parse(
            localStorage.getItem(
                "kodeVoucherGeboy"
            )
        ) || [];


    data.splice(
        index,
        1
    );


    localStorage.setItem(
        "kodeVoucherGeboy",
        JSON.stringify(
            data
        )
    );


    tampilkanVoucherTersimpan();


    beriPesan(
        "Kode voucher berhasil dihapus."
    );

}


// SAAT HALAMAN DIBUKA

tampilkanVoucher(
    semuaVoucher
);

tampilkanVoucherTersimpan();


// KLIK DI LUAR MORE MENU

document.addEventListener(
    "click",
    function (event) {

        const moreContainer =
            document.querySelector(
                ".more-container"
            );


        const moreMenu =
            document.getElementById(
                "moreMenu"
            );


        if (
            moreContainer &&
            moreMenu &&
            !moreContainer.contains(
                event.target
            )
        ) {

            moreMenu.classList.remove(
                "show"
            );

        }

    }
);