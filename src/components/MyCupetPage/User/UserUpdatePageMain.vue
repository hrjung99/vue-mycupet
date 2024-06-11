<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar ref="sidebar" />
      <UserUpdatePage />
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import UserUpdatePage from "@/components/MyCupetPage/User/UserUpdatePage.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    UserUpdatePage,
    CommonFooter,
    CommonSideBar,
  },
  /* 페이지 켜면 sidebar 배경색이 흰색으로 바뀌는 코드*/
  mounted() {
    this.changeSidebarColor();
  },
  methods: {
    changeSidebarColor() {
      this.$refs.sidebar.changeBackground("#ffffff");
    }
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 95vh;
  justify-content: space-between; /* 하단 여백을 최대화하여 footer-container가 전체 너비를 채우도록 */
  background-color: #f2fff2;
}

.content-container {
  display: flex;
  flex: 1;
}
</style>