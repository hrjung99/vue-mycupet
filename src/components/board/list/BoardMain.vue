<template>
  <CommonHeader />
  <div class="main-container">
    <CommonSideBar ref="sidebar" />
    <div class="content">
      <h1 style="color: #7E84A3;">커뮤니티</h1>
      <div class="Search">
        <BoardSelectOptionList class="select-optionList" />
        <BoardSelectOptionSearch class="select-optionSearch" />
        <BoardSearch class="search-input"/>
      </div>
      <div class="board-list-container">
        <div>
        <BoardList class="board-list" />
      </div>
      <div>
        <router-link to="/BoardInsertMain">
          <button type="button" class="insert-button">
            등록
          </button>
        </router-link>
      </div>
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
import BoardList from "@/components/board/list/BoardList.vue";
import BoardSelectOptionList from "@/components/board/list/BoardSelectOptionList.vue";
import BoardSelectOptionSearch from "@/components/board/list/BoardSelectOptionSearch.vue";


export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardSearch,
    BoardList,
    BoardSelectOptionList,
    BoardSelectOptionSearch,
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
  padding-top: 20px;
}

.Search {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

/* 첫 번째 요소의 오른쪽 마진을 10px로 설정 */
.Search > *:first-child {
  margin-right: 10px;
}

/* 두 번째 요소의 왼쪽 마진을 10px로 설정 */
.Search > *:last-child {
  margin-left: 10px;
}

.board-list-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px; /* 보드 리스트와 등록 버튼 사이의 간격을 조정할 수 있습니다 */
}

.insert-button {
  margin-top: 10px;
}

button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: #34a853;
    color: #ffffff;
    border: none;
    border-radius: 5px;
}

button:hover {
    background-color: #9cd866;
}



</style>
