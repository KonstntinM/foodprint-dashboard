<template>
    <b-navbar :spaced="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Foodprint Dashboard"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                Dashboard
            </b-navbar-item>
            <b-navbar-dropdown label="Downloads">
                <b-navbar-item href="#">
                    IOS
                </b-navbar-item>
                <b-navbar-item href="#">
                    Android
                </b-navbar-item>
                <b-navbar-item target="_blank" href="https://github.com/KonstntinM/foodprint">
                    Github
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <!-- <b-image
                    :src="this.profilePicture"
                    alt="Profile Picture"
                    ratio="601by235"
                    :rounded="true"
                ></b-image> -->
                <div class="buttons">
                    <a class="button is-primary" @click="logout()">
                        <b-icon
                            icon="logout"
                            size="is-small">
                        </b-icon>
                        <strong>Logout</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
        profilePicture: ""
    };
  },
  async created() {
    let user = await firebase.getCurrentUser();
    this.profilePicture = user.photoURL;
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