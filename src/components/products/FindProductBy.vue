<template>
  <b-field :label="this.findByTag">
    <b-autocomplete
      :data="data"
      :placeholder="this.exampleTag"
      field="title"
      :loading="isFetching"
      :check-infinite-scroll="true"
      @typing="getAsyncData"
      @select="(option) => openProductScreen(option)"
    >
      <template slot-scope="props">
        <div class="media">
          <div class="media-left">
            <img width="32" :src="props.option.image" />
          </div>
          <div class="media-content">
            {{ props.option.name }}
            <br />
            <small>
              Score: <b>{{ props.option.score }}</b
              >, Barcode: <b>{{ props.option.barcode }}</b>
            </small>
          </div>
        </div>
      </template>
      <template slot="footer">
        <span v-show="page > 100" class="has-text-grey">
          Thats it! No more movies found.
        </span>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import firebase from "firebase";

var db = firebase.firestore();
var products = db.collection("products");

export default {
  props: {
    findBy: {
      type: String,
      default: "name",
    },
    example: {
      type: String,
      default: "Noodles",
    },
  },
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      name: "",
      page: 1,
      findByTag:
        "Find Product by " +
        this.findBy.charAt(0).toUpperCase() +
        this.findBy.slice(1),
      exampleTag:
        "e.g. " + this.example.charAt(0).toUpperCase() + this.example.slice(1),
    };
  },
  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    async getAsyncData(name) {
      // String update
      if (this.name !== name) {
        this.name = name;
        this.data = [];
        this.page = 1;
      }
      // String cleared
      if (!name.length) {
        this.data = [];
        this.page = 1;
        return;
      }

      this.isFetching = true;
      const productsQ = products
        .orderBy(this.findBy)
        .startAt(name)
        .endAt(name + "~")
        .limit(20);

      try {
        const { docs } = await productsQ.get();
        docs.map((doc) => {
          let data = doc.data();
          data.barcode = doc.id;
          this.data.push(data);
        });

        this.page++;
        this.isFetching = false;
      } catch {
        console.error("Cannot get the documents!");
        this.isFetching = false;
      }
    },
    openProductScreen (product) {
       console.log("openProductScreen", JSON.stringify(product));
        let route = "/dashboard/products/" + product.barcode + "/";
        this.$router.push(route)
        //this.$router.push({ name: 'ProductScreen', params: { id: product.barcode } });
        console.log("route routed", JSON.stringify(product))
    }
  },
};
</script>
