<template>
  <div>
    <CommonHeader />
    <div class="main-content">
      <div class="content-container">
        <CommonSideBar2 />
        <img
          src="./../common/assets/logo.png"
          alt="new"
          width="180"
          height="120"
          class="logo"
        />
        <div class="join-container">
          <h2>회원가입</h2>
          <div class="form-group">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="id" />
            <button type="button" class="check-button" @click="checkId">
              중복확인
            </button>
          </div>

          <div class="form-group">
            <label for="nickname">닉네임</label>
            <input type="text" id="nickname" v-model="nickname" />
          </div>

          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="password" />
          </div>

          <div class="form-group">
            <label for="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              v-model="passwordConfirm"
            />
          </div>

          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="name" />
          </div>

          <div class="form-group">
            <label for="add">주소</label>
            <input type="text" id="add" v-model="add" />
          </div>

          <div class="form-group">
            <label for="phone">전화번호</label>
            <input type="tel" id="phone" v-model="phone" />
          </div>

          <div class="form-group">
            <label for="birth">생년월일</label>
            <input type="date" id="birth" v-model="birth" />
          </div>

          <div class="form-group">
            <label>성별</label>
            <input
              class="form-check"
              type="radio"
              name="radio"
              id="male"
              v-model="gender"
            />
            <label class="form-check" for="male"> 남</label>
            <input
              class="form-check"
              type="radio"
              name="radio"
              id="female"
              v-model="gender"
            />
            <label class="form-check" for="female"> 여 </label>
          </div>

          <br />
          <button class="register-button" type="button" @click="register">
            회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter />
</template>
  
  
  
  <script>
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar2 from "@/components/common/CommonSideBar-2.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";

export default {
  name: "JoinForm",
  components: {
    CommonHeader,
    CommonFooter,
    CommonSideBar2,
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      birth: "",
      phone: "",
    };
  },
  methods: {
    checkId() {
      // 이메일 중복 확인 로직 추가
      console.log("이메일 중복 확인:", this.email);
    },
    register() {
      // 회원가입 로직 추가
      if (this.password !== this.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      console.log(
        "회원가입 정보:",
        this.id,
        this.name,
        this.password,
        this.birth,
        this.phone
      );
    },
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
  align-items: flex-start;
  background-color: #f2fff2;
}

.logo {
  margin-left: 20px;
}

.join-container {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}

label {
  width: 120px;
  margin-right: 10px;
}

input {
  flex: 1;
}

button {
  margin-left: 10px;
  border: none;
  background-color: #34a853;
  color: white;
}

.register-button {
  margin-top: 5px;
  margin-left: 150px;
  background-color: #34a853;
  color: white;
  border: none;
  width: 100px;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.register-button:hover {
  background-color: #85c14a;
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}
</style>