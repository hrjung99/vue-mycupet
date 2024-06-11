<template>
  <CommonHeader />
    <div class="content-container">
    <CommonSideBar ref="sidebar" />
    <div class="main-content">
      <div class="join-container">
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
  user-select: none;
  height: 100vh;
  background-color: #f2fff2;
  width: 100%;
  }  


.logo {
  margin-left: 20px;
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
  
}

.join-container{
    display: flex;
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
