<template>
  <div>
    <!-- 비밀번호 찾기 버튼 -->
    <button type="button" @click="openModal">비밀번호 찾기</button>

    <!-- 비밀번호 찾기 모달 -->
    <PasswordRecoveryModal
      v-if="showModal"
      @close="closeModal"
      @passwordRecovery="handlePasswordRecovery"
    />

    <!-- 이메일 인증 모달 -->
    <VerificationModal
      v-if="showVerificationModal"
      @close="closeVerificationModal"
      @submitVerificationKey="submitVerificationKey"
      :email="email"
    />
  </div>
</template>


<script>
import PasswordRecoveryModal from "./PRModal.vue";
import VerificationModal from "./VifModal.vue";
import axios from "axios";

export default {
  name: "PasswordRecovery",
  components: {
    PasswordRecoveryModal,
    VerificationModal,
  },
  data() {
    return {
      showModal: false,
      showVerificationModal: false,
      email: "",
      id: "",
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closeVerificationModal() {
      this.showVerificationModal = false;
    },
    handlePasswordRecovery({ email, id }) {
      this.email = email;
      this.id = id;
      axios
        .post("/api2/user/sendpasswordrecoveryemail", {
          email: this.email,
          id: this.id,
        })
        .then((response) => {
          if (response.data === "success") {
            alert("이메일로 인증번호를 발송했습니다. 확인해주세요");
            this.closeModal(); // 비밀번호 찾기 모달 닫기
            this.showVerificationModal = true; // 인증 모달 열기
          } else if (response.data === "noid") {
            alert("입력한 아이디가 존재하지 않습니다.");
          } else if (response.data === "nomatchemail") {
            alert("입력한 이메일과 일치하는 아이디가 없습니다.");
          } else {
            alert("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          alert("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
          console.error(error);
        });
    },
    submitVerificationKey(verificationKey) {
      // 인증 키 처리 로직
      console.log("Submitted verification key:", verificationKey);
      // 여기에 추가적인 처리 로직을 구현할 수 있습니다.
    },
  },
};
</script>

<style>
/* 필요한 스타일링 추가 */
</style>
