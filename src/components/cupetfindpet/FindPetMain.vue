<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />

      <div class="infocontent-container">
        <MissingPetInfoVue :mapLocate="mapLocate" />
        <div class="mapbut-and-map-container">
          <KaKaoMap />
        </div>
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import KaKaoMap from "@/components/cupetfindpet/map/KaKaoMap.vue";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import MissingPetInfoVue from "./info/MissingPetInfo.vue";
import { reactive, provide } from "vue";

export default {
  name: "FetMainPage",
  components: {
    KaKaoMap,
    CommonHeader,
    CommonSideBar,
    CommonFooter,
    MissingPetInfoVue,
  },
  setup() {
    const mapLocate = reactive({
      locateX: "",
      locateY: "",
    });

    provide("mapLocate", mapLocate);

    return {
      mapLocate,
    };
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
}

.sidebar-container {
  /* 필요에 따라 너비 조절 */
  display: flex;
  width: 20%; /* 예시로 20%로 설정 */
}

.infocontent-container {
  padding-top: 20px;
  display: flex; /* 요소들을 가로로 정렬 */
  padding-left: 10px;
}

/* 원하는 스타일링 추가 가능 */
</style>