<template>
    <div>
      <CommonHeader />
      <div class="content-container">
        <CommonSideBar />
        <div class="container py-5">
          <h2>상품 등록</h2>
          <form @submit.prevent="submitProduct">
            <div class="form-group">
              <label for="cupet_prodimgpath">이미지 URL</label>
              <input type="text" v-model="product.cupet_prodimgpath" class="form-control" id="cupet_prodimgpath" required>
            </div>
            <div class="form-group">
              <label for="cupet_prodname">상품명</label>
              <input type="text" v-model="product.cupet_prodname" class="form-control" id="cupet_prodname" required>
            </div>
            <div class="form-group">
              <label for="cupet_prodprice">가격</label>
              <input type="number" v-model="product.cupet_prodprice" class="form-control" id="cupet_prodprice" required>
            </div>
            <div class="form-group">
              <label for="cupet_proddiscountper">할인율</label>
              <input type="number" v-model="product.cupet_proddiscountper" class="form-control" id="cupet_proddiscountper" required>
            </div>
            <div class="form-group">
              <label for="cupet_prodcont">상품 설명</label>
              <textarea v-model="product.cupet_prodcont" class="form-control" id="cupet_prodcont" required></textarea>
            </div>
            <div class="form-group">
              <label for="cupet_prodcnt">수량</label>
              <input type="number" v-model="product.cupet_prodcnt" class="form-control" id="cupet_prodcnt" required>
            </div>
            <button type="vutton" @click="submitProduct()">등록</button>
          </form>
        </div>
      </div>
      <CommonFooter />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import CommonHeader from "@/components/common/CommonHeader.vue";
  import CommonSideBar from "@/components/common/CommonSideBar.vue";
  import CommonFooter from "@/components/common/CommonFooter.vue";
  import "@/components/common/CommonButtonStyle.css";
  
  export default {
    name: 'ShopAdd',
    components: {
      CommonHeader,
      CommonSideBar,
      CommonFooter,
    },
    setup() {
      const product = ref({
        cupet_prodimgpath: '',
        cupet_prodname: '',
        cupet_prodprice: 0,
        cupet_proddiscountper: 0,
        cupet_prodcont: '',
        cupet_prodcnt: 0
      });
  
      const token = localStorage.getItem("Token"); 
      const router = useRouter();
  
      const validateProduct = () => {
        if (
          !product.value.cupet_prodimgpath ||
          !product.value.cupet_prodname ||
          product.value.cupet_prodprice <= 0 ||
          product.value.cupet_proddiscountper < 0 ||
          !product.value.cupet_prodcont ||
          product.value.cupet_prodcnt < 0
        ) {
          return false;
        }
        return true;
      };
  
      const submitProduct = async () => {
        if (!validateProduct()) {
          alert('모든 정보를 빠짐없이 입력해주세요.');
          return;
        }
  
        try {
          const response = await axios.post('/api1/shop/add', product.value, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log('상품 등록 성공:', response.data);
          alert('상품 등록이 완료되었습니다');
          router.push('/ShopMain');
        } catch (error) {
          console.error('상품 등록 중 오류 발생:', error);
          alert('상품 등록에 실패했습니다.');
        }
      };
  
      return { product, submitProduct };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  