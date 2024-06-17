<template>
  <CommonHeader />
  <div class="content-container">
    <CommonSideBar />
    <div class="UserDetail">
      <div v-if="user">
        <div class="text-center mb-4">
          <h2>{{ user.cupet_user_name }}님의 상세 정보</h2>
        </div>
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
              <th>주소</th>
              <td>{{ user.roadAddress }}</td>
            </tr>
            <tr>
              <th>상세주소</th>
              <td>{{ user.detailAddress }}</td>
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
        <div class="text-start">
          <button @click="deleteUser" class="delete-button">회원 삭제</button>
        </div>
      </div>
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

    const deleteUser = () => {
      if (confirm("회원을 삭제하시겠습니까?")) {
        axios.delete('/api1/deleteusers', {
          data: { cupet_user_id: user.value.cupet_user_id }, 
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            alert("회원이 삭제되었습니다.");
            window.location.href = '/UserView'; 
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("회원 삭제 중 오류가 발생했습니다.");
          });
      }
    };

    return { user, fetchUserDetails, deleteUser };
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.content-container {
  height: 100%;
  min-height: 80vh;
  display: flex;
  flex: 1;
}

.UserDetail {
  margin-left: 50px;
  margin-right: 50px;
  flex: 0.5;
}

.delete-button {
  margin: 20px;
}

.delete-button:hover {
    background-color: darkred;
}
</style>
