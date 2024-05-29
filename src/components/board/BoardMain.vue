<template>
    <CommonHeader />
    <div class="main-container">
      <CommonSideBar ref="sidebar" />
      <div class="content">
        <div class="board_list">
          <h1 style="color: #7E84A3;">커뮤니티</h1>
          <div class="Search">
            <BoardSelectOption class="select-option" />
            <BoardSearch class="search-input"/>
          </div>
          <BoardList class="board-list" />
          </div>
          <router-link to="/BoardInsertMain">
            <button type="button" class="insert-button">
              등록
            </button>
          </router-link>
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
import BoardSelectOption from "@/components/board/BoardSelectOption.vue";
import './../common/CommonButtonStyle.css';

export default {
  name: "MainPage",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar,
    BoardSearch,
    BoardList,
    BoardSelectOption,
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

.board-list {
  margin-top: 20px;
}

.insert-button {
  margin-top: 10px;
}

</style>
