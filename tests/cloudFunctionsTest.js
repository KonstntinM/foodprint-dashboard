const firebase = require('firebase');

var firebaseConfig = {
    projectId: "foodprint-c08ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.functions().useEmulator("localhost", 5001);
var requestProduct = firebase.functions().httpsCallable('requestProduct');
requestProduct({ EAN: 737628064502})
    .then((result) => {
        console.log(result.data);
    });