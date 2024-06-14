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
      <div class="pagination">
        <button v-for="page in pages" :key="page" @click="changePage(page)" :disabled="page === pageNo" :class="{ active: page === pageNo, highlighted: hoveredPage === page }">{{ page }}</button>
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
    const state = reactive({
      items: [],
      total: 0,
      pageNo: 1,
      size: 9,
      totalPages: 0,
    });
    const selectedSortOption = ref('latest');
    const hoveredPage = ref(null);

    const fetchData = () => {
      axios.get("/api1/products", {
        params: {
          pageNo: state.pageNo,
          size: state.size,
        },
      })
        .then(res => {
          state.items = res.data.list;
          state.total = res.data.total;
          state.totalPages = Math.ceil(state.total / state.size);
          sortItems();
        })
        .catch(error => {
          console.error("Error fetching items:", error);
        });
    };

    onMounted(() => {
      fetchData();
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

    const changePage = (page) => {
      if (page < 1 || page > state.totalPages) return;
      state.pageNo = page;
      fetchData();
    };


    const sortedItems = computed(() => {
      return [...state.items];
    });

    const pages = computed(() => {
      let startPage = Math.max(1, state.pageNo - 2);
      let endPage = Math.min(state.totalPages, state.pageNo + 2);
      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    });

    return { state, selectedSortOption, sortedItems, sortItems, changePage, pages, hoveredPage };
  },
};
</script>

<style scoped>
.pagination {
  flex: 1;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.pagination button:hover {
  font-weight: bold;
  background-color: #c0f8d1;
  color: white;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>
