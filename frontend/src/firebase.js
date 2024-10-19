// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "",
  authDomain: "cfgteam1login.firebaseapp.com",
  projectId: "cfgteam1login",
  storageBucket: "cfgteam1login.appspot.com",
  messagingSenderId: "1068313793699",
  appId: "1:1068313793699:web:b04d55de4fbc5319761b16",
  measurementId: "G-Q4VHFXSC67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
