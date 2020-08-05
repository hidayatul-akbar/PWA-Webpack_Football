import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import "jquery/dist/jquery.min.js";
import "./style/style.css";
import "./js/nav.js";

// Periksa service worker
if ("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

function registerServiceWorker() {
  runtime
    .register()
    .then((registration) => {
      console.log("ServiceWorker registered: ", registration);
      return registration;
    })
    .catch((registrationError) =>
      console.log("ServiceWorker registration failed: ", registrationError)
    );
}

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BNnj-ZmBXJumD3kP0ajSG0jXlPjidPrCw_TBGy7HMawbFgWxLJpEn8o29BiFqFNnKs3oyxe8gIzaBcUG0Okkcm4"
              ),
            })
            .then(function (subscribe) {
              console.log(
                "Berhasil melakukan subscribe dengan endpoint: ",
                subscribe.endpoint
              );
              console.log(
                "Berhasil melakukan subscribe dengan p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch(function (e) {
              console.error("Tidak dapat melakukan subscribe ", e.message);
            });
        });
      }
    });
  }
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
