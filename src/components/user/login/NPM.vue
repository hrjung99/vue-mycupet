<!-- NewPasswordModal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h3>새로운 비밀번호 입력</h3>
      <form @submit.prevent="submitNewPassword">
        <div style="padding-bottom: 10px" class="form-group">
          <label for="newPassword">새로운 비밀번호</label>
          <input type="password" v-model="newPassword" required />
        </div>
        <div style="padding-bottom: 10px" class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit">확인</button>
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
        alert("비밀번호와 확인이 일치하지 않습니다. 다시 입력해주세요.");
        return;
      }

      // 새로운 비밀번호를 서버로 보내는 로직
      axios
        .post("/api2/user/updatePassword", {
          email: this.$props.email,
          newPassword: this.newPassword,
        })
        .then((response) => {
          if (response.data === "success") {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            this.close(); // 모달 닫기
          } else {
            alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
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
/* 필요한 스타일링 추가 */
.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.form-group {
  margin-bottom: 15px;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
</style>
