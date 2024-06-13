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
          </div>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue"
import MainPageHeader from "@/components/common/MainPageHeader.vue"
import CommonFooter from "@/components/common/CommonFooter.vue"
import KaKaoMapMissingMain from "@/components/cupetfindpet/map/KaKaoMapMissingMain.vue"
import MainPageList from "@/components/MainPageList.vue"
import axios from "axios"

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
      currentImageIndex: 0,
      recentBoardList: [],
    }
  },
  mounted() {
    setInterval(this.changeImage, 5000) // 10초마다 이미지 변경
    this.fetchRecentBoardData()
  },
  methods: {
    changeImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.adImages.length
    },
    fetchRecentBoardData() {
      axios
        .get(`/api1/recentBoardView`)
        .then((response) => {
          this.recentBoardList = response.data.recentBoardView
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error)
        })
    },
  },
  computed: {
    currentImage() {
      return `/img/${this.adImages[this.currentImageIndex]}`
    },
  },
}
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
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100%;
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

.top {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
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
