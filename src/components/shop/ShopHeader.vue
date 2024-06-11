<template>
  <header class="py-2 text-center container">
    <div class="row py-lg-3">
      <div class="col-lg-6 col-md-1 mx-auto">
        <h1 class="fw-light">My Cupet Shop</h1>
        <p class="lead text-body-secondary">전품목 무료배송</p>
        <router-link to="/ShopCart" class="cart btn">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </router-link>
        <router-link to="/OrdersPage" class="orders btn">
          <i class="fa fa-th-list" aria-hidden="true"></i>
        </router-link>
      </div>
    </div>
  </header>

</template>
<script>
export default {
  name: "ShopHeader",
}
</script>

  <style scoped> 
  header .navbar .cart {
  margin-left: auto;
  color: white;
}

  </style>