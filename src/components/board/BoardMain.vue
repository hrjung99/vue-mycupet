<template>

      <CommonHeader />
      <div class="main-container">
        <CommonSideBar />

        <div class="content">
          <div class="board_list">
          <h1>커뮤니티</h1>
          <div class="Search">
            <BoardSearchOption />
            <BoardSearch/>
          </div>
        <BoardList />
      </div>
        </div>
        </div>

      <CommonFooter />

  </template>
  
  <script>
  import CommonHeader from "@/components/common/CommonHeader.vue";
  import CommonFooter from "@/components/common/CommonFooter.vue";
  import CommonSideBar from "@/components/common/CommonSideBar.vue";
  import BoardSearch from "@/components/board/BoardSearch.vue";
  import BoardList from "@/components/board/BoardList.vue";
  import BoardSearchOption from "@/components/board/BoardSearchOption.vue";



  
  export default {
    name: "MainPage",
    components: {
      CommonHeader,
      CommonFooter,
      CommonSideBar,
      BoardSearch,
      BoardList,
      BoardSearchOption,
        },
  };
  </script>
  <style scoped>
  /* 여기에 스타일 내용을 작성합니다 */
  .main-container{
    display: flex;
    flex-direction: row;
  }


  .content{
    flex: 1;
    align-items: center;
  }
  
  .Search{
    display: flex;
    flex-direction: row;  
  }
  </style>