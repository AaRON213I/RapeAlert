// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBZ0Q4tl-VxWYu1ISLwhDI49XPxsHa2DnU",
  authDomain: "padayon-7e758.firebaseapp.com",
  projectId: "padayon-7e758",
  storageBucket: "padayon-7e758.appspot.com",
  messagingSenderId: "758315187572",
  appId: "1:758315187572:web:afeabcb4ec686ee5104021",
  measurementId: "G-XFXM4R6H3G",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { app, firestore };

export default app;