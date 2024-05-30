<template>
  <CommonHeader />
  <div class="main-container">
    <CommonSideBar ref="sidebar" />
    <div class="content">
      <h1 style="color:#7E84A3;">게시물 수정</h1>
      <BoardContent />
      <div class="change-button">
        <button class="update2-button">수정</button>
        <router-link to="/BoardMain">
          <button type="button" class="cancel2-button">취소</button>
        </router-link>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import BoardContent from "@/components/board/BoardContent.vue";
import './../common/CommonButtonStyle.css';

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardContent,
  },
  mounted() {
    this.changeSidebarColor();
  },
  methods: {
    changeSidebarColor() {
      this.$refs.sidebar.changeBackground("#ffffff");
    }
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  background-color: #f2fff2;
}

.content {
  flex: 1;
  align-items: center;
  padding-left: 40px;
  margin-top: 25px;
}

.change-button {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  gap: 10px;
}

.update2-button {
  margin-left: 0;
}

.cancel2-button {
  margin-left: 0;
}
</style>