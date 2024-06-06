<template>
  <CommonHeader />
  <div>
    <div class="content-container">
      <CommonSideBar />
      <div class="cart">
        <div class="container">
          <div class="py-3 text-center"><h2>장바구니</h2></div>
          <ul>
            <li v-for="(item, idx) in state.items" :key="idx" class="cart-item">
              <img :src="item.cupet_prodimgpath" />
              <span class="name">{{ item.cupet_prodname }}</span>
              <span class="price">{{ lib.getNumberFormatted(item.cupet_prodprice - item.cupet_prodprice * item.cupet_proddiscountper / 100) }}원 &nbsp;</span>
              <i class="fa fa-trash" @click="remove(item.cupet_prodno)"></i>
            </li>
            <h5 class="text-center total-price">총 금액 : {{ lib.getNumberFormatted(computedPrice) }}원</h5>
          </ul>
          <router-link to="/OrderPage"> <button type="button" class="buybtn">구입하기</button></router-link>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import { reactive, computed } from "vue";
import axios from "axios";
import lib from "@/scripts/lib";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import "@/components/common/CommonButtonStyle.css";

export default {
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
  },
  setup() {
    const state = reactive({
      items: []
    });
    
    const token = localStorage.getItem("Token"); 
    
    const loadItems = () => {
      axios.post("/api1/cart/items", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // 서버로부터 받은 데이터를 state에 할당합니다.
        state.items = response.data;
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });
    };

    const computedPrice = computed(() => {
      let result = 0;
      for (let i of state.items) {
        result += i.cupet_prodprice - i.cupet_prodprice * i.cupet_proddiscountper / 100;
      }
      return result;
    });

    const remove = (cupet_prodno) => {
      axios.delete(`/api1/cart/items/${cupet_prodno}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        console.log('success');
        loadItems();
      });
    };
    
    loadItems();
    return { token, computedPrice, state, remove, lib };
  }
}
</script>

<style scoped>
.content-container {
  display: flex;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cart ul {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.cart ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eee;
  padding: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
}

.cart ul li img {
  width: 150px;
  height: 150px;
}

.cart ul li .name {
  flex: 1;
  margin-left: 25px;
}

.cart ul li .price {
  margin-left: 25px;
}

.cart ul li i {
  cursor: pointer;
}

.cart .buybtn {
  width: 300px;
  margin: 20px 0;
  padding: 20px 50px;
  font-size: 20px;
}
</style>
