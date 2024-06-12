<template>
    <div class="page-container">
      <CommonHeader />
      <div class="content-container">
        <CommonSideBar />
        <div class="paymentList">
          <h1>결제 내역</h1>
          <table class="table">
            <thead>
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
                <td>{{ payment.cupet_pay_price }}</td>
                <td>{{ payment.cupet_payment_uid }}</td>
                <td>{{ payment.cupet_pay_date }}</td>
              </tr>
            </tbody>
          </table>
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
  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content-container {
    display: flex;
    flex: 1;
  }
  
  .paymentList {
    flex: 1;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px; /* 최대 너비를 800px로 설정 */
    margin: auto;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .table th {
    background-color: #f2f2f2;
    font-weight: bold;
    color : darkslategray;
  }
  
  .table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .table tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  