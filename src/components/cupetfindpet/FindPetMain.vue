<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />
      <MissingPetInfoVue />
      <KaKaoMap />
    </div>
    <AddMissingPetButton />
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
  name: "MainPage",
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
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}

/* 원하는 스타일링 추가 가능 */
</style>

