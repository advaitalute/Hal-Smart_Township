import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQmkosAeC1zCCoZUZucxOmogSFzAIGen4",
  authDomain: "hal-smart-township.firebaseapp.com",
  databaseURL: "https://hal-smart-township-default-rtdb.firebaseio.com",
  projectId: "hal-smart-township",
  storageBucket: "hal-smart-township.appspot.com",
  messagingSenderId: "1037587995812",
  appId: "1:1037587995812:web:1d9515834248af78bc1a31"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
