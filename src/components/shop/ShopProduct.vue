<template>
  <div class="card shadow-sm" @click="viewDetails(item.cupet_prodno)">
    <img
      :src="imageUrl || 'img/logo.png'"
      alt="new"
      width="400"
      height="250"
      class="logo sub-logo"
    />
    <div class="card-body">
      <p class="card-text">
        <span>{{ item.cupet_prodname }} &nbsp; </span>
        <span class="discount badge bg-danger">
          {{ item.cupet_proddiscountper }} % 
        </span> &nbsp;
        <span v-if="state.cupet_user_principle === 'admin'" @click.stop="deleteProduct(item.cupet_prodno)" >
        <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
      </p> 
      <div class="d-flex justify-content-between align-items-center">
        <button 
          class="btn btn-primary" 
          @click.stop="addToCart(item.cupet_prodno)"
          :disabled="item.cupet_prodcnt === 0">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </button>
        <small class="price text-muted">
          {{ lib.getNumberFormatted(item.cupet_prodprice) }} 원 
        </small>
        <small class="real text-danger">
          {{ lib.getNumberFormatted(item.cupet_prodprice - (item.cupet_prodprice * item.cupet_proddiscountper / 100)) }} 원
        </small>
      </div>
      <div v-if="item.cupet_prodcnt === 0" class="out-of-stock">
        sold out
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import lib from "@/scripts/lib";
import axios from 'axios';
import router from '@/router';

export default {
  name: "ShopProduct",
  props: {
    item: Object
  },

  setup(props) {
    const imageUrl = ref('');
    const token = localStorage.getItem("Token");
    const state = reactive({
      cupet_user_principle: "",
    });

    onMounted(() => {
      loadProdImage(props.item.cupet_prodno);
    });

    const loadProdImage = (cupet_prodno) => {
      axios.get(`/api1/images/shop/${cupet_prodno}`)
        .then((response) => {
          imageUrl.value = response.data.data;
        })
        .catch((error) => {
          console.error("Error loading product image:", error);
        });
    };

    const addToCart = (cupet_prodno) => {
      axios.post(`/api1/cart/items/${cupet_prodno}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        console.log('Added to cart successfully');
      }).catch((error) => {
        console.error('Error adding to cart:', error);
      });
    };

    const viewDetails = (cupet_prodno) => {
      router.push({ name: 'ShopDetail', params: { cupet_prodno: cupet_prodno } });
    };

    const deleteProduct = (cupet_prodno) => {
      axios.delete(`/api1/shop/delete/${cupet_prodno}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        console.log('Deleted successfully');
        location.reload(true);
      }).catch((error) => {
        console.error('Error deleting product:', error);
      });
    };

    const loaduserdata = () => {
      axios.post("/api1/userView", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("Data received:", response.data)
        Object.assign(state, response.data.cupet_user_principle)
            state.cupet_user_principle = response.data.cupet_user_principle
      })
      .catch(error => {
        console.error("Error fetching cart count:", error);
      });
    };

    loaduserdata();

    return { lib, addToCart, viewDetails, loadProdImage, imageUrl, state, deleteProduct };
  }
}
</script>

<style scoped>
.card .logo {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card .card-body .price {
  text-decoration: line-through;
}

.out-of-stock {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>