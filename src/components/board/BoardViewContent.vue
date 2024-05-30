<template>
  <div>
    <div class="content">
      <h1 style="color:#7E84A3;">게시물 상세보기</h1>
      <div class="form-container">
        <div class="form-group">
          <label>번호: </label>
          <div class="info">{{ state.board.cupet_board_no }}</div>
        </div>
        <div class="form-group">
          <label>제목: </label>
          <div class="info">{{ state.board.cupet_board_title }}</div>
        </div>
        <div class="form-group">
          <label>내용: </label>
          <div class="info">{{ state.board.cupet_board_content }}</div>
        </div>
        <div class="form-group">
          <label>작성자: </label>
          <div class="info">{{ state.board.cupet_user_name }}</div>
        </div>
        <div class="form-group">
          <label>작성일: </label>
          <div class="info">{{ state.board.cupet_board_regdate }}</div>
        </div>
        <div class="form-group">
          <label>조회수: </label>
          <div class="info">{{ state.board.cupet_board_viewcnt }}</div>
        </div>
      </div>
    </div>
    <div class="change-button">
      <router-link :to="{ path: '/BoardUpdateMain', query: { cupet_board_no: state.board.cupet_board_no }}">
        <button type="button" class="update-button">수정</button>
      </router-link>
      <router-link to="/">
        <button type="button" class="delete-button">삭제</button>
      </router-link>
      <router-link to="/BoardMain">
        <button type="button" class="cancel-button">취소</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "BoardViewContent",
  setup() {
    const route = useRoute();
    const state = reactive({ board: {} });

    onMounted(() => {
      const cupet_board_no = route.query.cupet_board_no;
      axios
        .get(`/api1/boardView?cupet_board_no=${cupet_board_no}`)
        .then((response) => {
          state.board = response.data.board;
        })
        .catch((error) => {
          console.error("Error fetching board details:", error);
        });
    });

    return { state };
  },
};
</script>

<style scoped>
.content {
  flex: 1;
  align-items: center;
  padding-left: 40px;
  margin-top: 25px;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  margin-bottom: 10px;
}

.form-group label {
  margin-right: 10px;
}

.form-group {
  flex: 1;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
}

.change-button {
  margin-top: 10px;
  margin-left: 40px;
}

.update-button {
  margin-right: 10px;
}

.delete-button {
  margin-right: 10px;
}

.cancel-button {
  margin-right: 10px;
}
</style>
