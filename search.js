// ===== Halaman search.html =====

if (document.body.classList.contains("halaman-search")) {

  var searchInput =
      document.getElementById("searchInput");

  var suggestions =
      document.getElementById("suggestions");

  var searchData = [
      "Laptop ASUS",
      "Laptop Lenovo",
      "Laptop Gaming",
      "Laptop Murah",
      "Mouse Wireless",
      "Mouse Gaming",
      "Keyboard Mechanical",
      "Keyboard Wireless",
      "Headset Gaming",
      "Monitor Gaming",
      "Monitor 24 Inch",
      "Monitor 27 Inch",
      "Kamera Digital",
      "Printer",
      "Webcam"
  ];

  function rekomendasiRandom() {

      var hasil = [];
      while (hasil.length < 5) {
          var index =
              Math.floor(
                  Math.random() * searchData.length
              );

          var item = searchData[index];
          if (!hasil.includes(item)) {
              hasil.push(item);
          }
      }
      return hasil;
  }

  function tampilkanRekomendasi() {

      var keyword =
          searchInput.value
              .toLowerCase()
              .trim();

      suggestions.innerHTML = "";

      var hasil = [];

      if (keyword == "") {

          hasil = rekomendasiRandom();

      } else {

          for (var i = 0; i < searchData.length; i++) {

              var nama =
                  searchData[i].toLowerCase();
              if (nama.includes(keyword)) {
                  hasil.push(searchData[i]);
              }
          }
      }

      if (hasil.length == 0) {

          suggestions.innerHTML =
              '<div class="no-result">' +
                  'Tidak ada rekomendasi' +
              '</div>';

          suggestions.style.display =
              "block";

          return;
      }

      for (var i = 0; i < hasil.length; i++) {

          var item =
              document.createElement("div");

          item.className =
              "suggestion-item";

          item.innerHTML =
              '<i class="fa-solid fa-magnifying-glass"></i>' +
              '<span>' +
                  hasil[i] +
              '</span>';

          item.onclick = function() {

              searchInput.value =
                  this.querySelector("span").innerHTML;

              suggestions.style.display =
                  "none";
          };

          suggestions.appendChild(item);
      }

      suggestions.style.display =
          "block";
  }

  searchInput.onfocus = function() {

      tampilkanRekomendasi();
  };

  searchInput.oninput = function() {

      tampilkanRekomendasi();
  };

  document.onclick = function(event) {

      if (
          !event.target.closest(
              ".search-container"
          )
      ) {

          suggestions.style.display =
              "none";
      }
  };

}


// ===== SEARCH di Dashboard (index.html) =====

if (document.body.classList.contains("halaman-dashboard")) {

  // SEARCH

  const searchInput =
      document.getElementById(
          "searchInput"
      );


  if (searchInput) {

      searchInput.addEventListener(
          "input",
          () => {

              const keyword =
                  searchInput.value
                      .trim()
                      .toLowerCase();


              productCards.forEach(
                  (card) => {

                      const name =
                          card.dataset.name
                              .toLowerCase();


                      const category =
                          card.dataset.category
                              .toLowerCase();


                      const match =
                          keyword === "" ||
                          name.includes(keyword) ||
                          category.includes(keyword);


                      const categoryMatch =
                          selectedCategory === "all" ||
                          card.dataset.category ===
                              selectedCategory;


                      card.style.display =
                          match && categoryMatch
                              ? "block"
                              : "none";

                  }
              );


              if (keyword) {

                  productInfo.textContent =
                      `Hasil pencarian untuk "${searchInput.value}".`;

              }

              else {

                  const names = {

                      all:
                          "semua produk",

                      hp:
                          "kategori Handphone",

                      elektronik:
                          "kategori Elektronik",

                      hewan:
                          "kategori Perawatan Hewan",

                      keuangan:
                          "kategori Keuangan",

                      komputer:
                          "kategori Komputer"

                  };


                  productInfo.textContent =
                      `Menampilkan ${names[selectedCategory]}.`;

              }

          }
      );

  }

}
