import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging'; // Import getMessaging

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_gMapsAPIKey,
  authDomain: 'hackmania-1e400.firebaseapp.com',
  projectId: 'hackmania-1e400',
  storageBucket: 'hackmania-1e400.appspot.com',
  messagingSenderId: '155404591910',
  appId: '1:155404591910:web:63cbd5e18a05ff388817e7',
  measurementId: 'G-1NYB7WHQRB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore
const messaging = getMessaging(app); // Initialize Firebase Messaging

// Create a function to send a message to FCM
const sendMessageToFCM = async (notiTitle, message, token) => {
  try {
    const payload = {
      notification: {
        title: notiTitle,
        body: message,
      },
      to: token, // Replace with the target FCM token
    };

    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=YOUR AUTHORIZATION KEY HERE`, // Get this from your Firebase project settings
      },
      body: JSON.stringify(payload),
    });

    console.log('Message sent to FCM:', message);
  } catch (error) {
    console.error('Error sending message to FCM:', error);
  }
};

export { app, auth, db, sendMessageToFCM };
