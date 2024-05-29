<template>
    <CommonHeader />
    <div class="main-container">
      <CommonSideBar ref="sidebar" />
      <div class="content">
        <h1 style="color:#7E84A3;">게시물 등록</h1>
        <BoardContent />
        <button type="button" class="register-button">
          등록
        </button>
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

.register-button {
  margin-top: 10px;
}
</style>