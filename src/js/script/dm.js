import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import "jquery/dist/jquery.min.js";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import "../../style/style.css";
import { getDetailMatchById } from "../api";

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
  getDetailMatchById();

  const btnBack = document.getElementById("btnBack");
  btnBack.onclick = function () {
    window.history.back();
  };
});

// Materialize Effect
$(document).ready(function () {
  $(".tabs").tabs();
  $(".tooltipped").tooltip();
});
