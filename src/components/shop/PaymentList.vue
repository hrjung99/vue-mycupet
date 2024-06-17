<template>
  <div class="main-container">
    <CommonHeader />
      <div class="content-container">
        <CommonSideBar />
        <div class="paymentList">
          <div class="container">
            <div class="text-center mb-4"><h2>결제 내역</h2></div>
            <table class="table table-hover">
              <thead class="table-dark">
                <tr>
                  <th>결제번호</th>
                  <th>금액</th>
                  <th>결제 UID</th>
                  <th>결제일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(payment, index) in payments" :key="index">
                  <td>{{ payment.cupet_payno }}</td>
                  <td>{{ payment.cupet_pay_price }} 원</td>
                  <td>{{ payment.cupet_payment_uid }}</td>
                  <td>{{ payment.cupet_pay_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    <CommonFooter />
  </div>
</template>
  
<script>
  import axios from 'axios';
  import CommonHeader from "@/components/common/CommonHeader.vue";
  import CommonSideBar from "@/components/common/CommonSideBar.vue";
  import CommonFooter from "@/components/common/CommonFooter.vue";
  
  export default {
    components: {
      CommonHeader,
      CommonSideBar,
      CommonFooter,
    },
    data() {
      return {
        payments: []
      };
    },
    async created() {
      const token = localStorage.getItem("Token");
      try {
        const response = await axios.get("/api1/pay", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.payments = response.data;
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    }
  };
</script>
  
<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex: 1;
}

.paymentList{
  flex: 1;
}

.container {
  padding: 20px;
}

.table {
  margin-top: 30px;
}

.table > tbody {
  border-top: 1px solid #eee;
}

.table > tbody > tr {
  cursor: pointer;
  transition: background-color 0.2s;
}

.table > tbody > tr:hover {
  background-color: #f1f1f1;
}

</style>