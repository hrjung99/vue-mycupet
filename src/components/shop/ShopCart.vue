<template>
  <CommonHeader />
  <div>
    <div class="content-container">
      <CommonSideBar />
      <div class="cart">
        <div class="container">
          <ul>
            <li v-for="(item, idx) in state.items" :key="idx">
              <img :src="item.cupet_prodimgpath" />
              <span class="name">{{ item.cupet_prodname }}</span>
              <span class="price">{{ lib.getNumberFormatted(item.cupet_prodprice - item.cupet_prodprice * item.cupet_proddiscountper / 100) }}원 &nbsp;</span>
              <i class="fa fa-trash" @click="remove(item.cupet_prodno)"></i>
            </li>
          </ul>
          <router-link to="/OrderPage"> <button type="button" class="buybtn">구입하기</button></router-link>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import {reactive} from "vue";
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
    })
    
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

    const remove = (cupet_prodno) => {
      axios.delete(`/api1/cart/items/${cupet_prodno}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        console.log('success')
        loadItems();
      })
    }
    loadItems();
    return {token, state, remove, lib}
  }
}
</script>

<style scoped>
.cart ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}

.cart ul li img {
  width: 150px;
  height: 150px;
}

.cart ul li .name {
  margin-left: 25px;
}

.cart ul li .price {
  margin-left: 25px;
}

.cart ul li i {
  float: right;
  font-size: 20px;
  margin-top: 65px;
  margin-right: 50px;
}

.cart .buybtn {
  width:300px;
  display:block;
  margin:0 auto;
  padding:30px 50px;
  font-size: 20px;
}
</style>