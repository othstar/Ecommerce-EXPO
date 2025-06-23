import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import {...} from 'firebase/database';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebase = {
  apiKey: "AIzaSyBIf3qvxJpGDHAtyW5N5lRvxTPLym_Gmt8",
  authDomain: "smart-ecommerce-4636f.firebaseapp.com",
  projectId: "smart-ecommerce-4636f",
  storageBucket: "smart-ecommerce-4636f.firebasestorage.app",
  messagingSenderId: "6114030031",
  appId: "1:6114030031:web:8c8dc9f614b483cb7c22ba",
};

const app = initializeApp(firebase);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
