import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAu-dvdo818gGNz9tMU0GX6RjrZfPuw1dc",
  authDomain: "boardapp-ebc9c.firebaseapp.com",
  projectId: "boardapp-ebc9c",
  storageBucket: "boardapp-ebc9c.appspot.com",
  messagingSenderId: "929172467147",
  appId: "1:929172467147:web:a999bdf919bcaddf531a4e",
};

// Initialize Firebase

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

export default firebase;
