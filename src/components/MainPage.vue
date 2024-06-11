<template>
  <div class="main-container">
    <CommonHeader />
    <MainPageHeader />
    <div class="child-container">
      <div class="ad-container">
        <img :src="currentImage" alt="advertisement" class="ad-image" />
      </div>
      <div class="contents-container container">
        <div class="row">
          <div class="col-md-6">
            <div class="map-main-container p-3 mb-3 text-center">
              <h5 class="container-title">내 근처 잃어버린 반려동물</h5>
              <KaKaoMapMissingMain />
            </div>
          </div>
          <div class="col-md-6">
            <div class="board-main-container p-3 mb-3 text-center">
              <h5 class="container-title">최근 핫한 게시물</h5>
              <!-- 여기에 게시물 내용을 추가하세요 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import MainPageHeader from "@/components/common/MainPageHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import KaKaoMapMissingMain from "@/components/cupetfindpet/map/KaKaoMapMissingMain.vue";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    MainPageHeader,
    CommonFooter,
    KaKaoMapMissingMain,
  },
  data() {
    return {
      adImages: [
        "cat_fun.jpg",
        "dog_fun.jpg",
        // 추가 이미지 파일명 계속 추가
      ],
      currentImageIndex: 0,
    };
  },
  mounted() {
    setInterval(this.changeImage, 10000); // 10초마다 이미지 변경
  },
  methods: {
    changeImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.adImages.length;
    },
  },
  computed: {
    currentImage() {
      return `/img/${this.adImages[this.currentImageIndex]}`;
    },
  },
};
</script>

<style scoped>
/* 스타일 추가 */
.main-container {
  display: flex;
  user-select: none;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이에 맞추기 위해 */
  font-family: "Roboto", sans-serif;
}

.child-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 내부 요소를 수직 가운데 정렬합니다. */
}

.ad-container,
.contents-container {
  width: 100%; /* 내부 요소의 너비를 100%로 설정합니다. */
}

.contents-container {
  padding: 20px;
  flex: 1;
}

.container-title {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.map-main-container,
.board-main-container {
  border: 1px solid #ccc; /* 컨테이너 스타일을 추가할 수 있습니다 */
  border-radius: 5px;
  height: 100%; /* 부모 요소와 높이를 맞추기 위해 추가 */
}

.ad-container {
  text-align: center;
  padding: 50px;
}

.ad-image {
  width: 70vmax;
  height: 100px;
  border-radius: 5px;
}
</style>
