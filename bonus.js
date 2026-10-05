// DATA COIN

let coinSaldo =
    Number(
        localStorage.getItem(
            "coinSaldoGeboy"
        )
    );


if (
    isNaN(coinSaldo)
) {

    coinSaldo =
        160;


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
        localStorage.getItem(
            "coinStateGeboy"
        )
    ) || {

        currentDay:
            0,

        lastClaim:
            "",

        extraClaimed:
            false

    };


let coinHistory =

    JSON.parse(
        localStorage.getItem(
            "coinHistoryGeboy"
        )
    ) || [];


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


// UPDATE DISPLAY

function updateCoinDisplay() {

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


    if (
        coinBalance
    ) {

        coinBalance.textContent =
            coinSaldo;

    }


    if (
        coinAvailable
    ) {

        coinAvailable.textContent =
            coinSaldo +
            " Coin";

    }


    if (
        historyTotal
    ) {

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


// SCROLL KE REWARD

function scrollToReward() {

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

}


// TANGGAL HARI INI

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


// CEK KLAIM

function sudahKlaimHariIni() {

    return (

        coinState.lastClaim ===
        tanggalHariIni()

    );

}


// TAMPILKAN REWARD

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


    if (
        streakText
    ) {

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


// KLAIM HARIAN

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


// BONUS TAMBAHAN

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


// TAB COIN

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


    rewardSection.classList.add(
        "hidden"
    );


    historySection.classList.add(
        "hidden"
    );


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


// RIWAYAT COIN

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


// JALANKAN SAAT HALAMAN DIBUKA

updateCoinDisplay();

tampilkanRewardCoin();

tampilkanRiwayatCoin();