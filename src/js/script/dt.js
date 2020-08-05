import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import "jquery/dist/jquery.min.js";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import "../../style/style.css";
import { getDetailTeamById } from "../api";
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
  cekData("tim_favorit", id)
    .then((msg) => {
      console.log("statusData: resolve = " + msg);
      document.getElementById("iconFav").innerHTML = "favorite";
      getSavedDataById("tim");
      isFavorit = true;
    })
    .catch((msg) => {
      console.log("statusData: reject = " + msg);
      document.getElementById("iconFav").innerHTML = "favorite_border";
      getDetailTeamById();
      isFavorit = false;
    });

  var iconFav = document.getElementById("iconFav");

  iconFav.onclick = function () {
    console.log("Tombol FAB di klik.");
    if (isFavorit) {
      deleteDatafav("tim_favorit", id);
      isFavorit = false;
    } else {
      const item = getDetailTeamById();
      item.then(function (tim) {
        createDataFav("tim", tim);
      });
      isFavorit = true;
    }
  };

  // back
  const btnBack = document.getElementById("btnBack");
  btnBack.onclick = function () {
    window.history.back();
  };
});

// Materialize Effect
$(document).ready(function () {
  $("ul.tabs").tabs();
  $("ul.tabs").tabs({
    swipeable: false, //jika true, tinggi content tabs maks 400px: https://github.com/Dogfalo/materialize/issues/6119
  });
  $("ul.tabs").tabs("select", "tab_id");
  $(".tooltipped").tooltip();
});
