<template>
  <div class="main-container">
    <CommonHeader />
    <CommonSideBar ref="sidebar" />
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
  },
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
  height: 100vh; /* 화면 전체 높이에 맞추기 위해 */
  background-color: #f2fff2;
}

/* 원하는 스타일링 추가 가능 */
</style>