importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAcXDk_cyXelkWxuCmPwRi_LEcgqEIqnPs",
  authDomain: "veritas-fecf5.firebaseapp.com",
  projectId: "veritas-fecf5",
  storageBucket: "veritas-fecf5.firebasestorage.app",
  messagingSenderId: "428186617574",
  appId: "1:428186617574:web:7d4269c602631cd4a5dd27",
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    console.log(
      "[firebase-messaging-sw.js] Received background message",
      payload
    );
    if (!payload?.notification) return;

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/firebase-logo.png",
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
} catch (error) {
  console.log("Service worker initialization failed:", error);
}
