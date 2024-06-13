<template>
  <div class="card shadow-sm" @click="viewDetails(item.cupet_prodno)">
    <span class="img" :style="{backgroundImage: `url(${item.cupet_prodimgpath})`}"/>
    <div class="card-body">
      <p class="card-text">
        <span>{{ item.cupet_prodname }} &nbsp; </span>
        <span class="discount badge bg-danger">
          {{ item.cupet_proddiscountper }} %
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
import lib from "@/scripts/lib";
import axios from "axios";
import router from "@/router"; 

export default {
  name: "ShopProduct",
  props: {
    item: Object
  },
  setup() {
    const token = localStorage.getItem("Token"); 

    const addToCart = (cupet_prodno) => {
      console.log("장바구니에 추가: " + cupet_prodno);
      axios.post(`/api1/cart/items/${cupet_prodno}`, {},  {
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then(() => {
      console.log('success')
    });
    };

    const viewDetails = (cupet_prodno) => {
      console.log("상세보기: " + cupet_prodno);
      router.push({ name: 'ShopDetail', params: { cupet_prodno: cupet_prodno } });
    };

    return { lib, addToCart, viewDetails };
  }
}
</script>

<style scoped>
.card .img {
  display: inline-block;
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
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
