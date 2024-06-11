<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <input type="number" v-model="amount" placeholder="결제 금액 입력">
    <button @click="handlePayment">결제하기</button>
  </div>
  <CommonFooter />
</template>

<script>
import { loadIamportScript } from '@/scripts/iamport';
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
    const handlePayment = async () => {
      try {
        await loadIamportScript();

        const { IMP } = window;
        IMP.init('imp46474075'); // 아임포트 상점 식별코드로 교체하세요

        IMP.request_pay({
          pg: 'html5_inicis.INIpayTest', // 사용할 PG사
          pay_method: 'card', // 결제 수단
          amount: '1', // 결제 금액
          buyer_email: 'user@example.com', // 예시 데이터
          buyer_name: '구매자 이름', // 예시 데이터
          buyer_tel: '010-1234-5678', // 예시 데이터
          buyer_addr: '서울특별시 강남구 삼성동', // 예시 데이터
          buyer_postcode: '123-456', // 예시 데이터
        }, (rsp) => {
          if (rsp.success) {
            console.log('Payment succeeded', rsp);
          } else {
            console.error('Payment failed', rsp);
          }
        });
      } catch (error) {
        console.error('Error during payment process', error);
      }
    };

    return {
      handlePayment,
    };
  },
};
</script>

<style scoped>
</style>