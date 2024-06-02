<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="(item, idx) in state.items" :key="idx">
          <ShopProduct :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import ShopProduct from "./ShopProduct.vue";

export default {
  name: "ShopBody",
  components: { ShopProduct },

  setup(){
    const state = reactive({ target: { items: [] } });

    onMounted(() => {
      axios.get("/api1/products")
        .then(res => {
          state.items = res.data.list;
        })
        .catch(error => {
          console.error("Error fetching select options:", error);
        });
    });

    return { state };
  },
};
</script>

<style scoped>
</style>
