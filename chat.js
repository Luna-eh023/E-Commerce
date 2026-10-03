var data = [
    {
        nama: "Nina Store",
        foto: "fa-store",
        pesan: "Pagi kak untuk Lamborghininya mau warna apa ya kak?",
        unread: true,

        chat: [
            {
                pesan: "Pagi kak untuk Lamborghininya mau warna apa ya kak?",
                dari: "dia"
            },
            {
                pesan: "Halo kak, saya mau warna hitam.",
                dari: "saya"
            }
        ]
    },
    {
        nama: "Kang Info Paket",
        foto: "fa-box",
        pesan: "Paket kamu sudah sampai!!!",
        unread: true,

        chat: [
            {
                pesan: "Paket kamu sudah sampai!!!",
                dari: "dia"
            },
            {
                pesan: "Wah, terima kasih kak.",
                dari: "saya"
            }
        ]
    },
    {
        nama: "Pria Solo",
        foto: "fa-user",
        pesan: "Baik kak. Pesannya sedang dikemas ya.",
        unread: true,

        chat: [
            {
                pesan: "Baik kak. Pesannya sedang dikemas ya.",
                dari: "dia"
            }
        ]
    },
    {
        nama: "Fashion Store",
        foto: "fa-bag-shopping",
        pesan: "Pesanan kamu sedang diproses.",
        unread: true,

        chat: [
            {
                pesan: "Pesanan kamu sedang diproses.",
                dari: "dia"
            }
        ]
    }
];

var card = document.getElementById("card");
var chatButton = document.getElementById("chatButton");
var badge = document.getElementById("badge");
var chatList = document.getElementById("chatList");
var chatRoom = document.getElementById("chatRoom");
var list = document.getElementById("list");
var messages = document.getElementById("messages");
var chatName = document.getElementById("chatName");
var profile = document.getElementById("profile");
var messageInput = document.getElementById("messageInput");
var chatSekarang = 0;

function tampilkanChat() {
    list.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var chat = data[i];
        var item = document.createElement("div");
        item.className = "item";

        if (chat.unread == true) {
            item.className = "item belum-dibaca";
        }

        item.innerHTML =
            '<div class="foto">' +
                '<i class="fa-solid ' +
                chat.foto +
                '"></i>' +
            '</div>' +
            '<div class="chat-text">' +
                '<b>' +
                chat.nama +
                '</b>' +
                '<p>' +
                chat.pesan +
                '</p>' +
            '</div>';

        item.setAttribute("data-index", i);

        item.onclick = function() {
            var index =
                this.getAttribute("data-index");
            bukaChat(index);
        };

        list.appendChild(item);
    }

    var jumlah = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].unread == true) {
            jumlah++;
        }
    }

    if (jumlah > 0) {
        badge.innerHTML = jumlah;
        badge.style.display = "flex";
    } else {
        badge.style.display = "none";
    }
}

function bukaChat(index) {
    chatSekarang = index;
    data[index].unread = false;
    chatName.innerHTML =
        data[index].nama;

    profile.innerHTML =
        '<i class="fa-solid ' +
        data[index].foto +
        '"></i>';

    chatList.style.display = "none";
    chatRoom.style.display = "block";

    tampilkanPesan();
    tampilkanChat();
}

function tampilkanPesan() {
    messages.innerHTML = "";
    var chat =
        data[chatSekarang].chat;

    for (var i = 0; i < chat.length; i++) {
        var pesan =
            document.createElement("div");
        pesan.className =
            "pesan " + chat[i].dari;
        pesan.innerHTML =
            chat[i].pesan;
        messages.appendChild(pesan);
    }

    messages.scrollTop =
        messages.scrollHeight;
}

function kirimPesan() {
    var teks =
        messageInput.value;

    if (teks == "") {
        return;
    }

    data[chatSekarang].chat.push({
        pesan: teks,
        dari: "saya"
    });

    data[chatSekarang].pesan =
        teks;

    messageInput.value = "";

    tampilkanPesan();
}

chatButton.onclick = function() {
    card.classList.toggle("hide");
    tampilkanChat();
};

document.getElementById("backButton").onclick =
function() {
    chatRoom.style.display = "none";
    chatList.style.display = "block";
    tampilkanChat();
};

document.getElementById("sendButton").onclick =
function() {

    kirimPesan();
};

messageInput.onkeydown =
function(event) {
    if (event.key == "Enter") {
        kirimPesan();
    }
};

tampilkanChat();