<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar ref="sidebar" />
      <MyCupetPoint />
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import MyCupetPoint from "@/components/MyCupetPage/Point/MyCupetPoint.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    MyCupetPoint,
  },
};
</script>
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 91vh; /* 화면 전체 높이에 맞추기 위해 */
  justify-content: space-between; /* 하단 여백을 최대화하여 footer-container가 전체 너비를 채우도록 */
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}

/* 원하는 스타일링 추가 가능 */
</style>