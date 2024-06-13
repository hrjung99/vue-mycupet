<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <div class="container py-5">
      <div v-if="product" class="row">
        <div class="col-md-6">
          <img :src="imageUrl || 'img/logo.png'" class="img-fluid" alt="Product Image">
        </div>
        <div class="col-md-6">
          <h2>{{ product.cupet_prodname }}</h2>
          <p class="price">{{ lib.getNumberFormatted(product.cupet_prodprice) }} 원</p>
          <p class="discount">{{ product.cupet_proddiscountper }}% 할인</p>
          <p class="final-price">{{ lib.getNumberFormatted(product.cupet_prodprice - (product.cupet_prodprice * product.cupet_proddiscountper / 100)) }} 원</p>
          <p v-if="product.cupet_prodcnt === 0" class="out-of-stock">Sold Out</p>
          <p class="content">{{ product.cupet_prodcont }}</p>
          <button button type="button" @click.stop="addToCart" :disabled="product.cupet_prodcnt === 0">장바구니 담기</button>
          <router-link to="/ShopCart" class="cart btn">
            <button button type="button">장바구니 바로가기</button>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import lib from "@/scripts/lib";
import { useRoute } from "vue-router";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";

export default {
  name: 'ShopDetail',
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
  },
  setup() {
    const product = ref(null);
    const imageUrl = ref('');
    const route = useRoute();
    const cupet_prodno = ref(route.params.cupet_prodno);
    const token = localStorage.getItem("Token");

    const addToCart = () => {
      if (product.value) {
        console.log("장바구니에 추가: " + product.value.cupet_prodno);
        axios.post(`/api1/cart/items/${product.value.cupet_prodno}`, {},  {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          console.log('success');
        }).catch(error => {
          console.error("장바구니에 추가하는 중 오류 발생:", error);
        });
      } else {
        console.error("상품 정보가 로드되지 않았습니다.");
      }
    };

    const loadProduct = async () => {
      try {
        console.log("상품 번호:", cupet_prodno.value);
        const response = await axios.get(`/api1/shop/${cupet_prodno.value}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("상품 정보:", response.data);
        product.value = response.data;
        loadProdImage(cupet_prodno.value); // 상품 정보를 받아온 후 이미지 로드 호출
      } catch (error) {
        console.error("상품 정보를 불러오는 중 오류 발생:", error);
        if (error.response) {
          console.error("응답 상태 코드:", error.response.status);
          console.error("응답 데이터:", error.response.data);
        }
      }
    };

    const loadProdImage = (cupet_prodno) => {
      axios.get(`/api1/images/shop/${cupet_prodno}`)
        .then((response) => {
          imageUrl.value = response.data.data;
        })
        .catch((error) => {
          console.error("Error loading product image:", error);
        });
    };

    onMounted(loadProduct);

    return { product, lib, addToCart, imageUrl };
  }
};
</script>

<style scoped>
.price {
  text-decoration: line-through;
}

.discount {
  color: red;
}

.final-price {
  font-size: 1.5em;
  color: green;
}

.out-of-stock {
  color: red;
  font-weight: bold;
}
</style>
