<template>

    <CommonHeader />
    <div class="main-container">
      <CommonSideBar />

      <div class="content">
        <h1 style="color:#7E84A3;">게시물 상세</h1>
        <BoardContent />
      </div>
      </div>

    <CommonFooter />

</template>

<script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import BoardContent from "@/components/board/BoardContent.vue";





export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardContent,

      },
};
</script>
<style scoped>
/* 여기에 스타일 내용을 작성합니다 */
.main-container{
  display: flex;
  flex-direction: row;
  background-color: #f2fff2;
}


.content{
  flex: 1;
  align-items: center;
}




</style>