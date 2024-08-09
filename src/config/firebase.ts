// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYyGwCHKviq3olXksJWi4c7xSR_GVGoMg",
  authDomain: "freshfoodv1.firebaseapp.com",
  projectId: "freshfoodv1",
  storageBucket: "freshfoodv1.appspot.com",
  messagingSenderId: "614037993814",
  appId: "1:614037993814:web:5c7b0c04917c9596647ef7",
  measurementId: "G-PG8JHCPF55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});