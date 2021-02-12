<template>
  <div class="box">
    <h1 class="title is-5">Find Product</h1>
    <FindProductBy findBy="name" example="Noodles" />
    <FindProductBy findBy="barcode" example="737628064502" />
  </div>
</template>

<script>
import FindProductBy from "./FindProductBy";

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      name: "",
      page: 1,
    };
  },
  components: {
    FindProductBy,
  },
};
</script>