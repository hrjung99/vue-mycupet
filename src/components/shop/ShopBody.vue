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
    /*
      const list = ref([]); <- 여기에 cupet_prodno 추가
      쇼핑카트 버튼 누를경우 Controller 로 list 를 보낸다.
      list 내용을 쇼핑 카트에 담는다.
    */

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
