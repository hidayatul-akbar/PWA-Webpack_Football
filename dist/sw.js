var serviceWorkerOption = {
  "assets": [
    "/src/images/logo.svg",
    "/src/images/bg.jpg",
    "/dm.js",
    "/dp.js",
    "/dt.js",
    "/index.js",
    "/images/bg.jpg",
    "/images/logo.svg",
    "/images/notif.png",
    "/images/player.svg",
    "/images/icons/icon-128.png",
    "/images/icons/icon-144.png",
    "/images/icons/icon-192.png",
    "/images/icons/icon-256.png",
    "/images/icons/icon-384.png",
    "/images/icons/icon-512.png",
    "/images/icons/icon-72.png",
    "/images/icons/icon-96.png"
  ]
};
        
        !function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){var t=["/","/[object Object]/icon_192x192.png","/images/icons/icon-72.png","/images/icons/icon-96.png","/images/icons/icon-128.png","/images/icons/icon-144.png","/images/icons/icon-192.png","/images/icons/icon-256.png","/images/icons/icon-384.png","/images/icons/icon-512.png","/images/notif.png","/images/player.svg","/src/images/bg.jpg","/src/images/logo.svg","/detailMatch.html","/detailPlayer.html","/detailTeam.html","/dm.js","/dp.js","/dt.js","/favorite.html","/home.html","/icon_72x72.png","/icon_96x96.png","/icon_128x128.png","/icon_144x144.png","/icon_256x256.png","/icon_384x384.png","/icon_512x512.png","/index.html","/index.js","/manifest.json","/matches.html","/nav.html","/standing.html","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css","https://fonts.googleapis.com/icon?family=Material+Icons","https://code.jquery.com/jquery-3.3.1.min.js"];self.addEventListener("install",(function(e){e.waitUntil(caches.open("sporTech-pwa_v1").then((function(e){return e.addAll(t)})))})),self.addEventListener("fetch",(function(e){e.request.url.indexOf("https://api.football-data.org/v2")>-1?e.respondWith(caches.open("sporTech-pwa_v1").then((function(n){return fetch(e.request).then((function(t){return n.put(e.request.url,t.clone()),t}))}))):e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then((function(n){return n||fetch(e.request)})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("sporTech-pwa_v1"!=e)return console.log("ServiceWorker: cache "+e+" dihapus"),caches.delete(e)})))})))})),self.addEventListener("push",(function(e){var n={body:e.data?e.data.text():"Push message no payload",icon:"./images/notif.png",badge:"./images/notif.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("SporTech Notification",n))}))}]);