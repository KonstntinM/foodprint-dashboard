<template>
  <div id="status-pending">
    <BaseTheme>
      <div class="column left">
        <h1 class="title is-1">Your verification is still pending</h1>
        <div class="subtitle steps-container">
          <b-steps
            v-model="activeStep"
            :animated="true"
            :rounded="false"
            :has-navigation="false"
          >
            <b-step-item step="1" label="Registration" :clickable="false">
            </b-step-item>

            <b-step-item step="2" label="Verification"> </b-step-item>

            <b-step-item step="3" label="Start editing!"> </b-step-item>
          </b-steps>
        </div>
        <p id="des">
          To ensure that only team members update our database, your user still
          needs to be verified. Please be patient or contact an administrator.
        </p>
        <div id="button-container">
          <b-button @click="logout()" size="is-medium" type="is-danger is-light" :loading="this.loading">Logout</b-button>
        </div>
      </div>
    </BaseTheme>
  </div>
</template>

<script>
// @ is an alias to /src

import BaseTheme from "../themes/BaseTheme";
import firebase from 'firebase'

export default {
  name: "status-pending",
  components: {
    BaseTheme,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      activeStep: 1,
      loading: false
    };
  },
  methods: {
    logout () {
      this.loading = true;
      firebase.auth().signOut().then(() => {
        console.log('success!')
        this.$router.push('/');
      }).catch(() => {
        this.loading = false;
        this.$buefy.toast.open({
            duration: 5000,
            message: `Oops! There was a problem logging out with your account.`,
            type: "is-danger",
        });
      });
    }
  }
};
</script>

<style>
.steps-container {
  margin-top: 4rem !important;
}

.step-details {
  margin-top: 1rem !important;
}

#status-pending {
  background-color: var(--background) !important;
}

.button {
  margin-top: 2rem;
}
</style>
