<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <div class="ordersPage">
      <div class="container">
        <div class="text-center"><h2>주문 내역</h2></div>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>주문번호</th>
            <th>수신인</th>
            <th>주소</th>
            <th>연락처</th>
            <th>주문 날짜</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(o, idx1) in state.orders" :key="idx1">
            <td>{{ state.orders.length - idx1 }}</td>
            <td>{{ o.cupet_receiver_name }}</td>
            <td>{{ o.cupet_receiver_add }}</td>
            <td>{{ o.cupet_receiver_phone }}</td>
            <td>{{ o.cupet_order_date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import { reactive, onMounted } from "vue";
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
      orders: [],
    });

    const loadOrders = () => {
      const token = localStorage.getItem("Token");
      axios.get("/api1/order", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        state.orders = [];

        for (let d of data) {
          state.orders.push(d);
        }
      }).catch(error => {
        console.error("Error fetching orders:", error);
      });
    };

    onMounted(() => {
      loadOrders();
    });

    return { state, lib };
  }
};
</script>

<style scoped>
.table {
  margin-top: 30px;
}

.table > tbody {
  border-top: 1px solid #eee;
}
</style>
