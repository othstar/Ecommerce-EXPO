import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
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
const auth = getAuth(app);

export { auth };
