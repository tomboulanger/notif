const webpush = require("web-push");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const keys = {
  publicKey: "BM1L1kx3_n8cSzr5XCBIgh31_8XdYhzdP94qTLQSlH_5o_NW2AeLz0h3o5idi86sGvktSHcMpsNMpB7UnVuAnJo",
  privateKey: "YsyIL2OvgoY7n5_HK_BmRlNOrWerg0VFo83LYPjFtIA",
};

const publicVapidKey = keys.publicKey;
const privateVapidKey = keys.privateKey;

webpush.setVapidDetails("mailto:tonemail@example.com", publicVapidKey, privateVapidKey);

const fakeDatabase = [];

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  fakeDatabase.push(subscription);
});

app.post("/send-notification", (req, res) => {
  const notificationPayload = {
    notification: {
      title: "New Notification",
      body: "This is the body of the notification france",
      icon: "/icons/icon-192x192.png",
    },
  };

  const promises = [];
  fakeDatabase.forEach((subscription) => {
    promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
  });
  Promise.all(promises).then(() => res.sendStatus(200));
});

app.listen(3001, () => {
  console.log("Serveur Node.js en écoute sur le port 3001");
});
