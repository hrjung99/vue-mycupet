<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar2 />
      <MyCupetPage />
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import MyCupetPage from "@/components/MyCupetPage/MyCupetPage.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar2 from "@/components/common/CommonSideBar-2.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    MyCupetPage,
    CommonFooter,
    CommonSideBar2,
  },
};
</script>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 91vh; /* 화면 전체 높이에 맞추기 위해 */
  justify-content: space-between; /* 하단 여백을 최대화하여 footer-container가 전체 너비를 채우도록 */
  background-color: #f2fff2;
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}

/* 원하는 스타일링 추가 가능 */
</style>