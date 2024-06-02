<template>
  <div style="user-select: none">
    <h2>로그인</h2>
    <form class="login-form" @submit.prevent="submitBtn">
      <label for="username"
        >아이디
        <input
          type="text"
          v-model="formData.username"
          id="username"
          name="username"
          autocomplete="username"
          required
        />
      </label>
      <label for="password"
        >비밀번호
        <input
          type="password"
          v-model="formData.password"
          id="password"
          name="password"
          autocomplete="current-password"
          required
        />
      </label>
      <div class="button-container">
        <button type="submit">로그인</button>
        <button type="button" @click="registerBtn">회원가입</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import "./../../common/CommonButtonStyle.css";

export default {
  name: "LoginForm",
  data() {
    return {
      responseData: null,
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitBtn() {
      console.log("Sending login request to API2");
      axios
        .post("/api2/user/login", null, { params: this.formData })
        .then((response) => {
          this.responseData = response.data;
          localStorage.setItem("Token", response.data.token);
          this.$router.push("/"); // "/" 경로로 이동
        })
        .catch((error) => {
          alert("올바르지 않은 사용자 정보 입니다.", error);
        });
    },

    registerBtn() {
      console.log("Sending registration request to API2");
      alert("회원가입 페이지로 이동합니다.");
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
