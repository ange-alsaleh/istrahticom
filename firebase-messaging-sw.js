// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAwjmWIOyvGKUAXqDKpzpouZ-MlyuhYjMc",
  authDomain: "support-chat-31aa6.firebaseapp.com",
  databaseURL: "https://support-chat-31aa6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "support-chat-31aa6",
  storageBucket: "support-chat-31aa6.appspot.com",
  messagingSenderId: "1079004120541",
  appId: "1:1079004120541:web:4a11ee42427c6e9be1e234",
});

const messaging = firebase.messaging();

// يظهر الإشعار بالخلفية (حتى لو الصفحة مقفلة)
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "شبكة الضياء-نت";
  const options = {
    body: payload.notification?.body || payload.data?.message || "",
    icon: '/img/logo.png',           // عدّل المسار لو تحب
    badge: '/img/logo.png',          // اختياري
    data: {                          // نمرّر البيانات لنستخدمها عند الضغط
      url: '/support.html',          // افتح صفحتك هنا عند النقر
      chatId: payload.data?.chatId || ""
    }
  };
  self.registration.showNotification(title, options);
});

// عند الضغط على الإشعار افتح الصفحة
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});
