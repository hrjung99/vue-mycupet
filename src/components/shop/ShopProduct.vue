<template>
  <div class="card shadow-sm">
    <span class="img" :style="{backgroundImage: `url(${item.cupet_prodimgpath})`}"/>
    <div class="card-body">
      <p class="card-text">
        <span>{{ item.cupet_prodname }} &nbsp; </span>
        <span class="discount badge bg-danger">
          {{ item.cupet_proddiscountper }} %
        </span>
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" @click="addToCart(item.cupet_prodno)">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </button>
        <small class="price text-muted">
          {{ lib.getNumberFormatted(item.cupet_prodprice) }} 원
        </small>
        <small class="real text-danger">
          {{ lib.getNumberFormatted( item.cupet_prodprice - (item.cupet_prodprice * item.cupet_proddiscountper /100)) }} 원
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import lib from "@/scripts/lib";
import axios from "axios";
import './../common/CommonButtonStyle.css';

export default {
  name: "ShopProduct",
  props: {
    item: Object
  },
  setup() {

    const token = localStorage.getItem("Token"); 

    const addToCart = (cupet_prodno) => {
      console.log(cupet_prodno);
      axios.post(`/api1/cart/items/${cupet_prodno}`, {},  {
      headers: {
          Authorization: `Bearer ${token}`
        }
    }).then(() => {
      console.log('success')
    })


    };
    return {lib, addToCart}
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

.card .card-body .price{
  text-decoration: line-through;
}
</style>