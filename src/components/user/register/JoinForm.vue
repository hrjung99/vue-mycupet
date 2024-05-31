<template>
  <div class="join-container">
    <h2>회원가입</h2>
    <div class="form-group">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="id" required />
      <button type="button" class="check-button" @click="checkId">
        중복확인
      </button>
    </div>

    <div class="form-group">
      <label for="nickname">닉네임</label>
      <input type="text" id="nickname" v-model="nickname" required />
    </div>

    <div class="form-group">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" required />
    </div>

    <div class="form-group">
      <label for="passwordConfirm">비밀번호 확인</label>
      <input
        type="password"
        id="passwordConfirm"
        v-model="passwordConfirm"
        required
      />
    </div>

    <div class="form-group">
      <label for="name">이름</label>
      <input type="text" id="name" v-model="name" required />
    </div>

    <div class="form-group">
      <label for="postcode">우편번호</label>
      <input type="text" id="postcode" v-model="postcode" readonly required />
      <button type="button" @click="openPostcode">우편번호 찾기</button>
    </div>

    <div class="form-group">
      <label for="roadAddress">도로명 주소</label>
      <input
        type="text"
        id="roadAddress"
        v-model="roadAddress"
        readonly
        required
      />
    </div>

    <div class="form-group">
      <label for="jibunAddress">지번 주소</label>
      <input
        type="text"
        id="jibunAddress"
        v-model="jibunAddress"
        readonly
        required
      />
    </div>
    <div class="form-group">
      <label for="detailAddress">상세 주소</label>
      <input type="text" id="detailAddress" v-model="detailAddress" required />
    </div>

    <div class="form-group">
      <label for="phone">전화번호</label>
      <input type="tel" id="phone" v-model="phone" required />
    </div>

    <div class="form-group">
      <label for="birth">생년월일</label>
      <input type="date" id="birth" v-model="birth" required />
    </div>

    <div class="form-group">
      <label>성별</label>
      <input
        class="form-check"
        type="radio"
        name="radio"
        id="male"
        v-model="gender"
        value="male"
        required
      />
      <label class="form-check" for="male"> 남</label>
      <input
        class="form-check"
        type="radio"
        name="radio"
        id="female"
        v-model="gender"
        value="female"
        required
      />
      <label class="form-check" for="female"> 여 </label>
    </div>

    <br />
    <button class="register-button" type="button" @click="register">
      회원가입
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "JoinForm",

  data() {
    return {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      birth: "",
      phone: "",
      id: "",
      nickname: "",
      gender: "",
      postcode: "",
      roadAddress: "",
      jibunAddress: "",
      detailAddress: "",
      idcheck: false,
      resData: null,
    };
  },
  methods: {
    checkId() {
      axios
        .post("/api2/user/idcheck", { id: this.id })
        .then((res) => {
          this.resData = res;
          if (res.data === "no") {
            alert("중복된 아이디 입니다");
            this.id = "";
          } else if (res.data === "donot") {
            alert("올바르지 않은 아이디 형식 입니다");
            this.id = "";
          } else {
            alert("사용가능한 아이디입니다");
            this.idcheck = true;
          }
        })
        .catch((error) => {
          alert("서버 연결 실패", error);
        });
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
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 우편번호와 주소 정보를 Vue 데이터 속성에 저장
          this.postcode = data.zonecode;
          this.roadAddress = data.roadAddress;
          this.jibunAddress = data.jibunAddress;
        },
        // 팝업 스타일 설정
        width: "100%",
        height: "100%",
        maxWidth: "600px",
        maxHeight: "400px",
        popupName: "postcodePopup",
        popupKey: "postcodePopupKey",
      }).open({
        popupName: "postcodePopup",
        left: window.screen.width / 2 - 300,
        top: window.screen.height / 2 - 200,
        width: 600,
        height: 400,
        openOnPopup: true,
      });
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
}

.register-button {
  margin-top: 5px;
  margin-left: 150px;
}

.content-container {
  display: flex;
  flex: 1; /* 컨텐츠 영역이 화면 전체 높이를 채우도록 */
}
</style>
