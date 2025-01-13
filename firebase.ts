// firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAcXDk_cyXelkWxuCmPwRi_LEcgqEIqnPs",
  authDomain: "veritas-fecf5.firebaseapp.com",
  projectId: "veritas-fecf5",
  storageBucket: "veritas-fecf5.firebasestorage.app",
  messagingSenderId: "428186617574",
  appId: "1:428186617574:web:7d4269c602631cd4a5dd27",
};

const app = initializeApp(firebaseConfig);

// Check if notifications are supported
const isNotificationSupported = () => {
  try {
    return (
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    );
  } catch (e) {
    return false;
  }
};

const messaging = async () => {
  if (!isNotificationSupported()) {
    console.log("Push notifications are not supported");
    return null;
  }

  const supported = await isSupported();
  console.log("Is messaging supported:", supported);
  return supported && getMessaging(app);
};

export const requestForToken = async () => {
  try {
    if (!isNotificationSupported()) {
      console.log(
        "Push notifications are not supported on this device/browser"
      );
      return null;
    }

    console.log("Getting messaging instance...");
    const messagingInstance = await messaging();
    if (!messagingInstance) {
      console.log("Messaging is not supported.");
      return null;
    }

    console.log("Requesting token...");
    const currentToken = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
    });

    if (currentToken) {
      console.log("Current token for client: ", currentToken);
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return null;
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    return null;
  }
};

export { app, messaging };
