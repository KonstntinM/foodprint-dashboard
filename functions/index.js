const functions = require("firebase-functions");
const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const baseUrl = "https://world.openfoodfacts.org/api/v0/product/{{EAN}}.json";

exports.requestProduct = functions.https.onCall(async(data, context) => {
  const response = await fetch(baseUrl.replace("{{EAN}}", data.EAN))
  return response.json();
});
