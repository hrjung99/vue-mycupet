<template>
  <form class="join-container" @submit.prevent="register">
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
    <button class="register-button" type="submit">회원가입</button>
  </form>
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
      lanlatlocate: {
        x: "",
        y: "",
      },
      idcheck: false,
      resData: null,
    };
  },
  computed: {
    isPasswordMatch() {
      return this.password === this.passwordConfirm;
    },
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
            alert("올바르지 않은 아이디 형식 입니다 (5글자 이상)");
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
      if (!this.idcheck) {
        alert("ID 중복 체크를 확인해주세요");
        return;
      }
      if (!this.isPasswordMatch) {
        alert("비밀번호가 일치하지 않습니다.");
        this.password = "";
        this.passwordConfirm = "";
        return;
      }

      alert("회원가입 정보가 유효합니다.");

      const formData = {
        id: this.id,
        name: this.name,
        password: this.password,
        birth: this.birth,
        phone: this.phone,
        nickname: this.nickname,
        gender: this.gender,
        postcode: this.postcode,
        roadAddress: this.roadAddress,
        jibunAddress: this.jibunAddress,
        detailAddress: this.detailAddress,
        locateX: this.lanlatlocate.x,
        locateY: this.lanlatlocate.y,
      };

      axios
        .post("/api2/user/register", formData)
        .then((response) => {
          if (response.data.result === "success") {
            alert("회원가입이 완료되었습니다.");
            this.$router.push("/Login");
          } else {
            alert("회원가입에 실패했습니다.");
          }
        })
        .catch((error) => {
          alert("서버 연결 실패: " + error.message);
        });
    },

    getCoordinates(address) {
      const apiKey = "6c6926ac09f27d3575acd4aee7934548"; // 발급받은 API 키 사용
      const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`;
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        })
        .then((response) => {
          if (response.data.documents.length > 0) {
            const { x, y } = response.data.documents[0].address;
            this.longitude = x;
            this.latitude = y;
            this.lanlatlocate.x = this.longitude;
            this.lanlatlocate.y = this.latitude;
          }
        })
        .catch((error) => {
          console.error("좌표 검색 실패:", error);
        });
    },

    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 우편번호와 주소 정보를 Vue 데이터 속성에 저장
          this.postcode = data.zonecode;
          this.roadAddress = data.roadAddress;
          this.jibunAddress = data.jibunAddress;
          if (this.roadAddress != "") {
            this.getCoordinates(this.roadAddress);
          } else {
            this.getCoordinates(this.jibunAddress);
          }
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
</style>
