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
          <div class="info">{{ state.board.cupet_user_nickname }}</div>
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
      <button type="button" class="delete-button" @click="BoardDelete(state.board.cupet_board_no)">삭제</button>
      <router-link to="/BoardMain">
        <button type="button" class="cancel-button">취소</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import '@/components/common/CommonButtonStyle.css';


const router = useRouter();
const route = useRoute();
const state = reactive({ board: {} });


const BoardDelete = (cupet_board_no) => {
  axios
    .get(`/api1/boardDelete?cupet_board_no=${cupet_board_no}`)
    .then((response) => {
      console.log("Board deleted:", response.data);
      // 삭제 후 BoardMain 페이지로 이동
      router.push({ path: '/BoardMain' });
    })
    .catch((error) => {
      console.error("Error deleting board:", error);
    });
};



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
