<template>
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />
      <div v-if="user">
        <h2>{{ user.cupet_user_name }}님의 상세 정보</h2>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>{{ user.cupet_user_id }}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{{ user.cupet_user_name }}</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>{{ user.cupet_user_nickname }}</td>
            </tr>
            <tr>
              <th>우편번호</th>
              <td>{{ user.cupet_user_address }}</td>
            </tr>
            <tr>
              <th>성별</th>
              <td>{{ user.cupet_user_gender }}</td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>{{ user.cupet_user_birth }}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{{ user.cupet_user_phonenumber }}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{{ user.cupet_user_email }}</td>
            </tr>
            <tr>
              <th>포인트</th>
              <td>{{ user.cupet_user_point }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CommonFooter />
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import CommonHeader from "@/components/common/CommonHeader.vue";
  import CommonSideBar from "@/components/common/CommonSideBar.vue";
  import CommonFooter from "@/components/common/CommonFooter.vue";
  
  export default {
    name: "UserDetailView",
    components: {
      CommonHeader,
      CommonSideBar,
      CommonFooter,
    },
    setup() {
      const route = useRoute();
      const cupet_user_id = route.params.cupet_user_id;
      const user = ref(null);
  
      onMounted(() => {
        fetchUserDetails(cupet_user_id);
      });
  
      const fetchUserDetails = (cupet_user_id) => {
        axios.get(`/api1/usersDetail/${cupet_user_id}`)
          .then((response) => {
            user.value = response.data;
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      };
  
      return { user, fetchUserDetails };
    }
  }
  </script>
  
  <style scoped>
  .content-container {
    text-align: center;
  }
  
  .table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .table th {
    background-color: #f2f2f2;
    text-align: left;
  }
  </style>
  