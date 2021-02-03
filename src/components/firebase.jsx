import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCytItS9uVIXejdDNKc4V8VcRyYcflvxxo",
  authDomain: "sol-celle-beregner.firebaseapp.com",
  projectId: "sol-celle-beregner",
  storageBucket: "sol-celle-beregner.appspot.com",
  messagingSenderId: "877058275941",
  appId: "1:877058275941:web:268c14ebc5cd37efb2648c",
  measurementId: "G-TBMBDWYP7B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};