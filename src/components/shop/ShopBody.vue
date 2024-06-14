<template>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row mb-4">
        <div class="col">
          <select v-model="selectedSortOption" @change="sortItems">
            <option value="latest">최신순</option>
            <option value="name">이름순</option>
            <option value="price">가격낮은순</option>
          </select>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="(item, idx) in sortedItems" :key="idx">
          <ShopProduct :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted, computed, ref } from "vue";
import ShopProduct from "./ShopProduct.vue";

export default {
  name: "ShopBody",
  components: { ShopProduct },

  setup() {
    const state = reactive({ items: [] });
    const selectedSortOption = ref('latest');

    onMounted(() => {
      axios.get("/api1/products")
        .then(res => {
          state.items = res.data.list;
          sortItems();  // Fetch 후에 정렬 수행
        })
        .catch(error => {
          console.error("Error fetching select options:", error);
        });
    });

    const sortItems = () => {
      if (selectedSortOption.value === 'latest') {
        state.items.sort((a, b) => new Date(b.cupet_prodno) - new Date(a.cupet_prodno));
      } else if (selectedSortOption.value === 'name') {
        state.items.sort((a, b) => a.cupet_prodname.localeCompare(b.cupet_prodname));
      } else if (selectedSortOption.value === 'price') {
        state.items.sort((a, b) => a.cupet_prodprice - b.cupet_prodprice);
      }
    };

    const sortedItems = computed(() => {
      return [...state.items];
    });

    return { state, selectedSortOption, sortedItems, sortItems };
  },
};
</script>

<style scoped>
</style>
