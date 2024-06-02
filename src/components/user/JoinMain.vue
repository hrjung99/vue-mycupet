<template>
  <div>
    <CommonHeader />
    <div class="main-content">
      <div class="content-container">
        <CommonSideBar ref="sidebar" />
        <img
          src="./../common/assets/logo.png"
          alt="new"
          width="180"
          height="120"
          class="logo"
        />
        <JoinForm />
      </div>
    </div>
  </div>

  <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import JoinForm from "@/components/user/register/JoinForm.vue";
import "./../common/CommonButtonStyle.css";

export default {
  name: "JoinMain",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    JoinForm,
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      birth: "",
      phone: "",
      id: "",
      nickname: "",
      gender: "",
      add: "",
    };
  },
  mounted() {
    this.changeSidebarColor();
  },
  methods: {
    checkId() {
      // 이메일 중복 확인 로직 추가
      console.log("이메일 중복 확인:", this.email);
    },
    register() {
      // 회원가입 로직 추가
      if (this.password !== this.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      console.log(
        "회원가입 정보:",
        this.id,
        this.name,
        this.password,
        this.birth,
        this.phone
      );
    },
    changeSidebarColor() {
      this.$refs.sidebar.changeBackground("#ffffff");
    },
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
  align-items: flex-start;
  background-color: #f2fff2;
}

.logo {
  margin-left: 20px;
}

.join-container {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}

label {
  width: 120px;
  margin-right: 10px;
}

input {
  flex: 1;
}

button {
  margin-left: 10px;
}

.register-button {
  margin-top: 5px;
  margin-left: 150px;
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}
</style>