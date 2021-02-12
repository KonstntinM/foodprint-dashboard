<template>
  <b-menu>
    <b-menu-list label="">
      <b-menu-item icon="newspaper" label="Home" tag="router-link" :to="{ name: 'Home' }"></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Database">
      <b-menu-item icon="barcode" label="Products" tag="router-link" :to="{ name: 'ProductsDashboard'}"></b-menu-item>
      <b-menu-item icon="counter" :active="isActive" expanded>
        <template slot="label" slot-scope="props">
          Factors
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
          ></b-icon>
        </template>
        
        <b-menu-item icon="carrot" tag="router-link" :to="{ name: 'Ingredients'}">
          <template slot="label">
            Ingredients
            <b-dropdown
              aria-role="list"
              class="is-pulled-right"
              position="is-bottom-left"
            >
              <b-icon icon="dots-vertical" slot="trigger"></b-icon>
              <b-dropdown-item aria-role="listitem"
                >Create Ingredient</b-dropdown-item
              >
            </b-dropdown>
          </template>
        </b-menu-item>
        <b-menu-item icon="package-variant" tag="router-link" :to="{ name: 'Packaging'}">
          <template slot="label">
            Packaging
            <b-dropdown
              aria-role="list"
              class="is-pulled-right"
              position="is-bottom-left"
            >
              <b-icon icon="dots-vertical" slot="trigger"></b-icon>
              <b-dropdown-item aria-role="listitem"
                >Create Packing</b-dropdown-item
              >
            </b-dropdown>
          </template>
        </b-menu-item>
        <b-menu-item
          icon="train-car"
          label="Transport distance"
          disabled
        ></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-list label="Administration" v-if="this.isAdmin">
        <b-menu-item icon="account-check" label="User" tag="router-link" :to="{ name: 'User'}"></b-menu-item>
        <b-menu-item
          icon="fire"
          label="Server Console"
          tag="router-link"
          target="_blank"
          :to="this.firebaseLink"
        ></b-menu-item>
        <b-menu-item
          icon="cash-multiple"
          label="Payments"
          disabled
        ></b-menu-item>
      </b-menu-list>
    </b-menu-list>
    <b-menu-list label="Your Account">
      <b-menu-item icon="logout" label="Logout" @click="logout()"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      isActive: true,
      isAdmin: false,
      firebaseLink:
        "https://console.firebase.google.com/u/0/project/foodprint-c08ba/overview",
    };
  },
  async mounted() {
    const user = await firebase.getCurrentUserClaims();
    this.isAdmin = user.claims.isAdmin;
  },
  methods: {
    logout() {
      this.loading = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("success!");
          this.$router.push("/");
        })
        .catch(() => {
          this.loading = false;
          this.$buefy.toast.open({
            duration: 5000,
            message: `Oops! There was a problem logging out with your account.`,
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style lang="css">
.menu {
    text-align: left;
}

.menu-label {
    margin-top: 1em;
}
</style>