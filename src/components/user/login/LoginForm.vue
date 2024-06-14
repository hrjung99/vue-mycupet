<template>
  <div>
    <h2>로그인</h2>
    <!-- 로그인 폼 내용 -->
    <form class="login-form" @submit.prevent="submitBtn">
      <label for="username">아이디</label>
      <input
        type="text"
        v-model="formData.username"
        id="username"
        name="username"
        required
      />

      <label for="password">비밀번호</label>
      <input
        type="password"
        v-model="formData.password"
        id="password"
        name="password"
        required
      />

      <div class="button-container">
        <button type="submit">로그인</button>
        <button type="button" @click="goToRegister">회원가입</button>

        <IDRecovery />
        <PasswordRecovery />
      </div>
    </form>
  </div>
</template>

<script>
import PasswordRecovery from "./PasswordRecovery.vue"; // 경로는 실제 파일 경로에 맞게 수정해야 합니다.
import IDRecovery from "./IDRecovery.vue";
import axios from "axios";

export default {
  name: "LoginForm",
  components: {
    PasswordRecovery,
    IDRecovery,
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitBtn() {
      axios
        .post("/api2/user/login", null, { params: this.formData })
        .then((response) => {
          localStorage.setItem("Token", response.data.token);
          this.$router.push("/");
        })
        .catch((error) => {
          alert("올바르지 않은 사용자 정보입니다.");
          console.error(error);
        });
    },
    goToRegister() {
      this.$router.push("/JoinUser");
    },
  },
};
</script>

<style>
.main-content {
  display: flex;
  align-items: flex-start;
}

.login-container {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}

.login-container h2 {
  margin: 0 0 5px 0;
  color: #7e84a3;
  font-size: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.login-form label {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #7e84a3;
}

.login-form input {
  padding: 6px;
  font-size: 14px;
  margin-top: 3px;
}

.button-container {
  display: flex;
  padding-top: 25px;
  gap: 8px;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이에 맞추기 위해 */
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}
</style>
