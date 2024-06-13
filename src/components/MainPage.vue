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
              <h5 class="container-title">최근 게시물</h5>
              <div class="top">
                <h5 class="top-head">머릿말</h5>
                <h5 class="top-title">제목</h5>
                <h5 class="top-writer">작성자</h5>
              </div>
              <div class="recent_board_list">
                <div v-for="(board, index) in recentBoardList" :key="index">
                  <MainPageList :board="board" />
                </div>
              </div>
            </div>
            <div class="image-container1">
              <img :src="currentImage2" alt="반려동물 이미지 1" class="image1" />
            </div>
            <div class="image-container2">
              <img :src="currentImage2" alt="반려동물 이미지 2" class="image2" />
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
import MainPageList from "@/components/MainPageList.vue";
import axios from "axios";

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    MainPageHeader,
    CommonFooter,
    KaKaoMapMissingMain,
    MainPageList,
  },
  data() {
    return {
      adImages: [
        "cat_fun.jpg",
        "dog_fun.jpg",
        "cat_meal.jpg",
        "hamster_fun.jpg",
      ],
      petImages: [
        "고양이-1.jpg",
        "여름이-1.jpg",
        "여름이-2.jpg",
        "여름이-3.jpg",
        "여름이-4.jpg",
        "여름이-5.jpg",
        "여름이-6.jpg",
        "여름이-7.jpg",
      ],
      currentImageIndex: 0,
      currentImageIndex2: 0,
      recentBoardList: [],
    };
  },
  mounted() {
    setInterval(this.changeImage, 5000); // 10초마다 이미지 변경
    setInterval(this.changeImage2, 8000); // 16초마다 반려동물 변경
    this.fetchRecentBoardData();
  },
  methods: {
    changeImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.adImages.length;
    },
    changeImage2() {
      this.currentImageIndex2 =
        (this.currentImageIndex2 + 1) % this.petImages.length;
    },
    fetchRecentBoardData() {
      axios
        .get(`/api1/recentBoardView`)
        .then((response) => {
          this.recentBoardList = response.data.recentBoardView;
        })
        .catch((error) => {
          console.error("반려동물 데이터를 불러오는 중 오류 발생:", error);
        });
    },
  },
  computed: {
    currentImage() {
      return `/img/${this.adImages[this.currentImageIndex]}`;
    },
    currentImage2() {
      return `/img/${this.petImages[this.currentImageIndex2]}`;
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  user-select: none;
  flex-direction: column;
  height: 100vh;
  font-family: "Roboto", sans-serif;
}

.child-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recent_board_list {
  display: flex;
  flex-direction: column;
  margin-bottom: 3px;
}

.ad-container,
.contents-container {
  width: 100%;
}

.image-container1,
.image-container2 {
  display: inline-block;
  width: 46%;
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

.map-main-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100%;
}

.board-main-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 50%;
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

.image1,
.image2 {
  width: 265px;
  height: 265
  px;
  border-radius: 5px;
}

.top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 5px;
  margin-top: 20px;
  margin-left: 5px;
  font-weight: bold;
}

.top-head {
  width: 30%;
  margin-right: 10px;
  text-align: left;
  font-weight: bold;
}

.top-title {
  width: 50%;
  margin-right: 10px;
  text-align: left;
  font-weight: bold;
}

.top-writer {
  width: 20%;
  text-align: left;
  font-weight: bold;
}
</style>
