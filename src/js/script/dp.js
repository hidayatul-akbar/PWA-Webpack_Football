import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import "jquery/dist/jquery.min.js";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import "../../style/style.css";
import { getDetailPlayerById } from "../api";
import {
  cekData,
  createDataFav,
  deleteDatafav,
  getSavedDataById,
} from "../indexeddb";

// Periksa service worker
if ("serviceWorker" in navigator) {
  runtime
    .register()
    .then((registration) =>
      console.log("ServiceWorker registered: ", registration)
    )
    .catch((registrationError) =>
      console.log("ServiceWorker registration failed: ", registrationError)
    );
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

// REQUEST API UNTUK PERTAMA KALI
document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var id = Number(urlParams.get("id"));
  var isFavorit = false;
  cekData("pemain_favorit", id)
    .then((msg) => {
      console.log("statusData: resolve = " + msg);
      document.getElementById("iconFav").innerHTML = "favorite";
      getSavedDataById("pemain");
      isFavorit = true;
    })
    .catch((msg) => {
      console.log("statusData: reject = " + msg);
      document.getElementById("iconFav").innerHTML = "favorite_border";
      getDetailPlayerById();
      isFavorit = false;
    });

  var iconFav = document.getElementById("iconFav");

  iconFav.onclick = function () {
    console.log("Tombol FAB di klik.");
    if (isFavorit) {
      deleteDatafav("pemain_favorit", id);
      isFavorit = false;
    } else {
      const item = getDetailPlayerById();
      item.then(function (pemain) {
        createDataFav("pemain", pemain);
      });
      isFavorit = true;
    }
  };

  // Back
  const btnBack = document.getElementById("btnBack");
  btnBack.onclick = function () {
    window.history.back();
  };
});

$(document).ready(function () {
  $(".tooltipped").tooltip();
});
