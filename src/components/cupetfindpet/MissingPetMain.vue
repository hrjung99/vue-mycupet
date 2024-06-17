<template>
  <div class="main-container">
    <CommonHeader />
    <div class="content-area">
      <CommonSideBar />
      <main class="content-container">
        <div class="infocontent-container">
          <DetailInfoCard
            :petDetail="selectedPetDetail"
            class="detail-info-card"
          />
          <div class="mapbut-and-map-container">
            <KaKaoMapMissingVue @select-pet="selectPet" />
          </div>
        </div>
        <br />
      </main>
    </div>
    <CommonFooter />
  </div>
</template>

<script>
import { ref } from "vue";
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import KaKaoMapMissingVue from "./map/KaKaoMapMissing.vue";
import DetailInfoCard from "./DetailInfoCard.vue";
import axios from "axios";

export default {
  name: "MissingMainPage",
  components: {
    CommonHeader,
    CommonSideBar,
    CommonFooter,
    KaKaoMapMissingVue,
    DetailInfoCard,
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area {
  display: flex;
  flex: 1;
}

header {
  background: #f8f9fa;
  padding: 1rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
}

.infocontent-container {
  display: flex;
  flex-direction: row;
  padding-top: 20px;
}

.detail-info-card {
  margin-right: 20px;
  height: 60vh;
  width: 300px;
}

.mapbut-and-map-container {
  flex-grow: 1;
}

.comment-input-form,
.comment-list {
  margin: 10px 0;
}
</style>
