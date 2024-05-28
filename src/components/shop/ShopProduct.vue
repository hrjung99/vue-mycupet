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
        <button class="btn btn-primary"> 구입하기</button>
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

export default {
  name: "ShopProduct",
  props: {
    item: Object
  },
  setup() {
    return {lib}
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