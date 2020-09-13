// const firebaseConfig = {
// };

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB4YVfv5VNqFedN9ZLgDhTcuxDHE4DrBgg",
  authDomain: "jade-instagram.firebaseapp.com",
  databaseURL: "https://jade-instagram.firebaseio.com",
  projectId: "jade-instagram",
  storageBucket: "jade-instagram.appspot.com",
  messagingSenderId: "164530475236",
  appId: "1:164530475236:web:2ca324df7f34b6146b1cf1",
  measurementId: "G-VCCE08ZX03"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };

//export default db;
