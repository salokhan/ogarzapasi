// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyCbt1YVKfIms_pICavcjympgbUsssmYB2A",
  authDomain: "locate-e819c.firebaseapp.com",
  databaseURL: "https://locate-e819c.firebaseio.com",
  projectId: "locate-e819c",
  storageBucket: "locate-e819c.appspot.com",
  messagingSenderId: "1029102419260",
  appId: "1:1029102419260:web:f32d56765a5ee835517239",
  measurementId: "G-358D5NVJER"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();
