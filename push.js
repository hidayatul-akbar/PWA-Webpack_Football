var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BNnj-ZmBXJumD3kP0ajSG0jXlPjidPrCw_TBGy7HMawbFgWxLJpEn8o29BiFqFNnKs3oyxe8gIzaBcUG0Okkcm4",
  privateKey: "_WMk450dFUbwF4DqZGgWAaMROGDF7kv1s4oAV-YREsk",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dFPPop6cVrE:APA91bGmcm_hN6XkLUc4a3s0HGEImQByRJPTe9VIM_C6YCjz52jxYZDtaSxi2MSHM-4YWegneKKDL6xGMLIMcNRpBYn-kMqkCDt-OXYQ5xgrnkjAjCrH-LizGuVR24bvcI8-UgyawUah",
  keys: {
    p256dh:
      "BHT1jKOgzUrG3kxfuEvMR0RWLMAhMbpDhr9bWxUMXYVP9ffezoEYf7fEMom3jgBNQqzhUbTD4puSbpg74puQxvs=",
    auth: "9S/JRQjLqJCfdWaKzJunxA==",
  },
};
var payload = "Highlight! Chelsea vs Liverpool!";

var options = {
  gcmAPIKey: "99771231439",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
