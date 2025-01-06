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

firebase.initializeApp(firebaseConfig);
const messaging = async () => {
  const supported = await isSupported();
  console.log("Is messaging supported:", supported);
  return supported && getMessaging(app);
};

const messagingInstance = await messaging();
if (!messagingInstance) {
  console.log("Messaging is not supported.");
  return null;
}

messagingInstance.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
