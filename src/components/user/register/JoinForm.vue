<template>
  <form class="join-container" @submit.prevent="register">
    <div class="image-container">
      <button class="image_btn" @click="triggerFileInput">
        <img
          :src="imageUrl || 'img/logo.png'"
          alt="new"
          width="180"
          height="120"
          class="logo"
        />
      </button>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
      />
    </div>
    <div class="join-page">
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
        <input
          type="text"
          id="detailAddress"
          v-model="detailAddress"
          required
        />
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
          value="M"
          required
        />
        <label class="form-check" for="male"> 남</label>
        <input
          class="form-check"
          type="radio"
          name="radio"
          id="female"
          v-model="gender"
          value="F"
          required
        />
        <label class="form-check" for="female"> 여 </label>
      </div>

      <div class="form-group">
        <button class="register-button" type="submit">회원가입</button>
      </div>
    </div>
    <br />
  </form>
</template>

<script>
import axios from "axios"

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
      selectedFile: null,
      imageUrl: null,
    }
  },
  computed: {
    isPasswordMatch() {
      return this.password === this.passwordConfirm
    },
  },
  methods: {
    checkId() {
      axios
        .post("/api2/user/idcheck", { id: this.id })
        .then((res) => {
          this.resData = res
          if (res.data === "no") {
            alert("중복된 아이디 입니다")
            this.id = ""
          } else if (res.data === "donot") {
            alert("올바르지 않은 아이디 형식 입니다 (5글자 이상)")
            this.id = ""
          } else {
            alert("사용가능한 아이디입니다")
            this.idcheck = true
          }
        })
        .catch((error) => {
          alert("서버 연결 실패", error)
        })
    },

    register() {
      if (!this.idcheck) {
        alert("ID 중복 체크를 확인해주세요")
        return
      }
      if (!this.isPasswordMatch) {
        alert("비밀번호가 일치하지 않습니다.")
        this.password = ""
        this.passwordConfirm = ""
        return
      }

      alert("회원가입 정보가 유효합니다.")

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
      }

      axios
        .post("/api2/user/register", formData)
        .then((response) => {
          if (response.data.result === "success") {
            const cupet_user_id = response.data.cupet_user_id
            if (cupet_user_id && this.selectedFile) {
              this.uploadImage(cupet_user_id, this.selectedFile)
            }
            alert("회원가입이 완료되었습니다.")
            this.$router.push("/Login")
          } else {
            alert("회원가입에 실패했습니다.")
          }
        })
        .catch((error) => {
          alert("서버 연결 실패: " + error.message)
        })
    },

    getCoordinates(address) {
      const apiKey = "6c6926ac09f27d3575acd4aee7934548" // 발급받은 API 키 사용
      const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        })
        .then((response) => {
          if (response.data.documents.length > 0) {
            const { x, y } = response.data.documents[0].address
            this.longitude = x
            this.latitude = y
            this.lanlatlocate.x = this.longitude
            this.lanlatlocate.y = this.latitude
          }
        })
        .catch((error) => {
          console.error("좌표 검색 실패:", error)
        })
    },

    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 우편번호와 주소 정보를 Vue 데이터 속성에 저장
          this.postcode = data.zonecode
          this.roadAddress = data.roadAddress
          this.jibunAddress = data.jibunAddress
          if (this.roadAddress != "") {
            this.getCoordinates(this.roadAddress)
          } else {
            this.getCoordinates(this.jibunAddress)
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
      })
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.imageUrl = URL.createObjectURL(file)
      }
    },

    uploadImage(userId, file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("image_type", "user")

      const use_id = userId
      formData.append("use_id", use_id)

      axios
        .post("/api1/images/upload/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.imageUrl = response.data.data
          alert("이미지가 업로드되었습니다.")
        })
        .catch((error) => {
          alert("이미지 업로드에 실패했습니다.")
          console.error("이미지 업로드 중 에러:", error)
        })
    },
  },
}
</script>

<style scoped>
.logo {
  margin-left: 20px;
}

.join-container {
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  min-width: 500px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  margin-top: 13px;
  margin-left: 370px;
  align-self: center;
}

.image-container {
  margin-right: 10px;
}

.image_btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.logo {
  width: 180px;
  height: auto;
}

.join-page {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 5px;
}
</style>
