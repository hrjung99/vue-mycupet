<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h3>새로운 비밀번호 설정</h3>
      <form @submit.prevent="submitNewPassword">
        <div style="padding-bottom: 10px" class="form-group">
          <label for="newPassword">새로운 비밀번호</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <div style="padding-bottom: 10px" class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input type="password" v-model="confirmPassword" required />
          <span v-if="newPassword !== confirmPassword" class="error-message"
            >비밀번호가 일치하지 않습니다.</span
          >
        </div>
        <button type="submit" :disabled="newPassword !== confirmPassword">
          저장
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewPasswordModal",
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitNewPassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        return;
      }

      axios
        .post("/api2/user/resetPassword", {
          email: this.$props.email,
          newPassword: this.newPassword,
        })
        .then((response) => {
          if (response.data === "success") {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            location.reload();
            this.$emit("passwordResetSuccess");
            this.close();
          } else {
            alert("비밀번호 변경 에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
          console.error(error);
        });
    },
  },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
}
</style>
