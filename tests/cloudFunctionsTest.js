const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyAjCseS8CDxDlh4F9WKeQNRHt79VKyWJBQ",
    authDomain: "foodprint-c08ba.firebaseapp.com",
    projectId: "foodprint-c08ba",
    storageBucket: "foodprint-c08ba.appspot.com",
    messagingSenderId: "751645975588",
    appId: "1:751645975588:web:b75550df742b82905e64b1",
    measurementId: "G-7GBEQPHR1N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var requestProduct = firebase.functions().httpsCallable('requestProduct');
requestProduct({ EAN: 737628064502})
    .then((result) => {
        console.log(result.data);
    });