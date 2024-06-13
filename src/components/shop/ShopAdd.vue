<template>
  <div>
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />
      <div class="container py-5">
        <h2>상품 등록</h2>
        <form @submit.prevent="submitProduct">
          <div class="form-group">
            <label for="fileInput">이미지 업로드</label>
            <input type="file" id="fileInput" ref="fileInput" style="display: none" @change="handleFileChange">
            <button type="button" @click="triggerFileInput">파일 선택</button>
            <div v-if="imageUrl">
              <img :src="imageUrl" alt="선택된 이미지" style="max-width: 100%; height: auto;">
            </div>
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
          <button type="submit">등록</button>
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

    const imageUrl = ref(null);
    const selectedFile = ref(null);
    const token = localStorage.getItem("Token"); 
    const router = useRouter();

    const validateProduct = () => {
      if (
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

    const triggerFileInput = () => {
      document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
        imageUrl.value = URL.createObjectURL(file);
      }
    };

    const uploadImage = async (file, cupet_prodno) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('image_type', 'shop');
        formData.append('use_id', cupet_prodno);

        const response = await axios.post('/api1/images/upload/shop', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        product.value.cupet_prodimgpath = response.data.data;
        alert('이미지 업로드 완료');
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
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

        const cupet_prodno = response.data.cupet_prodno;
        if (selectedFile.value) {
          await uploadImage(selectedFile.value, cupet_prodno);
        }

        router.push('/ShopMain');
      } catch (error) {
        console.error('상품 등록 중 오류 발생:', error);
        alert('상품 등록에 실패했습니다.');
      }
    };

    return { product, triggerFileInput, handleFileChange, submitProduct, imageUrl };
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
