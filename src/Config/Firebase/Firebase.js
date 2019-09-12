import firebase from 'firebase/app'
import 'firebase/database'
import'firebase/auth'
import 'firebase/firebase-firestore'


var firebaseConfig = {
    apiKey: "AIzaSyCBHFYIlhbHhKRS4VUUCU0zlK4_IKIVvy4",
    authDomain: "attendance-portal01.firebaseapp.com",
    databaseURL: "https://attendance-portal01.firebaseio.com",
    projectId: "attendance-portal01",
    storageBucket: "",
    messagingSenderId: "1040482258568",
    appId: "1:1040482258568:web:35aee477a19fe8d4"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// var provider = new firebase.auth.FacebookAuthProvider();
export default  firebaseApp




