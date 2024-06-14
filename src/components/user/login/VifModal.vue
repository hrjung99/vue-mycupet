<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h3>이메일 인증</h3>
      <form @submit.prevent="submitVerificationKey">
        <div style="padding-bottom: 10px" class="form-group">
          <label for="verificationKey">인증 키를 입력하세요</label>
          <input type="text" v-model="verificationKey" required />
        </div>
        <button type="submit">확인</button>
      </form>
    </div>
  </div>

  <!-- 새로운 비밀번호 입력 모달 -->
  <NewPasswordModal
    v-if="showNewPasswordModal"
    @close="closeNewPasswordModal"
    :email="email"
  />
</template>

<script>
import NewPasswordModal from "./NPM.vue";
import axios from "axios";

export default {
  name: "VerificationModal",
  data() {
    return {
      verificationKey: "",
      showNewPasswordModal: false,
    };
  },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitVerificationKey() {
      axios
        .post("/api2/user/verifyCode", {
          email: this.email,
          code: this.verificationKey,
        })
        .then((response) => {
          if (response.data === "success") {
            alert("이메일 인증이 성공적으로 완료되었습니다.");

            this.showNewPasswordModal = true; // 새로운 비밀번호 입력 모달을 보이게 설정
          } else {
            alert("이메일 인증에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          alert("이메일 인증에 실패했습니다. 다시 시도해주세요.");
          console.error(error);
        });
    },
    closeNewPasswordModal() {
      this.showNewPasswordModal = false;
    },
  },
  components: {
    NewPasswordModal,
  },
};
</script>


<style scoped>
/* 필요한 스타일링 추가 */
</style>
