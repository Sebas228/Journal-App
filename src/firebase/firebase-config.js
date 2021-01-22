import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBKVegnGQqvUDHUPizuoFKetKaz-b5r5yk",
  authDomain: "react-apps-15e10.firebaseapp.com",
  projectId: "react-apps-15e10",
  storageBucket: "react-apps-15e10.appspot.com",
  messagingSenderId: "95336502945",
  appId: "1:95336502945:web:3b5a0287505580913742e0"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  googleAuthProvider,
  firebase
}