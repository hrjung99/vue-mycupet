<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />
      <KaKaoMap />
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import KaKaoMap from "@/components/findpet/map/KaKaoMap.vue";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";

export default {
  name: "MainPage",
  components: {
    KaKaoMap,
    CommonHeader,
    CommonSideBar,
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

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}

/* 원하는 스타일링 추가 가능 */
</style>
