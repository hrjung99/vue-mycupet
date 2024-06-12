<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <div class="payPage">
    <div class="col-12">
      <h1>포인트 충전</h1>
      <label for="cupet_pay_price" class="form-label">충전 금액</label>
      <input type="text" class="form-control" id="cupet_pay_price" v-model="state.form.price"><br/>
      <button class="paybtn" @click="handlePayment()">결제하기</button> &nbsp;
      <router-link to="/PayList">
          <button class="paylistbtn">결제내역</button>
        </router-link>
    </div>
  </div>
</div>
  <CommonFooter />
</template>

<script>
import { reactive } from "vue";
import { loadIamportScript } from '@/scripts/iamport';
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import axios from 'axios';
import router from "@/router";

export default {
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
  },
  setup() {
    const token = localStorage.getItem("Token");
    const state = reactive({
      form: {
        price: "",
        paymentUid: "", 
        date: new Date().toISOString().slice(0, 16)
      }
    });

    const submit = async () => {
      try {
        const args = {
          cupet_pay_price: state.form.price,
          cupet_payment_uid: state.form.paymentUid,
          cupet_pay_date : state.form.date
        };

        const response = await axios.post("/api1/pay", args, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          alert('결제 완료');
          router.push({ path: "/MyCupetPage" });
          return response.data.data; // order_uid 반환
        } else {
          console.error('Failed to submit order', response.data);
          throw new Error('Order submission failed');
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        throw error;
      }
    };

    const handlePayment = async () => {
      try {
        await loadIamportScript();

        const { IMP } = window;
        IMP.init('imp46474075'); // 아임포트 상점 식별코드

        IMP.request_pay({
          pg: 'html5_inicis.INIpayTest', // 사용할 PG사
          pay_method: 'card', // 결제 수단
          merchant_uid: `merchant_${new Date().getTime()}`, // 고유 주문번호
          name: 'point_charge', // 주문명
          amount: state.form.price, // 결제 금액
          buyer_email: 'jeongmin0521@naver.com', // 예시 데이터
          buyer_name: '구매자 이름', // 예시 데이터
          buyer_tel: '010-1234-5678', // 예시 데이터
          buyer_addr: '서울특별시 강남구 삼성동', // 예시 데이터
          buyer_postcode: '123-456', // 예시 데이터
        }, async (rsp) => {
          if (rsp.success) {
            console.log('Payment succeeded', rsp);
            state.form.paymentUid = rsp.imp_uid; // 결제 UID 저장
            await submit(); // 결제 정보 서버로 전송
          } else {
            console.error('Payment failed', rsp);
            alert('결제 실패');
          }
        });
      } catch (error) {
        console.error('Error during payment process', error);
      }
    };
    return { state, submit, handlePayment };
  }
};
</script>

<style scoped>
.payPage { 
  margin-left: 50px;  
  position: relative;
  display: flex;
  justify-content: center; 
  align-items: center;
}
</style>