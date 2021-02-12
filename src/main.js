import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import firebase from "firebase";

Vue.use(Buefy)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAjCseS8CDxDlh4F9WKeQNRHt79VKyWJBQ",
  authDomain: "foodprint-c08ba.firebaseapp.com",
  projectId: "foodprint-c08ba",
  storageBucket: "foodprint-c08ba.appspot.com",
  messagingSenderId: "751645975588",
  appId: "1:751645975588:web:b75550df742b82905e64b1",
  measurementId: "G-7GBEQPHR1N"
};


firebase.initializeApp(firebaseConfig);
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};
firebase.getCurrentUserClaims = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (!user) {
            resolve(null);
          }
          unsubscribe();
          resolve(user.getIdTokenResult());
      }, reject);
  })
};

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
