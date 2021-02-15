const functions = require("firebase-functions");
const fetch = require('node-fetch');
var admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({ projectId: "foodprint-c08ba" });

const baseUrl = "https://world.openfoodfacts.org/api/v0/product/{{EAN}}.json?fields=code,product_name,image_front_url,manufacturing_places,purchase_places,ingredients,packaging,nutriments,categories_hierarchy,packaging";

exports.requestProduct = functions.https.onCall(async(data, context) => {
  
  if (!data.EAN) return { status: 422, message: "Your request is missing an EAN."};

  const ean = data.EAN.toString();

  var doc = await admin.firestore().collection("products").doc(ean).get();
  if (doc.exists) return { status: 409, message: "The product already exists." };

  var response = await fetch(baseUrl.replace("{{EAN}}", data.EAN))
  response = await response.json();

  if (response.status != 1) {
    return {error: "Something went wrong!", status: response.status, response: response};
  }

  var product = {
    name: response.product.product_name,
    origin: response.product.manufacturing_places,
    categories: response.product.categories_hierarchy,
    ean: response.product.code,
    image: response.product.image_front_url,
    score: {
      total: {
        value: 0,
        isFixed: false
      },
      ingredients: 0,
      packaging: 0,
      //  shipping: 0
    },
    ingredients: [],
    ingredients_index: [],
    packaging: [],
    nutriments: []
  }

  for (const ingredient of response.product.ingredients) {
    var doc = await admin.firestore().collection("ingredients").doc(ingredient.id).get();
    if (doc.exists) {
      doc = doc.data();
      doc.percentage = ingredient.percent_estimate;
      product.ingredients.push(doc)
    } else {
      admin.firestore().collection("ingredients").doc(ingredient.id).set({ name: ingredient.text, value: null});
      product.ingredients.push({ id: ingredient.id, name: ingredient.text, percentage: ingredient.percent_estimate, value: null});
      product.ingredients_index.push(ingredient.id);
    }
  }

  for (const packaging of response.product.packaging.includes(",") ? response.product.packaging.split(",") : response.prodcut.packaging) {
    var doc = await admin.firestore().collection("packaging").doc(packaging).get();
    if (doc.exists) {
      doc = doc.data();
      product.packaging.push(doc)
    } else {
      product.packaging.push({id: packaging, name: packaging, value: null});
      admin.firestore().collection("packaging").doc(packaging).set({name: packaging, value: null});
    }
  }

  for (const nutriment in response.product.nutriments) {
    if (nutriment.includes("_100g") && response.product.nutriments[nutriment.replace('100g', 'unit')] == "g") {
      product.nutriments.push({ name: nutriment.replace('_100g',''), per100g: response.product.nutriments[nutriment] });
    }
  }

  admin.firestore().collection("products").doc(ean).set(product);

  return { status: 200, message: "The product was successfully found in our database.", product: product };
});

exports.calculateScore = functions.firestore
  .document('products/{docId}')
  .onWrite(async (change, context) => {

    if (context.eventType == "google.firestore.document.delete") return;

    const before = change.before.exists ? change.before.data() : null;
    const after = change.after.data();

    var ingredientsScore = 0;
    var packagingScore = 0;

    if (before != null && before.ingredients !== after.ingredients) {
      for (const ingredient in after.ingredients) {
        ingredientsScore = ingredientsScore + after.ingredients[ingredient].value;
      }
    }
    if (before != null && before.packaging !== after.packaging) {
      for (const packaging in after.packaging) {
        packagingScore = packagingScore + after.packaging[packaging].value;
      }
    }

    var totalScore = ingredientsScore + packagingScore;

    if (totalScore > 0) {

      var score = {
          ingredients: ingredientsScore,
          packaging: packagingScore
      };

      if (!after.score.total.isFixed) {
        score["total"] = {
          value: totalScore,
          isFixed: false
        }
      } else {
        score["total"] = {
          value: before.score.total.value,
          isFixed: true
        }
      }

      return change.after.ref.update({ score: score });
    }
    
    return;
  });

exports.updateIngredient = functions.firestore
  .document('ingredients/{ingredientId}')
  .onUpdate(async (change, context) => {
    const update = change.after.data();

    return new Promise((resolve, reject) => {
      admin.firestore().collection("products").where("ingredients_index", "array-contains", context.params.ingredientId)
        .get()
        .then((products) => {
          products.forEach((product) => {
            var ingredients = product.data().ingredients;
            ingredients.forEach((ingredient) => {
              if (ingredient.id == context.params.ingredientId) {
                ingredient.value = update.value;
                ingredient.name = update.name;
              }
            })
            product.ref.update({ ingredients: ingredients})
          })
          resolve();
        })
        .catch((err) => {
          reject(err);
        })
    })
  });

  exports.updatePackaging = functions.firestore
  .document('packaging/{packagingId}')
  .onUpdate(async (change, context) => {
    console.warn("change!")
    const oldIngredient = change.before.data();
    const newIngredient = change.after.data();

    oldIngredient["id"] = context.params.packagingId;
    
    return new Promise((resolve, reject) => {
      admin.firestore().collection("products").where("packaging", "array-contains", oldIngredient)
        .get()
        .then((products) => {
          products.forEach((product) => {
            var packagings = product.data().packaging;
            packagings.forEach((packaging) => {
              if (packaging.id == oldIngredient.id) {
                packaging.value = newIngredient.value;
                packaging.name = newIngredient.name;
              }
            })
            product.ref.update({ packaging: packagings})
          })
          resolve();
        })
        .catch((err) => {
          reject(err);
        })
    })
  });