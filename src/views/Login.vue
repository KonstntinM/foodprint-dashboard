<template>
  <div class="login">
    <BaseTheme>
      <div class="column left">
        <h1 class="title is-1">Welcome!</h1>
        <h2 class="subtitle colored is-4">Foodprint - Dashboard</h2>
        <p id="des">
          Foodprint is an android and ios app that helps you shop more
          environmentally conscious by scanning the barcodes of your products at
          the supermarket. Download it now from google play store or apple app
          stoer.
        </p>
      </div>
      <div class="column right has-text-centered">
        <h1 class="title is-4">Login</h1>
        <p class="description">Login or register as a member</p>
        <form class="">
          <div class="btn-google-signin-container is-flex">
            <figure class="image btn-google-signin is-clickable" @click="socialLogin">
              <img src="../assets/btn_google_signin_light_normal_web@2x.png" />
            </figure>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input is-medium"
                type="email"
                placeholder="E-Mail"
                v-model="this.email"
                disabled
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input is-medium"
                type="password"
                placeholder="Password"
                v-model="this.password"
                disabled
              />
            </div>
          </div>
          <button
            class="button is-block is-primary is-fullwidth is-medium"
            @click="login"
            type="button"
            disabled
          >
            Submit
          </button>
          <br />
          <small
            ><em
              >This access is developed for team members only. Your account will
              be activated after verification.</em
            ></small
          >
        </form>
      </div>
    </BaseTheme>
    <b-loading is-full-page v-model="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from "firebase";
import BaseTheme from "../themes/BaseTheme";

export default {
  name: "Login",
  components: {
    BaseTheme,
  },
  data() {
    return {
      isLoading: false,
      isFullPage: true,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {},
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.isLoading = true;

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.isLoading = false;
          this.$router.push("dashboard");
        })
        .catch(() => {
          this.isLoading = false;
          this.$buefy.toast.open({
            duration: 5000,
            message: `Oops! There was a problem logging in with your account.`,
            type: "is-danger",
          });
        });
    },
  },
};
</script>

<style lang="css">
.register {
  margin-top: 10rem;
  background: white;
  border-radius: 10px;
}

.btn-google-signin {
  width: 13rem !important;
  margin: 6%;
  margin-top: 0;
  justify-content: left;
}

.btn-google-signin-container {
  justify-content: center;
}

div.is-8:nth-child(1) {
 margin-top: 5rem;
}
</style>