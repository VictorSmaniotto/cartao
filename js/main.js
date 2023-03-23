window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
};
Notification.requestPermission().then(function (permission) {
  if (permission === "granted") {
    console.log("Notification permission granted");

    // Subscreva-se para as notificações push aqui
  }
});

navigator.serviceWorker.ready.then(function (registration) {
  registration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: "sua chave pública",
    })
    .then(function (subscription) {
      console.log("Subscribed to push notifications", subscription);
      // Envie a Subscription para o servidor aqui
    })
    .catch(function (error) {
      console.log("Failed to subscribe to push notifications", error);
    });
});







// Importa a biblioteca web-push-libs
import { generateVAPIDKeys } from 'web-push-libs';

// Gera as chaves VAPID
const { publicKey, privateKey } = generateVAPIDKeys();

// Subscreve-se para as notificações push
navigator.serviceWorker.ready.then(registration => {
registration.pushManager.subscribe({
userVisibleOnly: true,
applicationServerKey: publicKey
}).then(subscription => {
console.log('Subscribed to push notifications', subscription);

// Envie a Subscription para o servidor
fetch('/subscribe', {
method: 'POST',
body: JSON.stringify(subscription),
headers: {
'Content-Type': 'application/json'
}
});
}).catch(error => {
console.log('Failed to subscribe to push notifications', error);
});
});

// Envia uma notificação push
function sendNotification(subscription, payload) {
const options = {
TTL: 60
};

const headers = {
'Content-Type': 'application/json',
'Authorization': `Bearer ${privateKey}`
};

const body = JSON.stringify({
subscription,
payload,
options
});

fetch('/send-notification', {
method: 'POST',
body,
headers
});
}