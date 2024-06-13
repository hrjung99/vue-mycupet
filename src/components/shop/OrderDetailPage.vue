<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar ref="sidebar" />
    <div class="orderDetailPage">
      <div class="container">
        <div class="text-center mb-4"><h2>주문 상세</h2></div>
        <div v-if="orderDetails">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">주문 번호: {{ orderDetails.cupet_order_no }}</h3>
              <p class="card-text">수신자 이름: {{ orderDetails.cupet_receiver_name }}</p>
              <p class="card-text">주소: {{ orderDetails.cupet_receiver_add }}</p>
              <p class="card-text">전화번호: {{ orderDetails.cupet_receiver_phone }}</p>
              <p class="card-text">총 가격: {{ lib.getNumberFormatted(orderDetails.cupet_total_price) }} 원</p>
              <p class="card-text">주문 날짜: {{ orderDetails.cupet_order_date }}</p>
            </div>
          </div>
          <div v-if="orderItems.length > 0">
            <h4>주문 상품</h4>
            <ul class="list-group">
              <li v-for="item in orderItems" :key="item.cupet_prodno" class="list-group-item d-flex justify-content-between align-items-center">
                <span>{{ item.cupet_prodname }}</span>
                <span>{{ lib.getNumberFormatted(item.cupet_prodprice - item.cupet_prodprice * item.cupet_proddiscountper / 100) }}원</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="text-center">
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
      orderDetails: null,
      orderItems: [],
      lib
    };
  },
  methods: {
    changeSidebarColor() {
      this.$refs.sidebar.changeBackground("#ffffff");
    },
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

        // Fetch order items details
        const itemsResponse = await axios.post('/api1/order/items', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            cupet_order_no: cupet_order_no
          }
        });
        this.orderItems = itemsResponse.data;
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    },
  },
  mounted() {
    this.changeSidebarColor();
    const cupet_order_no = this.$route.params.cupet_order_no;
    this.fetchOrderDetails(cupet_order_no);
  },
};
</script>

<style scoped>
.orderDetailPage { 
  background-color: #f2fff2;    
  position: relative;
  display: flex;
  justify-content: center; 
  align-items: center;
}

.card {
  margin-top: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
}

.container {
  padding: 20px;
}
</style>
