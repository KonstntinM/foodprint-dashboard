<template>
  <div class="box">
    <h1 class="title is-5">Create Product</h1>
    <section class="product-input">
      <b-field
        label="Name"
        v-bind:type="{ 'is-danger': this.errorName }"
        v-bind:message="{
          'Please enter a valid product name.': this.errorName,
        }"
      >
        <b-input v-model="name" placeholder="Product Name"></b-input>
      </b-field>
      <div class="columns">
        <b-field
          message="Enter a valid EAN that can be found by the user on a product."
          label="Barcode"
          class="column is-three-fifths"
          v-bind:type="{ 'is-danger': this.errorBarcode }"
        >
          <b-input v-model="barcode" placeholder="valid EAN"></b-input>
          <p class="control">
            <button class="button is-success is-light" @click="scanBarcode">
              Scan
            </button>
          </p>
        </b-field>
        <b-field
          label="Score"
          message="This score is fixed for the product and is not calculated from the ingredients."
          class="column"
          v-bind:class="{ 'is-danger': errorScore }"
        >
          <b-numberinput
            v-model="score"
            placeholder="Fixed product climate score"
          />
        </b-field>
      </div>
      <b-button type="is-success" @click="createProduct()">Save</b-button>
    </section>

    <b-modal class="scanner-container" v-model="scannerOpen" :width="640">
      <div class="card">
        <StreamBarcodeReader
          @decode="barcodeScanned()"
          @loaded="scannerLoaded()"
          v-if="this.scannerOpen"
        ></StreamBarcodeReader>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { ToastProgrammatic as Toast } from "buefy";
import firebase from "firebase";

var db = firebase.firestore();

export default {
  data() {
    return {
      barcode: "",
      score: 0,
      name: "",
      scannerOpen: false,
      errorName: false,
      errorBarcode: false,
      errorScore: false,
    };
  },
  components: {
    StreamBarcodeReader,
  },
  methods: {
    scanBarcode() {
      this.scannerOpen = true;
    },
    barcodeScanned(result) {
      console.log("Result", result);
      this.scannerOpen = false;
      this.barcode = result;
    },
    scannerLoaded() {
      console.log("scannerLoaded()");
    },
    createProduct() {
      if (this.name == "") {
        return (this.errorName = true);
      }
      this.errorName = false;

      if (this.barcode == "") {
        return (this.errorBarcode = true);
      }
      this.errorBarcode = false;

      if (!this.score) {
        return (this.errorScore = true);
      }
      this.errorScore = false;

      if (!this.barcode || !this.score) {
        return console.log("ERROR");
      }

      const id = this.barcode;
      const product = {
        score: this.score,
        name: this.name,
      };

      this.barcode = "";
      this.score = 0;
      this.name = "";

      db.collection("products")
        .doc(id)
        .set(product)
        .then(function () {
          Toast.open({
            message: "The product was successfully released.",
            type: "is-success",
          });
        })
        .catch(function () {
          Toast.open({
            message: "There was an error saving the product.",
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style lang="css">
</style>