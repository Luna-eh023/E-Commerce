let profilData =
    JSON.parse(localStorage.getItem("profilGeboy")) || {
        username: "Bunga",
        nama: "",
        email: "",
        telepon: "",
        namaToko: "",
        gender: "",
        tanggalLahir: "",
        foto: ""
    };


let coinSaldo =
    Number(localStorage.getItem("coinSaldoGeboy"));

if (isNaN(coinSaldo)) {
    coinSaldo = 160;

    localStorage.setItem(
        "coinSaldoGeboy",
        coinSaldo
    );
}


const rewardCoin = [
    30,
    120,
    120,
    50,
    180,
    180,
    500
];


let coinState =
    JSON.parse(
        localStorage.getItem("coinStateGeboy")
    ) || {
        currentDay: 0,
        lastClaim: "",
        extraClaimed: false
    };


let coinHistory =
    JSON.parse(
        localStorage.getItem("coinHistoryGeboy")
    ) || [];


window.onload = function () {

    isiDataProfil();

    tampilkanKartu();

    tampilkanOneKlik();

    tampilkanAlamat();

    isiPengaturan();

    tampilkanVoucher(semuaVoucher);

    tampilkanVoucherTersimpan();

    updateCoinDisplay();

    tampilkanRewardCoin();

    tampilkanRiwayatCoin();

};


function beriPesan(pesan) {

    let toast =
        document.querySelector(".toast-message");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "toast-message";

        document.body.appendChild(toast);

    }


    toast.textContent =
        pesan;


    toast.classList.add("show");


    clearTimeout(window.toastTimer);


    window.toastTimer =
        setTimeout(
            function () {

                toast.classList.remove("show");

            },
            2200
        );

}


function showPage(page) {

    const semuaPage =
        document.querySelectorAll(".page");


    semuaPage.forEach(
        function (item) {

            item.classList.add("hidden");

        }
    );


    document
        .getElementById("profileMenu")
        .classList.remove("show");


    document
        .querySelectorAll(".nav-menu button")
        .forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


    if (page === "profil") {

        document
            .getElementById("profilePage")
            .classList.remove("hidden");


        document
            .getElementById("profileMenu")
            .classList.add("show");


        document
            .getElementById("profilButton")
            .classList.add("active");


        openProfileChild("profil");

    }


    else if (page === "voucher") {

        document
            .getElementById("voucherPage")
            .classList.remove("hidden");


        document
            .querySelectorAll(".nav-menu button")[1]
            .classList.add("active");


        tampilkanVoucher(semuaVoucher);

    }


    else if (page === "coin") {

        document
            .getElementById("coinPage")
            .classList.remove("hidden");


        document
            .querySelectorAll(".nav-menu button")[2]
            .classList.add("active");


        updateCoinDisplay();

        tampilkanRewardCoin();

        tampilkanRiwayatCoin();

    }

}


function openProfileChild(child) {

    document
        .querySelectorAll(".page")
        .forEach(
            function (page) {

                page.classList.add("hidden");

            }
        );


    document
        .querySelectorAll(".profile-menu button")
        .forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


    if (child === "profil") {

        document
            .getElementById("profilePage")
            .classList.remove("hidden");


        document
            .querySelector(
                ".profile-menu button:nth-child(1)"
            )
            .classList.add("active");

    }


    else if (child === "bank") {

        document
            .getElementById("bankPage")
            .classList.remove("hidden");


        document
            .querySelector(
                ".profile-menu button:nth-child(2)"
            )
            .classList.add("active");


        tampilkanKartu();

        tampilkanOneKlik();

    }


    else if (child === "alamat") {

        document
            .getElementById("alamatPage")
            .classList.remove("hidden");


        document
            .querySelector(
                ".profile-menu button:nth-child(3)"
            )
            .classList.add("active");


        tampilkanAlamat();

    }


    else if (child === "password") {

        document
            .getElementById("passwordPage")
            .classList.remove("hidden");


        document
            .querySelector(
                ".profile-menu button:nth-child(4)"
            )
            .classList.add("active");

    }


    else if (child === "notifikasi") {

        document
            .getElementById("notificationPage")
            .classList.remove("hidden");


        document
            .querySelector(
                ".profile-menu button:nth-child(5)"
            )
            .classList.add("active");


        isiPengaturan();

    }


    else if (child === "privasi") {

        document
            .getElementById("privacyPage")
            .classList.remove("hidden");


        document
            .querySelector(
                ".profile-menu button:nth-child(6)"
            )
            .classList.add("active");


        isiPengaturan();

    }

}


function isiDataProfil() {

    document
        .getElementById("username")
        .value =
        profilData.username || "";


    document
        .getElementById("nama")
        .value =
        profilData.nama || "";


    document
        .getElementById("email")
        .value =
        profilData.email || "";


    document
        .getElementById("telepon")
        .value =
        profilData.telepon || "";


    document
        .getElementById("namaToko")
        .value =
        profilData.namaToko || "";


    document
        .getElementById("tanggalLahir")
        .value =
        profilData.tanggalLahir || "";


    if (profilData.gender) {

        const gender =
            document.querySelector(
                'input[name="gender"][value="' +
                profilData.gender +
                '"]'
            );


        if (gender) {
            gender.checked = true;
        }

    }


    if (profilData.foto) {

        document
            .getElementById("profileImage")
            .src =
            profilData.foto;

    }


    document
        .getElementById("navbarUsername")
        .textContent =
        profilData.username || "Bunga";

}


function simpanProfil() {

    let gender = "";


    const genderPilihan =
        document.querySelector(
            'input[name="gender"]:checked'
        );


    if (genderPilihan) {

        gender =
            genderPilihan.value;

    }


    profilData.username =
        document
            .getElementById("username")
            .value
            .trim();


    profilData.nama =
        document
            .getElementById("nama")
            .value
            .trim();


    profilData.email =
        document
            .getElementById("email")
            .value
            .trim();


    profilData.telepon =
        document
            .getElementById("telepon")
            .value
            .trim();


    profilData.namaToko =
        document
            .getElementById("namaToko")
            .value
            .trim();


    profilData.gender =
        gender;


    profilData.tanggalLahir =
        document
            .getElementById("tanggalLahir")
            .value;


    localStorage.setItem(
        "profilGeboy",
        JSON.stringify(profilData)
    );


    document
        .getElementById("navbarUsername")
        .textContent =
        profilData.username || "Bunga";


    beriPesan(
        "Data profil berhasil disimpan."
    );

}


function ubahFoto(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        beriPesan(
            "File yang dipilih harus berupa gambar."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function (e) {

            const foto =
                e.target.result;


            document
                .getElementById("profileImage")
                .src =
                foto;


            profilData.foto =
                foto;


            localStorage.setItem(
                "profilGeboy",
                JSON.stringify(profilData)
            );


            beriPesan(
                "Foto profil berhasil disimpan."
            );

        };


    reader.readAsDataURL(file);

}


let kartuData =
    JSON.parse(
        localStorage.getItem("kartuGeboy")
    ) || [];


function tampilkanKartu() {

    const list =
        document.getElementById("cardList");


    if (!list) {
        return;
    }


    list.innerHTML = "";


    if (kartuData.length === 0) {

        list.innerHTML =
            "<p>Belum ada kartu yang ditambahkan.</p>";

        return;
    }


    kartuData.forEach(
        function (kartu, index) {

            const div =
                document.createElement("div");


            div.className =
                "card-item";


            div.innerHTML = `
                <div>
                    <b>${kartu.bank}</b>
                    <p>${kartu.nomor}</p>
                </div>

                <button
                    class="delete-button"
                    onclick="hapusKartu(${index})">
                    Hapus
                </button>
            `;


            list.appendChild(div);

        }
    );

}


function tambahKartu() {

    const bank =
        prompt(
            "Masukkan nama bank:"
        );


    if (!bank) {
        return;
    }


    const nomor =
        prompt(
            "Masukkan nomor kartu:"
        );


    if (!nomor) {
        return;
    }


    kartuData.push({

        bank:
            bank,

        nomor:
            nomor

    });


    localStorage.setItem(
        "kartuGeboy",
        JSON.stringify(kartuData)
    );


    tampilkanKartu();


    beriPesan(
        "Kartu berhasil ditambahkan."
    );

}


function hapusKartu(index) {

    kartuData.splice(
        index,
        1
    );


    localStorage.setItem(
        "kartuGeboy",
        JSON.stringify(kartuData)
    );


    tampilkanKartu();


    beriPesan(
        "Kartu berhasil dihapus."
    );

}


let oneKlikData =
    JSON.parse(
        localStorage.getItem("oneKlikGeboy")
    ) || [];


function tambahOneKlik() {

    const nomor =
        prompt(
            "Masukkan nomor BCA OneKlik:"
        );


    if (!nomor) {
        return;
    }


    oneKlikData.push(
        nomor
    );


    localStorage.setItem(
        "oneKlikGeboy",
        JSON.stringify(oneKlikData)
    );


    tampilkanOneKlik();


    beriPesan(
        "BCA OneKlik berhasil ditambahkan."
    );

}


function tampilkanOneKlik() {

    const list =
        document.getElementById(
            "oneKlikList"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    if (oneKlikData.length === 0) {

        list.innerHTML =
            "<p>Belum ada BCA OneKlik.</p>";

        return;
    }


    oneKlikData.forEach(
        function (nomor, index) {

            const div =
                document.createElement("div");


            div.className =
                "card-item";


            div.innerHTML = `
                <div>
                    BCA OneKlik<br>
                    ${nomor}
                </div>

                <button
                    class="delete-button"
                    onclick="hapusOneKlik(${index})">
                    Hapus
                </button>
            `;


            list.appendChild(div);

        }
    );

}


function hapusOneKlik(index) {

    oneKlikData.splice(
        index,
        1
    );


    localStorage.setItem(
        "oneKlikGeboy",
        JSON.stringify(oneKlikData)
    );


    tampilkanOneKlik();


    beriPesan(
        "BCA OneKlik berhasil dihapus."
    );

}


let alamatData =
    JSON.parse(
        localStorage.getItem("alamatGeboy")
    ) || [];


function tampilkanAlamat() {

    const list =
        document.getElementById(
            "addressList"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    if (alamatData.length === 0) {

        list.innerHTML =
            "<p>Belum ada alamat yang ditambahkan.</p>";

        return;
    }


    alamatData.forEach(
        function (alamat, index) {

            const div =
                document.createElement("div");


            div.className =
                "address-item";


            div.innerHTML = `
                <h3>
                    ${alamat.nama}
                </h3>

                <p>
                    ${alamat.telepon}
                </p>

                <p>
                    ${alamat.alamat}
                </p>

                <p>
                    ${alamat.kota}
                </p>

                <div class="address-buttons">

                    <button
                        onclick="editAlamat(${index})">
                        Ubah
                    </button>

                    <button
                        onclick="hapusAlamat(${index})">
                        Hapus
                    </button>

                </div>
            `;


            list.appendChild(div);

        }
    );

}


function tambahAlamat() {

    const nama =
        prompt(
            "Nama penerima:"
        );


    if (!nama) {
        return;
    }


    const telepon =
        prompt(
            "Nomor telepon:"
        );


    if (!telepon) {
        return;
    }


    const alamat =
        prompt(
            "Alamat lengkap:"
        );


    if (!alamat) {
        return;
    }


    const kota =
        prompt(
            "Kota / Kabupaten:"
        );


    if (!kota) {
        return;
    }


    alamatData.push({

        nama:
            nama,

        telepon:
            telepon,

        alamat:
            alamat,

        kota:
            kota

    });


    localStorage.setItem(
        "alamatGeboy",
        JSON.stringify(alamatData)
    );


    tampilkanAlamat();


    beriPesan(
        "Alamat berhasil ditambahkan."
    );

}


function editAlamat(index) {

    const alamat =
        alamatData[index];


    const nama =
        prompt(
            "Nama penerima:",
            alamat.nama
        );


    if (!nama) {
        return;
    }


    const telepon =
        prompt(
            "Nomor telepon:",
            alamat.telepon
        );


    if (!telepon) {
        return;
    }


    const alamatBaru =
        prompt(
            "Alamat lengkap:",
            alamat.alamat
        );


    if (!alamatBaru) {
        return;
    }


    const kota =
        prompt(
            "Kota / Kabupaten:",
            alamat.kota
        );


    if (!kota) {
        return;
    }


    alamatData[index] = {

        nama:
            nama,

        telepon:
            telepon,

        alamat:
            alamatBaru,

        kota:
            kota

    };


    localStorage.setItem(
        "alamatGeboy",
        JSON.stringify(alamatData)
    );


    tampilkanAlamat();


    beriPesan(
        "Alamat berhasil diubah."
    );

}


function hapusAlamat(index) {

    if (
        confirm(
            "Yakin ingin menghapus alamat ini?"
        )
    ) {

        alamatData.splice(
            index,
            1
        );


        localStorage.setItem(
            "alamatGeboy",
            JSON.stringify(alamatData)
        );


        tampilkanAlamat();


        beriPesan(
            "Alamat berhasil dihapus."
        );

    }

}


let passwordGeboy =
    localStorage.getItem(
        "passwordGeboy"
    );


if (!passwordGeboy) {

    passwordGeboy =
        "123456";


    localStorage.setItem(
        "passwordGeboy",
        passwordGeboy
    );

}


function ubahPassword() {

    const oldPassword =
        document
            .getElementById("oldPassword")
            .value;


    const newPassword =
        document
            .getElementById("newPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    if (
        oldPassword !==
        passwordGeboy
    ) {

        beriPesan(
            "Password lama salah."
        );

        return;
    }


    if (
        newPassword.length < 6
    ) {

        beriPesan(
            "Password baru minimal 6 karakter."
        );

        return;
    }


    if (
        newPassword !==
        confirmPassword
    ) {

        beriPesan(
            "Konfirmasi password tidak sama."
        );

        return;
    }


    passwordGeboy =
        newPassword;


    localStorage.setItem(
        "passwordGeboy",
        passwordGeboy
    );


    document
        .getElementById("oldPassword")
        .value = "";


    document
        .getElementById("newPassword")
        .value = "";


    document
        .getElementById("confirmPassword")
        .value = "";


    beriPesan(
        "Password berhasil diubah."
    );

}


let pengaturan =
    JSON.parse(
        localStorage.getItem(
            "pengaturanGeboy"
        )
    ) || {

        notifPesanan:
            true,

        notifPromosi:
            true,

        notifSurvei:
            false,

        notifSMS:
            true,

        privacyProfile:
            true,

        privacyActivity:
            true,

        privacyPersonal:
            true

    };


function isiPengaturan() {

    const notifPesanan =
        document.getElementById(
            "notifPesanan"
        );


    if (!notifPesanan) {
        return;
    }


    notifPesanan.checked =
        pengaturan.notifPesanan;


    document
        .getElementById(
            "notifPromosi"
        )
        .checked =
        pengaturan.notifPromosi;


    document
        .getElementById(
            "notifSurvei"
        )
        .checked =
        pengaturan.notifSurvei;


    document
        .getElementById(
            "notifSMS"
        )
        .checked =
        pengaturan.notifSMS;


    document
        .getElementById(
            "privacyProfile"
        )
        .checked =
        pengaturan.privacyProfile;


    document
        .getElementById(
            "privacyActivity"
        )
        .checked =
        pengaturan.privacyActivity;


    document
        .getElementById(
            "privacyPersonal"
        )
        .checked =
        pengaturan.privacyPersonal;


    tampilkanHasilNotifikasi();


    tampilkanHasilPrivasi();

}


function simpanNotifikasi(jenis) {

    pengaturan.notifPesanan =
        document
            .getElementById(
                "notifPesanan"
            )
            .checked;


    pengaturan.notifPromosi =
        document
            .getElementById(
                "notifPromosi"
            )
            .checked;


    pengaturan.notifSurvei =
        document
            .getElementById(
                "notifSurvei"
            )
            .checked;


    pengaturan.notifSMS =
        document
            .getElementById(
                "notifSMS"
            )
            .checked;


    localStorage.setItem(
        "pengaturanGeboy",
        JSON.stringify(pengaturan)
    );


    tampilkanHasilNotifikasi();


    let pesan =
        "Pengaturan notifikasi diperbarui.";


    if (
        jenis === "pesanan"
    ) {

        if (
            pengaturan.notifPesanan
        ) {

            pesan =
                "Notifikasi status pesanan diaktifkan.";

        } else {

            pesan =
                "Notifikasi status pesanan dimatikan.";

        }

    }


    if (
        jenis === "promosi"
    ) {

        if (
            pengaturan.notifPromosi
        ) {

            pesan =
                "Notifikasi promosi diaktifkan.";

        } else {

            pesan =
                "Notifikasi promosi dimatikan.";

        }

    }


    if (
        jenis === "survei"
    ) {

        if (
            pengaturan.notifSurvei
        ) {

            pesan =
                "Notifikasi survei diaktifkan.";

        } else {

            pesan =
                "Notifikasi survei dimatikan.";

        }

    }


    if (
        jenis === "sms"
    ) {

        if (
            pengaturan.notifSMS
        ) {

            pesan =
                "Notifikasi SMS diaktifkan.";

        } else {

            pesan =
                "Notifikasi SMS dimatikan.";

        }

    }


    beriPesan(
        pesan
    );

}


function tampilkanHasilNotifikasi() {

    const data = [

        {
            id:
                "notifPesanan",

            status:
                "notifPesananStatus",

            text:
                "notifPesananText"
        },

        {
            id:
                "notifPromosi",

            status:
                "notifPromosiStatus",

            text:
                "notifPromosiText"
        },

        {
            id:
                "notifSurvei",

            status:
                "notifSurveiStatus",

            text:
                "notifSurveiText"
        },

        {
            id:
                "notifSMS",

            status:
                "notifSMSStatus",

            text:
                "notifSMSText"
        }

    ];


    data.forEach(
        function (item) {

            const checkbox =
                document.getElementById(
                    item.id
                );


            const status =
                document.getElementById(
                    item.status
                );


            const text =
                document.getElementById(
                    item.text
                );


            if (
                !checkbox ||
                !status ||
                !text
            ) {
                return;
            }


            if (
                checkbox.checked
            ) {

                status.textContent =
                    "Aktif";


                status.classList.remove(
                    "off"
                );


            } else {

                status.textContent =
                    "Nonaktif";


                status.classList.add(
                    "off"
                );

            }

        }
    );


    const result =
        document.getElementById(
            "notificationResult"
        );


    if (!result) {
        return;
    }


    let aktif = [];


    if (
        pengaturan.notifPesanan
    ) {

        aktif.push(
            "status pesanan"
        );

    }


    if (
        pengaturan.notifPromosi
    ) {

        aktif.push(
            "promosi"
        );

    }


    if (
        pengaturan.notifSurvei
    ) {

        aktif.push(
            "survei pembeli"
        );

    }


    if (
        pengaturan.notifSMS
    ) {

        aktif.push(
            "SMS"
        );

    }


    if (
        aktif.length === 0
    ) {

        result.innerHTML = `
            <b>
                Ringkasan Notifikasi
            </b>

            <p>
                Semua notifikasi sedang dimatikan.
                Tidak ada informasi tambahan yang akan ditampilkan.
            </p>
        `;

        return;
    }


    result.innerHTML = `
        <b>
            Ringkasan Notifikasi
        </b>

        <p>
            Notifikasi yang aktif:
            ${aktif.join(", ")}.
            Jika pengaturan dimatikan,
            jenis informasi tersebut
            tidak akan ditampilkan
            sebagai notifikasi.
        </p>
    `;

}


function simpanPrivasi(jenis) {

    pengaturan.privacyProfile =
        document
            .getElementById(
                "privacyProfile"
            )
            .checked;


    pengaturan.privacyActivity =
        document
            .getElementById(
                "privacyActivity"
            )
            .checked;


    pengaturan.privacyPersonal =
        document
            .getElementById(
                "privacyPersonal"
            )
            .checked;


    localStorage.setItem(
        "pengaturanGeboy",
        JSON.stringify(pengaturan)
    );


    tampilkanHasilPrivasi();


    let pesan =
        "Pengaturan privasi diperbarui.";


    if (
        jenis === "profile"
    ) {

        if (
            pengaturan.privacyProfile
        ) {

            pesan =
                "Profil publik sekarang dapat dilihat.";

        } else {

            pesan =
                "Profil publik sekarang disembunyikan.";

        }

    }


    if (
        jenis === "activity"
    ) {

        if (
            pengaturan.privacyActivity
        ) {

            pesan =
                "Aktivitas akun sekarang dapat ditampilkan.";

        } else {

            pesan =
                "Aktivitas akun sekarang disembunyikan.";

        }

    }


    if (
        jenis === "personal"
    ) {

        if (
            pengaturan.privacyPersonal
        ) {

            pesan =
                "Personalisasi rekomendasi diaktifkan.";

        } else {

            pesan =
                "Personalisasi rekomendasi dimatikan.";

        }

    }


    beriPesan(
        pesan
    );

}


function tampilkanHasilPrivasi() {

    const data = [

        {
            id:
                "privacyProfile",

            status:
                "privacyProfileStatus",

            text:
                "privacyProfileText"
        },

        {
            id:
                "privacyActivity",

            status:
                "privacyActivityStatus",

            text:
                "privacyActivityText"
        },

        {
            id:
                "privacyPersonal",

            status:
                "privacyPersonalStatus",

            text:
                "privacyPersonalText"
        }

    ];


    data.forEach(
        function (item) {

            const checkbox =
                document.getElementById(
                    item.id
                );


            const status =
                document.getElementById(
                    item.status
                );


            const text =
                document.getElementById(
                    item.text
                );


            if (
                !checkbox ||
                !status ||
                !text
            ) {

                return;

            }


            if (
                checkbox.checked
            ) {

                status.textContent =
                    "Aktif";


                status.classList.remove(
                    "off"
                );


            } else {

                status.textContent =
                    "Nonaktif";


                status.classList.add(
                    "off"
                );

            }

        }
    );


    const preview =
        document.getElementById(
            "privacyPreview"
        );


    if (!preview) {
        return;
    }


    let isi = "";


    if (
        pengaturan.privacyProfile
    ) {

        isi += `
            <div>
                <b>Profil Publik:</b>
                Profil dan nama toko dapat ditampilkan
                kepada pengguna lain.
            </div>
        `;

    } else {

        isi += `
            <div>
                <b>Profil Publik:</b>
                Profil disembunyikan dari pengguna lain.
            </div>
        `;

    }


    if (
        pengaturan.privacyActivity
    ) {

        isi += `
            <div>
                <b>Aktivitas Akun:</b>
                Aktivitas akun dapat ditampilkan.
            </div>
        `;

    } else {

        isi += `
            <div>
                <b>Aktivitas Akun:</b>
                Aktivitas akun tidak ditampilkan.
            </div>
        `;

    }


    if (
        pengaturan.privacyPersonal
    ) {

        isi += `
            <div>
                <b>Personalisasi:</b>
                Rekomendasi dapat disesuaikan berdasarkan
                aktivitas akun.
            </div>
        `;

    } else {

        isi += `
            <div>
                <b>Personalisasi:</b>
                Rekomendasi khusus berdasarkan aktivitas
                tidak digunakan.
            </div>
        `;

    }


    preview.innerHTML =
        isi;

}


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


function tampilkanVoucher(data) {

    const voucherList =
        document.getElementById(
            "voucherList"
        );


    if (!voucherList) {
        return;
    }


    voucherList.innerHTML =
        "";


    data.forEach(
        function (voucher) {

            const card =
                document.createElement("div");


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
                        onclick="pakaiVoucher('${voucher.title}', this)">
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


function showCategory(
    category,
    button
) {

    const moreMenu =
        document.getElementById(
            "moreMenu"
        );


    if (moreMenu) {

        moreMenu.classList.remove(
            "show"
        );

    }


    document
        .querySelectorAll(".category")
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


function toggleMore() {

    const menu =
        document.getElementById(
            "moreMenu"
        );


    if (menu) {

        menu.classList.toggle(
            "show"
        );

    }

}


function simpanVoucher() {

    const input =
        document.getElementById(
            "voucherCode"
        );


    if (!input) {
        return;
    }


    const kode =
        input.value.trim();


    if (
        kode === ""
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
        kodeVoucher.includes(kode)
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
        data.length === 0
    ) {

        return;

    }


    data.forEach(
        function (kode, index) {

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
                    onclick="hapusVoucherTersimpan(${index})">
                    Hapus
                </button>

            `;


            container.appendChild(
                div
            );

        }
    );

}


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
        JSON.stringify(data)
    );


    tampilkanVoucherTersimpan();


    beriPesan(
        "Kode voucher berhasil dihapus."
    );

}


function updateCoinDisplay() {

    const navbarCoin =
        document.getElementById(
            "navbarCoin"
        );


    const coinBalance =
        document.getElementById(
            "coinBalance"
        );


    const coinAvailable =
        document.getElementById(
            "coinAvailable"
        );


    const historyTotal =
        document.getElementById(
            "historyTotal"
        );


    if (navbarCoin) {

        navbarCoin.textContent =
            coinSaldo;

    }


    if (coinBalance) {

        coinBalance.textContent =
            coinSaldo;

    }


    if (coinAvailable) {

        coinAvailable.textContent =
            coinSaldo +
            " Coin";

    }


    if (historyTotal) {

        historyTotal.textContent =
            "Saldo " +
            coinSaldo +
            " Coin";

    }


    localStorage.setItem(
        "coinSaldoGeboy",
        coinSaldo
    );

}


function scrollToReward() {

    showPage(
        "coin"
    );


    setTimeout(
        function () {

            const reward =
                document.getElementById(
                    "rewardCoinSection"
                );


            if (reward) {

                reward.scrollIntoView({
                    behavior:
                        "smooth"
                });

            }

        },
        100
    );

}


function tanggalHariIni() {

    const sekarang =
        new Date();


    const tahun =
        sekarang.getFullYear();


    const bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const hari =
        String(
            sekarang.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        tahun +
        "-" +
        bulan +
        "-" +
        hari
    );

}


function sudahKlaimHariIni() {

    return (
        coinState.lastClaim ===
        tanggalHariIni()
    );

}


function tampilkanRewardCoin() {

    const container =
        document.getElementById(
            "rewardDays"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    rewardCoin.forEach(
        function (
            jumlah,
            index
        ) {

            const hari =
                index + 1;


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "reward-day";


            if (
                index ===
                coinState.currentDay
            ) {

                div.classList.add(
                    "current"
                );

            }


            if (
                index <
                coinState.currentDay
            ) {

                div.classList.add(
                    "claimed"
                );

            }


            if (
                index >
                coinState.currentDay
            ) {

                div.classList.add(
                    "locked"
                );

            }


            let check =
                "";


            if (
                index <
                coinState.currentDay
            ) {

                check =
                    '<span class="reward-check">✓</span>';

            }


            div.innerHTML = `

                <span class="reward-day-number">
                    Hari ${hari}
                </span>

                <div class="reward-day-coin">
                    G
                </div>

                <span class="reward-day-amount">
                    +${jumlah}
                </span>

                ${check}

            `;


            container.appendChild(
                div
            );

        }
    );


    const streakText =
        document.getElementById(
            "streakText"
        );


    if (streakText) {

        streakText.textContent =
            "Hari " +
            (
                coinState.currentDay +
                1
            );

    }


    const claimButton =
        document.getElementById(
            "claimCoinButton"
        );


    const claimMessage =
        document.getElementById(
            "claimMessage"
        );


    if (
        !claimButton ||
        !claimMessage
    ) {
        return;
    }


    if (
        sudahKlaimHariIni()
    ) {

        claimButton.disabled =
            true;


        claimButton.textContent =
            "Sudah Diklaim Hari Ini";


        claimMessage.textContent =
            "Kembali besok untuk mendapatkan coin.";

    }


    else {

        claimButton.disabled =
            false;


        claimButton.textContent =
            "Klaim Coin Hari Ini";


        claimMessage.textContent =
            "Kamu bisa mendapatkan +" +
            rewardCoin[
                coinState.currentDay
            ] +
            " Coin hari ini.";

    }

}


function claimDailyCoin() {

    if (
        sudahKlaimHariIni()
    ) {

        beriPesan(
            "Coin hari ini sudah diklaim."
        );

        return;
    }


    const jumlah =
        rewardCoin[
            coinState.currentDay
        ];


    coinSaldo +=
        jumlah;


    coinHistory.unshift({

        type:
            "plus",

        amount:
            jumlah,

        title:
            "Daily Check-In",

        date:
            new Date()
                .toLocaleString(
                    "id-ID"
                )

    });


    if (
        coinState.currentDay <
        rewardCoin.length - 1
    ) {

        coinState.currentDay++;

    }


    else {

        coinState.currentDay =
            0;

    }


    coinState.lastClaim =
        tanggalHariIni();


    localStorage.setItem(
        "coinStateGeboy",
        JSON.stringify(
            coinState
        )
    );


    localStorage.setItem(
        "coinHistoryGeboy",
        JSON.stringify(
            coinHistory
        )
    );


    updateCoinDisplay();

    tampilkanRewardCoin();

    tampilkanRiwayatCoin();


    beriPesan(
        "+" +
        jumlah +
        " Coin berhasil ditambahkan!"
    );

}


function claimExtraCoin() {

    if (
        coinState.extraClaimed
    ) {

        beriPesan(
            "Bonus tambahan hari ini sudah diambil."
        );

        return;
    }


    const jumlah =
        10;


    coinSaldo +=
        jumlah;


    coinState.extraClaimed =
        true;


    coinHistory.unshift({

        type:
            "plus",

        amount:
            jumlah,

        title:
            "Bonus Coin Tambahan",

        date:
            new Date()
                .toLocaleString(
                    "id-ID"
                )

    });


    localStorage.setItem(
        "coinStateGeboy",
        JSON.stringify(
            coinState
        )
    );


    localStorage.setItem(
        "coinHistoryGeboy",
        JSON.stringify(
            coinHistory
        )
    );


    updateCoinDisplay();


    tampilkanRiwayatCoin();


    beriPesan(
        "+10 Coin berhasil didapatkan!"
    );

}


function showCoinTab(
    tab,
    button
) {

    document
        .querySelectorAll(
            ".coin-tab"
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


    const rewardSection =
        document.getElementById(
            "rewardCoinSection"
        );


    const historySection =
        document.getElementById(
            "historyCoinSection"
        );


    if (
        rewardSection
    ) {

        rewardSection.classList.add(
            "hidden"
        );

    }


    if (
        historySection
    ) {

        historySection.classList.add(
            "hidden"
        );

    }


    if (
        tab ===
        "reward"
    ) {

        rewardSection.classList.remove(
            "hidden"
        );

    }


    if (
        tab ===
        "history"
    ) {

        historySection.classList.remove(
            "hidden"
        );


        tampilkanRiwayatCoin();

    }

}


function tampilkanRiwayatCoin() {

    const container =
        document.getElementById(
            "coinHistory"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (
        coinHistory.length ===
        0
    ) {

        container.innerHTML = `

            <div class="coin-history-item">

                <div class="history-left">

                    <div class="history-icon">
                        G
                    </div>

                    <div>

                        <div class="history-title">
                            Belum ada riwayat coin
                        </div>

                        <div class="history-date">
                            Riwayat akan muncul setelah
                            kamu mendapatkan coin.
                        </div>

                    </div>

                </div>

            </div>

        `;


        return;
    }


    coinHistory.forEach(
        function (item) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "coin-history-item";


            const tanda =
                item.type ===
                "minus"
                    ? "-"
                    : "+";


            const classAmount =
                item.type ===
                "minus"
                    ? "minus"
                    : "";


            div.innerHTML = `

                <div class="history-left">

                    <div class="history-icon">
                        G
                    </div>

                    <div>

                        <div class="history-title">
                            ${item.title}
                        </div>

                        <div class="history-date">
                            ${item.date}
                        </div>

                    </div>

                </div>


                <div class="history-amount ${classAmount}">
                    ${tanda}${item.amount}
                </div>

            `;


            container.appendChild(
                div
            );

        }
    );


    updateCoinDisplay();

}


function lihatBonus() {

    showPage(
        "coin"
    );


    beriPesan(
        "Halaman Bonus Coin dibuka."
    );

}


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