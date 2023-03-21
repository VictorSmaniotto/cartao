window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator){
        navigator.serviceWorker
                 .register('./sw.js');
    }
}

if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        this.navigator.serviceWorker.register('/sw.js').then(function(registration){
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err){
            console.log('ServiceWorker registration failed: ', err);
        })
    })
}

if(Notification.permission === "granted"){
    //Permissão já concedida, pode enviar notificações
} else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(function(permission){
        if(permission === "granted"){
            //pode enviar notificações
        }
    })
} 

const messaging = firebase.messaging();
messaging.requestPermission().then(function() {
  console.log('Notification permission granted.');
  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
      // Enviar o token para o servidor para que ele possa enviar notificações push para a PWA
      console.log('Token:', currentToken);
    } else {
      console.log('No Instance ID token available. Request permission to generate one.');
    }
  }).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
  });
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
    var title = 'Título da notificação';
    var body = 'Corpo da notificação';
    var icon = '/images/icon_192.png';
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: 'my-tag'
      })
    );
  });