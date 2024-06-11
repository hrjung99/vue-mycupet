<template>
  <div>
    <CommonHeader />
    <div class="main-container">
      <div class="content-container">
        <CommonSideBar />
        <div class="login-container">
          <img src="../common/assets/logo.png" width="300" height="250" />
          <LoginForm />
        </div>
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import LoginForm from "./login/LoginForm.vue";

export default {
  name: "LoginMain",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    LoginForm,
  },
};
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  user-select: none;
  height: 100vh; /* 화면 전체 높이에 맞추기 위해 */
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}

.login-container {
  display: flex;
  flex-direction: row;
  align-items: center; /* 요소를 수직으로 가운데 정렬 */
  margin: 40px;
}

.login-container img {
  margin-right: 60px;
  user-select: none;
}
</style>