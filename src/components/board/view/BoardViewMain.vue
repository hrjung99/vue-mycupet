<template>
  <CommonHeader />
  <div class="main-container">
    <CommonSideBar ref="sidebar" />
    <BoardViewContent class="BoardViewContent" />
  </div>
  <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import '@/components/common/CommonButtonStyle.css';
import BoardViewContent from './BoardViewContent.vue';

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardViewContent,
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
  width: 100%; /* 추가하여 부모 컨테이너가 충분한 너비를 가지도록 함 */
}

.BoardViewContent {
  flex: 1; /* 또는 width: 100%; 를 사용하여 부모 컨테이너의 너비를 사용하도록 함 */
  /* 또는 원하는 고정 너비 설정 */
  width: 700px; /* 원하는 너비로 변경 */
}
</style>
