<template>
  <div class="card">
    <div class="card-image">
      <b-skeleton :active="this.isLoading" height="25rem"></b-skeleton>
      <figure class="image is-4by3" v-if="!this.isLoading">
        <img :src="this.product.image" v-bind:class="{ 'is-invisible': !this.displayImage }"/>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <b-skeleton :active="this.isLoading" height="1.75rem" width="9rem" />
          <p class="title is-3" @click="editNameMethod()" v-if="!this.isLoading && !this.editName">
            {{ this.product.name }}
          </p>
          <b-input v-if="this.editName" ref="nameInput" id="nameInput" @blur="dataEdited()"></b-input>
          <b-skeleton :active="this.isLoading" height="1rem" width="5rem" />
          <p class="subtitle is-6" @click="editNameMethod()" v-if="!this.isLoading">
            {{ this.product.barcode }}
          </p>
          <b-input v-if="this.editBarcode" ref="barcodeInput" id="barcodeInput" @blur="dataEdited()"></b-input>
        </div>
        <b-skeleton :active="this.isLoading" height="1rem" width="8rem" />
        <p class="origin" v-if="!this.isLoading">
          {{ this.product.origin }}
        </p>
      </div>

      <div class="content">
        <p>
          Score: <a v-if="!this.isLoading">{{ this.product.score }}</a>
        </p>
        <h6 class="subtitle is-6 is-marginless-bottom has-margin-top">Ingredients</h6>
        <div class="ingredients-wrapper" v-if="!this.isLoading">
          <b-tag
            v-for="ingredient in this.product.ingredients"
            v-model="name"
            :key="ingredient.id"
            type="is-primary"
            closable
            aria-close-label="Close tag"
            class="has-margin-right"
            @close="deleteIngredient(ingredient.id)"
          >
            <b-tooltip :label="'Score: ' + ingredient.score" position="is-bottom">
              {{ ingredient.name }}
            </b-tooltip>
          </b-tag>
        </div>
        <h6 class="subtitle is-6 is-marginless-bottom has-margin-top">Packaging</h6>
        <div class="packaging-wrapper" v-if="!this.isLoading">
          <b-tag
            v-for="packing in this.product.packaging"
            :key="packing.id"
            type="is-warning"
            closable
            aria-close-label="Close tag"
            @close="deletePacking(packing.id)"
          >
            {{ packing.name }}
          </b-tag>
        </div>
        <div v-if="!this.isLoading" class="category-wrapper">
          <a v-for="category in this.product.categories" :key="category"
            >#{{ category }} </a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

var db = firebase.firestore();

export default {
  data() {
    return {
      name: "",
      isLoading: true,
      displayImage: false,
      exists: true,
      product: null,
      editName: false,
      editBarcode: false,
      editScore: false,
    };
  },
  async mounted() {
    try {
      var product = db.collection("products").doc(this.$route.params.id);
      const doc = await product.get();
      this.product = doc.data();
      this.isLoading = false;
      this.sleep(500);
      this.displayImage = true;
    } catch {
      console.error("Cannot get the document!");
      this.exists = false;
    }
  },
  methods: {
    sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    },
    editNameMethod () {
      this.editName = true;
      this.$refs.nameInput.focus();
    },
    editBarcodeMethod () {
      this.editBarcode = true;
      document.getElementById('barcodeInput').focus();
    },
    editScoreMethod () {
      this.editScore = true;
      document.getElementById('scoreInput').focus();
    },
    dataEdited () {
      this.editName = false;
      this.editBarcode = false;
      this.editScore = false;
    },
    deleteIngredient() {
      this.$buefy.snackbar.open(
        `At the moment we do not support this function.`
      );
    },
    deletePacking() {
      this.$buefy.snackbar.open(
        `At the moment we do not support this function.`
      );
    },
  },
};
</script>

<style lang="css">
.origin {
  align-content: right;
  justify-content: center;
  text-align: center;
}

.is-invisible {
  display: none;
}

.is-marginless-bottom {
  margin-bottom: 0.5rem !important;
}

.has-margin-top {
  margin-top: 0.75rem !important;
}

.tag,.has-margin-right {
  margin-right: 0.5rem;
}

#nameInput {
  max-width: 20rem;
  max-height: 2.5rem;
}
</style>