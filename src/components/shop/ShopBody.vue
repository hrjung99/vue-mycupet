<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="(item, idx) in state.cupetshopproduct" :key="idx">
          <ShopProduct :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import ShopProduct from "./ShopProduct.vue";

export default {
  name: "ShopBody",
  components: { ShopProduct },

  setup(){
    const state = reactive({ target: { cupetshopproduct: [] } });
    axios.get("/api/items").then(({data}) => {
      state.cupetshopproduct = data;
    });

    return {state}
  }
}
</script>

<style scoped></style>
