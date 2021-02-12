<template>
  <section class="hero is-info welcome is-small">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Hello, {{ name }}.</h1>
        <h2 class="subtitle">Let's generate some content!</h2>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      name: " "
    };
  },
  async created() {
    let user = await firebase.getCurrentUser();
    this.name = user.displayName;
  },
  methods: {

  },
};
</script>

<style lang="css">
.hero.welcome.is-info {
  background: #36d1dc;
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
  background: linear-gradient(to right, #5b86e5, #36d1dc);
  text-align: left;
  max-height: 7rem;
  justify-content: center;
  align-content: center;
}
.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
</style>