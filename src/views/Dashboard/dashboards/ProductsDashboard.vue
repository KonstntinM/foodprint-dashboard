<template>
  <div class="products-dashboard">
    <FindProduct />
    <CreateProduct />
  </div>
</template>

<script>
import CreateProduct from "../../../components/products/CreateProduct";
import FindProduct from "../../../components/products/FindProduct";

export default {
  data() {
    return {};
  },
  components: {
    CreateProduct,
    FindProduct,
  },
  methods: {},
};
</script>

<style lang="css">
</style>