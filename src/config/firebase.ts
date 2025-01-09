// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'; // Use @react-native-firebase for React Native
import {getFirestore} from 'firebase/firestore'; // Use Firestore from @react-native-firebase
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth'; // Use Firebase Auth
import {getStorage, ref, getDownloadURL} from 'firebase/storage'; // Use Firebase Storage
import messaging from '@react-native-firebase/messaging'; // Firebase Messaging for React Native

// Your web app's Firebase configuration
// Replace with your actual Firebase config values
const firebaseConfig = {
  apiKey: 'AIzaSyBYyGwCHKviq3olXksJWi4c7xSR_GVGoMg',
  authDomain: 'freshfoodv1.firebaseapp.com',
  projectId: 'freshfoodv1',
  storageBucket: 'freshfoodv1.appspot.com',
  messagingSenderId: '614037993814',
  appId: '1:614037993814:web:5c7b0c04917c9596647ef7',
  measurementId: 'G-PG8JHCPF55',
};

// Initialize Firebase
let app; // Initialize only once
if (!initializeApp.apps?.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = initializeApp.app(); // Reuse the initialized app
}

// Firestore instance
export const db = getFirestore(app);

// Firebase Auth instance with React Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firebase Storage instance
export const storage = getStorage(app);

// Function to get a food image URL from Firebase Storage
export const getFoodImageURL = async imageName => {
  try {
    const pathReference = ref(storage, `images/foodWiki/${imageName}.png`);
    const url = await getDownloadURL(pathReference);
    return url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    throw error;
  }
};

// Request user permission for notifications
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      console.log('Permission not granted');
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

// Get FCM Token for the device
export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error fetching FCM token:', error);
    throw error;
  }
};
