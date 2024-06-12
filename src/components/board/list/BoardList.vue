<template>
  <div class="board_list">
    <table class="board_list">
      <tr>
        <td></td>
        <th>머리말</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
      </tr>
      <tr
        v-for="item in boardData"
        :key="item.cupet_board_no"
        @click="goToView(item.cupet_board_no)"
        style="cursor: pointer"
      >
        <td>
          <img
            src="@/components/common/assets/newicon.png"
            width="25"
            height="11"
          />
        </td>
        <td>{{ item.cupet_board_head_name }}</td>
        <td>{{ item.cupet_board_title }}</td>
        <td>{{ item.cupet_user_nickname }}</td>
        <td>{{ item.cupet_board_regdate }}</td>
        <td>{{ item.cupet_board_viewcnt }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    boardData: {
      type: Array,

      default: () => [],
    },
  },

  methods: {
    goToView(cupet_board_no) {
      this.$router.push({ path: '/BoardViewMain', query: { cupet_board_no } })
    },
  },

  watch: {
    boardData(newData) {
      console.log('Board Data in BoardList updated:', newData)
    },
  },

  mounted() {
    console.log('board Data in BoardList', this.boardData)
  },
}
</script>

<style>
th {
  text-align: center;
}

td {
  text-align: center;
}

td:nth-child(2n),
th:nth-child(2n) {
  background-color: #9cd866;
  color: white;
}

td:nth-child(2n-1),
th:nth-child(2n-1) {
  background-color: white;
  color: #7e84a3;
}

/* 모든 테두리를 없앰 */
th,
td {
  border: none;
}

/* tr 요소의 아래쪽에만 테두리 추가 */
tr {
  border-bottom: 1px solid black;
}

/* 마지막 tr 요소의 아래쪽 테두리 제거 */
tr:last-child {
  border-bottom: none;
}

.board_list {
  width: 50vmax; /* 테이블의 전체적인 너비를 1000px로 설정 */
  height: 60%; /* 테이블의 전체적인 높이를 600px로 설정 */
}
</style>
