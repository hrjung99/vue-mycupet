<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <div class="sidebar-container">
        <!-- 사이드바를 감싸는 새로운 컨테이너 -->
        <CommonSideBar />
      </div>
      <div class="content2-container">
        <div class="infocontent-container">
          <MissingPetInfoVue />
          <div class="mapbut-and-map-container">
            <KaKaoMap />
            <AddMissingPetButton />
          </div>
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
import AddMissingPetButton from "./AddMissingPetButton.vue";
import axios from "axios";

export default {
  name: "FetMainPage",
  components: {
    KaKaoMap,
    CommonHeader,
    CommonSideBar,
    CommonFooter,
    MissingPetInfoVue,
    AddMissingPetButton,
  },
  mounted() {
    const token = localStorage.getItem("Token");

    if (token) {
      axios
        .post("/api1/findpet/getmissingpet", {
          token: token,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error sending token:", error);
        });
    }
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
  justify-content: space-between; /* 좌우 여백을 최대화하여 사이드바를 왼쪽에, 컨텐츠를 오른쪽에 정렬 */
}

.sidebar-container {
  /* 필요에 따라 너비 조절 */
  display: flex;
  width: 20%; /* 예시로 20%로 설정 */
}

.content2-container {
  width: 75%; /* 나머지 너비는 컨텐츠 영역으로 설정 */
}

.infocontent-container {
  display: flex; /* 요소들을 가로로 정렬 */
  padding-left: 10px;
  padding-top: 5vmax;
  padding-right: 10vmax;
}

/* 원하는 스타일링 추가 가능 */
</style>