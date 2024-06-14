<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-container">
      <CommonSideBar />
      <div class="infocontent-container">
        <DetailInfoCard
          :petDetail="selectedPetDetail"
          class="detail-info-card"
        />
        <div class="mapbut-and-map-container">
          <KaKaoMapMissingVue @select-pet="selectPet" />
        </div>
      </div>
    </div>
    <CommonFooter />
    <CommentInputForm
      :cupetPetNo="selectedPetDetail?.id"
      @comment-added="fetchComments"
    />
    <CommentList :comments="comments" />
  </div>
</template>

<script>
import { ref } from "vue";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import KaKaoMapMissingVue from "./map/KaKaoMapMissing.vue";
import DetailInfoCard from "./DetailInfoCard.vue";
import CommentInputForm from "./CommentInputForm.vue";
import CommentList from "./CommentList.vue";
import axios from "axios";

export default {
  name: "MissingMainPage",
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
    KaKaoMapMissingVue,
    DetailInfoCard,
    CommentInputForm,
    CommentList,
  },
  setup() {
    const selectedPetDetail = ref(null);
    const comments = ref([]);

    const selectPet = (petDetail) => {
      selectedPetDetail.value = petDetail;
      fetchComments();
    };

    const fetchComments = () => {
      if (!selectedPetDetail.value) return;
      axios
        .get(`/api1/findpet/comments?petId=${selectedPetDetail.value.id}`)
        .then((response) => {
          comments.value = response.data;
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    };

    return { selectedPetDetail, selectPet, comments, fetchComments };
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

.detail-info-card {
  margin-right: 20px; /* 카드와 지도 사이에 간격 추가 */
  height: 60vh;
  width: 300px;
}

.mapbut-and-map-container {
  flex-grow: 1; /* 지도 컨테이너가 남은 공간을 차지하도록 */
}
</style>
