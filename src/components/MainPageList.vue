<template>
  <div class="recent_board_list">
    <div class="form-group">
      <label class="recent_board_head">[{{ board.cupet_board_head_name }}]</label>
      <label class="recent_board_title">{{ board.cupet_board_title }}</label>
      <label class="recent_board_nickname">{{ board.cupet_user_nickname }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["board"],
}
</script>

<style scoped>
.form-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
  margin-left: 5px;
}

.recent_board_head {
  width: 30%;
  margin-right: 20px;
}

.recent_board_title {
  width: 50%;
  margin-right: 20px;
}

.recent_board_nickname {
  width: 20%;
  margin-right: auto;
}
</style>
