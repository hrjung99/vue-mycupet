<template>
  <div>
    <CommonHeader />
    <div class="main-content">
      <CommonSideBar />
      <div class="login-container">
        <h2>로그인</h2>
        <form class="login-form">
          <label for="username">아이디
            <input type="text" id="username" name="username" />
          </label>
          <label for="password">비밀번호
            <input type="password" id="password" name="password" />
          </label>
          <div class="button-container">
            <button type="submit">로그인</button>
            <button type="button">회원가입</button>
          </div>
        </form>
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
  },
};
</script>

<style scoped>
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
  color: #7E84A3;
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
  color: #7E84A3;
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
  background-color: #34A853;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
}

.login-form button:hover {
  background-color: #2e8b46;
}
</style>