<template>
  <header class="py-3 text-center container">
    <div class="row py-lg-3">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">My Cupet Shop</h1>
        <p class="lead text-body-secondary">나의 반려동물을 위한 현명한 선택</p>
        <router-link to="/cart" class="cart btn">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
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