<template>
  <div>
    <CommonHeader />
    <MainPageHeader />
    <CommonSideBar />
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import MainPageHeader from "@/components/common/MainPageHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    MainPageHeader,
    CommonFooter,
    CommonSideBar,
  },
};
</script>
<style scoped>
/* 여기에 스타일 내용을 작성합니다 */
</style>