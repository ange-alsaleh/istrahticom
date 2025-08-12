// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

// --- ضع هنا نفس إعدادات firebase الخاصة بك (public config) ---
const firebaseConfig = {
  apiKey: "AIzaSyAwjmWIOyvGKUAXqDKpzpouZ-MlyuhYjMc",
  authDomain: "support-chat-31aa6.firebaseapp.com",
  databaseURL: "https://support-chat-31aa6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "support-chat-31aa6",
  storageBucket: "support-chat-31aa6.appspot.com",
  messagingSenderId: "1079004120541",
  appId: "1:1079004120541:web:4a11ee42427c6e9be1e234",
  measurementId: "G-8NNELSESB8"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// استقبال رسائل الخلفية (عندما يكون المتصفح في الخلفية أو صفحة مغلقة)
messaging.onBackgroundMessage(function(payload) {
  // payload.notification أو payload.data حسب ما أرسلت من السيرفر
  const title = payload.notification?.title || 'شبكة الضياء-نت';
  const options = {
    body: payload.notification?.body || payload.data?.message || '',
    icon: '/img/logo.png', // عدّل مسار الشعار إذا تحب
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

// عند الضغط على الاشعار افتح الصفحة المناسبة (أو الصفحة الرئيسية)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        // لو موجود نفس النافذة نركّزها
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // او افتح نافذة جديدة
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
