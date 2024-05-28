<template>
  <div class="main-container">
    <CommonHeader />
    <MainPageHeader />
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import MainPageHeader from "@/components/common/MainPageHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    MainPageHeader,
    CommonFooter,
  },
};
</script>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이에 맞추기 위해 */
}

/* 원하는 스타일링 추가 가능 */
</style>
