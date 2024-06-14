<template>
  <div>
    <button type="button" @click="openModal">아이디 찾기</button>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>아이디 찾기</h3>
        <form @submit.prevent="sendPasswordRecoveryEmail">
          <label for="email">이메일을 입력하세요</label>
          <input type="email" v-model="email" required />
          <button type="submit" style="margin-left: 25px">이메일 전송</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PasswordRecovery",
  data() {
    return {
      showModal: false,
      email: "",
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    sendPasswordRecoveryEmail() {
      axios
        .post("/api2/user/sendidrecoveryemail", { email: this.email })
        .then((response) => {
          const res = response.data;
          if (res === "success") {
            alert("아이디 찾기에 성공 했습니다, 메일함을 확인해주세요");
          } else {
            alert("아이디 찾기에 실패했습니다, 정확한 이메일을 확인해주세요");
          }
          this.closeModal();
        })
        .catch((error) => {
          alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
          console.error(error);
        });
    },
  },
};
</script>

<style>
/* 모달 스타일 */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
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
  width: 60%;
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
</style>
