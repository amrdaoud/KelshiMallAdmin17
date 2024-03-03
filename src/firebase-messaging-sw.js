importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");

self.addEventListener('notificationclick', function (event) {
    console.debug('notification', event.notification);
    const url = event.notification.data.FCM_MSG.data.route;
    event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
})
/// Development
// firebase.initializeApp({
//     apiKey: "AIzaSyA6QzrInmD3SKfkAfCnqwxLpf3z8Lk0N28",
//     authDomain: "newproject-241ad.firebaseapp.com",
//     databaseURL: "https://newproject-241ad.firebaseio.com",
//     projectId: "newproject-241ad",
//     storageBucket: "newproject-241ad.appspot.com",
//     messagingSenderId: "741966116344",
//     appId: "1:741966116344:web:3c5e9c60bb8bc2d024920d"
// });

/// Production
firebase.initializeApp({
    apiKey: "AIzaSyADJFPuQ-AHiW-DGEK7EfFXmTeiz30WmFg",
    authDomain: "kelshimall-app.firebaseapp.com",
    projectId: "kelshimall-app",
    storageBucket: "kelshimall-app.appspot.com",
    messagingSenderId: "588781529519",
    appId: "1:588781529519:web:da2dcd394949f38ccbe75a",
    measurementId: "G-JP0QSYRFL7"
});
const messaging = firebase.messaging();
// messaging.onBackgroundMessage(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
// });