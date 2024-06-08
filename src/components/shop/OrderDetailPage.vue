<template>
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />
      <div class="orderDetailPage">
        <div class="container">
          <div class="text-center"><h2>주문 상세</h2></div>
          <div v-if="orderDetails">
            <h3>주문 번호: {{ orderDetails.cupet_order_no }}</h3>
            <p>수신자 이름: {{ orderDetails.cupet_receiver_name }}</p>
            <p>주소: {{ orderDetails.cupet_receiver_add }}</p>
            <p>전화번호: {{ orderDetails.cupet_receiver_phone }}</p>
            <p>총 가격: {{ lib.getNumberFormatted(orderDetails.cupet_total_price) }} 원</p>
            <p>주문 날짜: {{ orderDetails.cupet_order_date }}</p>
          </div>
          <div v-else>
            <p>주문 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    </div>
    <CommonFooter />
  </template>
  
  <script>
  import axios from "axios";
  import CommonHeader from "@/components/common/CommonHeader.vue";
  import CommonSideBar from "@/components/common/CommonSideBar.vue";
  import CommonFooter from "@/components/common/CommonFooter.vue";
  import lib from "@/scripts/lib";
  
  export default {
    components: {
      CommonHeader,
      CommonSideBar,
      CommonFooter,
    },
    data() {
      return {
        orderDetails: null, lib
      };
    },
    methods: {
      async fetchOrderDetails(cupet_order_no) {
        try {
          const token = localStorage.getItem("Token");
          const response = await axios.get(`/api1/order/${cupet_order_no}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          this.orderDetails = response.data;
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      },
    },
    mounted() {
      const cupet_order_no = this.$route.params.cupet_order_no; // URL에서 주문 번호를 가져오는 방식
      this.fetchOrderDetails(cupet_order_no);
    },
  };
  </script>
  
  <style scoped>
  </style>
  