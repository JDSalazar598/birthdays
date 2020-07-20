import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCY89A6PZw1QyIkjR0v9v68yiDILutt0Ks",
    authDomain: "birthday-2fe63.firebaseapp.com",
    databaseURL: "https://birthday-2fe63.firebaseio.com",
    projectId: "birthday-2fe63",
    storageBucket: "birthday-2fe63.appspot.com",
    messagingSenderId: "64797480305",
    appId: "1:64797480305:web:2f34d2e8485f7e737752d0"
};

 // Initialize Firebase
 export default firebase.initializeApp(firebaseConfig);