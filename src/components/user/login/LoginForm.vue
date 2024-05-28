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
          if (this.responseData === "틀렸습니다") {
            alert("아이디 or 비밀번호를 확인하세요");
            this.formData.username = "";
            this.formData.password = "";
          }
        })
        .catch((error) => {
          console.error("Error from API2:", error);
        });
    },

    registerBtn() {
      console.log("Sending registration request to API2");
      alert("Registering...");
      axios
        .post("/api2/test", null, { params: this.formData })
        .then((response) => {
          console.log("Response from API2:", response.data);
        })
        .catch((error) => {
          console.error("Error from API2:", error);
        });
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

.login-form button {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: #34a853;
  color: #ffffff;
  border: none;
  border-radius: 4px;
}

.login-form button:hover {
  background-color: #2e8b46;
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
