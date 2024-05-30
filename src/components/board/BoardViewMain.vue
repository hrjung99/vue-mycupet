<template>
  <CommonHeader />
  <div class="main-container">
    <CommonSideBar ref="sidebar" />
    <BoardViewContent />
  </div>
  <CommonFooter />
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import './../common/CommonButtonStyle.css';
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
}
</style>
