<template>
    <div id="products">
      <h1 class="title">Products</h1>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
  },
};
</script>

<style lang="css">
#products {
  max-height: 30rem;
  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}
</style>