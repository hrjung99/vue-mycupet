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
        <router-link to="/PayPage" class="pay btn">
          <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
        </router-link>
        <router-link v-if="state.cupet_user_principle === 'admin'" to="/ShopAdd" class="pay btn">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </router-link>
      </div>
    </div>
  </header>

</template>

<script>
import axios from "axios"
import { reactive } from "vue"

export default {
  name: "ShopHeader",

setup() {
    const state = reactive({
      cupet_user_principle: "",
    });
    const token = localStorage.getItem("Token");
    const loaddata = () => {
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

    loaddata();
    return { state}
  }
}

</script>

  <style scoped> 
  header .navbar .cart {
  margin-left: auto;
  color: white;
}

  </style>