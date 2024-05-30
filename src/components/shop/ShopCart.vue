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
                <span class="price">{{ lib.getNumberFormatted(item.cupet_prodprice - item.cupet_prodprice * item.cupet_proddiscountper / 100) }}원</span>
                <i class="fa fa-trash" @click="remove(item.id)"></i>
              </li>
            </ul>
            <router-link to="/order" class="btn btn-primary">구입하기</router-link>
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


    const load = () => {
      axios.post("/api1/cart/items",{}, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }).then(({data2}) => {
        console.log(data2);
        state.items = data2;
    })
    };
    load();
    
    return {token, state, lib}
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

.cart .btn {
  width:300px;
  display:block;
  margin:0 auto;
  padding:30px 50px;
  font-size: 20px;
}
</style>