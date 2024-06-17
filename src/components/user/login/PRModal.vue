<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h3>비밀번호 찾기</h3>
      <form @submit.prevent="sendPasswordRecoveryEmail">
        <div style="padding-bottom: 10px" class="form-group">
          <label for="id">아이디를 입력하세요</label>
          <input type="text" v-model="localId" required />
        </div>
        <div style="padding-bottom: 10px" class="form-group">
          <label for="email">이메일을 입력하세요</label>
          <input type="email" v-model="localEmail" required />
        </div>
        <button type="submit">전송</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "PasswordRecoveryModal",
  data() {
    return {
      localId: "",
      localEmail: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    sendPasswordRecoveryEmail() {
      this.$emit("passwordRecovery", {
        email: this.localEmail,
        id: this.localId,
      });
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일링 추가 */
</style>
