<template>
  <div>
    <div class="main-content">
      <div class="logo-container">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="User Image"
          class="logo"
          @click="triggerFileInput"
        />
        <div v-else class="logo-placeholder" @click="triggerFileInput">
          <img
            src="./../../common/assets/logo.png"
            alt="new"
            class="logo"
            @click="triggerFileInput"
          />
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFileChange"
      />
      <div class="join-container">
        <h2>마이페이지</h2>
        <div class="form-group">
          <label for="cupet_user_id">아이디: </label>
          <input type="text" v-model="state.cupet_user_id" disabled />
        </div>
        <div class="form-group">
          <label for="cupet_user_nickname">닉네임: </label>
          <input type="text" v-model="state.cupet_user_nickname" />
        </div>
        <div class="form-group">
          <label for="cupet_user_name">이름: </label>
          <input type="text" v-model="state.cupet_user_name" />
        </div>
        <div class="form-group">
          <label for="cupet_user_address">우편번호: </label>
          <input type="text" v-model="state.cupet_user_address" />
          <button type="button" @click="openPostcode">우편번호 찾기</button>
        </div>
        <div class="form-group">
          <label for="roadAddress">도로명 주소: </label>
          <input type="text" v-model="state.roadAddress" />
        </div>
        <div class="form-group">
          <label for="jibunAddress">지번 주소: </label>
          <input type="text" v-model="state.jibunAddress" />
        </div>
        <div class="form-group">
          <label for="detailAddress">상세 주소: </label>
          <input type="text" v-model="state.detailAddress" />
        </div>
        <div class="form-group">
          <label for="cupet_user_phonenumber">전화번호: </label>
          <input type="text" v-model="state.cupet_user_phonenumber" />
        </div>
        <div class="form-group">
          <label for="cupet_user_birth">생년월일: </label>
          <input type="date" v-model="state.cupet_user_birth" />
        </div>
        <div class="form-group">
          <label>성별: </label>
          <input
            class="form-check"
            type="radio"
            name="radio"
            id="male"
            v-model="state.cupet_user_gender"
            value="M"
            required
          />
          <label class="form-check" for="male"> 남</label>
          <input
            class="form-check"
            type="radio"
            name="radio"
            id="female"
            v-model="state.cupet_user_gender"
            value="F"
            required
          />
          <label class="form-check" for="female"> 여 </label>
        </div>
        <div class="form-group point-group">
          <label>잔여포인트: </label>
          <input type="text" v-model="state.cupet_user_point" disabled />
          <router-link to="/PayPage">
            <button type="button" class="charge-button-small">충전</button>
          </router-link>
        </div>
        <br />
        <div class="form-group">
          <label for="cupet_userpwd">비밀번호 확인: </label>
          <input type="password" v-model="formData.password" />
        </div>
        <div class="buttons">
          <button type="button" class="savepet-button" @click="toggleEdit">
            수정
          </button>
          <button type="button" class="delete-button" @click="toggleDelete">
            탈퇴
          </button>
          <router-link to="/MyCupetPage">
            <button type="button" class="cancle-button">취소</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { reactive } from "vue"

export default {
  name: "UserUpdatePage",
  data() {
    return {
      responseData: null,
      state: reactive({
        cupet_user_id: "",
        cupet_user_nickname: "",
        cupet_user_name: "",
        cupet_user_address: "",
        roadAddress: "",
        jibunAddress: "",
        detailAddress: "",
        cupet_user_phonenumber: "",
        cupet_user_birth: "",
        cupet_user_gender: "",
        cupet_user_point: "",
      }),
      isEditing: true,
      formData: {
        username: "",
        password: "",
      },
      imageUrl: null,
    }
  },
  methods: {
    redirectToken() {
      const token = localStorage.getItem("Token")
      if (token) {
        axios
          .post(
            "/api2/user/redirectToken",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            localStorage.removeItem("Token")
            localStorage.setItem("Token", res.data)
          })
          .catch((error) => {
            console.error("Error fetching user details:", error)
          })
      }
    },
    fetchUserData() {
      const token = localStorage.getItem("Token")

      if (token) {
        axios
          .post(
            "/api1/userView",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Data received:", response.data)
            Object.assign(this.state, response.data)
            this.formData.username = this.state.cupet_user_id

            this.state.roadAddress = response.data.address.roadAddress
            this.state.jibunAddress = response.data.address.jibunAddress
            this.state.detailAddress = response.data.address.detailAddress

            this.fetchUserImage(this.state.cupet_user_id)
          })
          .catch((error) => {
            console.error("Error fetching user details:", error)
          })
      } else {
        console.error("Token not found")
      }
    },
    fetchPetData() {
      return axios
        .get(`/api1/petView?cupet_user_id=${this.state.cupet_user_id}`)
        .then((response) => {
          return response.data.petView
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error)
          return []
        })
    },
    deletePetImages(cupet_pet_no) {
      return axios
        .get(`/api1/images/delete/pet?use_id=${cupet_pet_no}`)
        .then(() => {
          console.log("펫 이미지 삭제됨")
        })
        .catch((error) => {
          console.error("펫 이미지 삭제 중 에러:", error)
          alert("펫 이미지 삭제에 실패했습니다.")
        })
    },
    deleteUserImage() {
      axios
        .get(`/api1/images/delete/user?use_id=${this.state.cupet_user_id}`)
        .then(() => {
          this.imageUrl = null
          console.log("사용자 이미지 삭제됨")
        })
        .catch((error) => {
          console.error("사용자 이미지 삭제 중 에러:", error)
          alert("사용자 이미지 삭제에 실패했습니다.")
        })
    },
    toggleDelete() {
      const cupet_user_id = this.state.cupet_user_id

      console.log("삭제를 위한 토큰 가져오기")
      this.getToken().then(() => {
        if (!localStorage.getItem("check")) {
          alert("비밀번호가 틀렸습니다.")
          return
        } else {
          localStorage.removeItem("check")
        }

        console.log("ID가", cupet_user_id, "인 사용자 및 해당 펫 삭제 중")
        this.fetchPetData().then((petList) => {
          petList.forEach((pet) => {
            this.deletePetImages(pet.cupet_pet_no)
          })
        })
        if (!this.imageUrl) {
          this.deleteUserImage()
        }

        axios
          .post("/api1/userDelete", { cupet_user_id })
          .then((response) => {
            console.log("사용자 삭제됨:", response.data)
            alert("탈퇴되었습니다.")
            this.$router.push("/Login")
          })
          .catch((error) => {
            console.error("사용자 삭제 중 오류 발생:", error)
            alert("사용자 삭제에 실패했습니다.")
          })
      })
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
      if (!this.isEditing) {
        this.updateUser()
      }
    },
    updateUser() {
      this.getToken().then(() => {
        if (!localStorage.getItem("check")) {
          alert("비밀번호가 틀렸습니다.")
          return
        }

        const userUpdateRequest = {
          user: {
            cupet_user_id: this.state.cupet_user_id,
            cupet_user_name: this.state.cupet_user_name,
            cupet_user_nickname: this.state.cupet_user_nickname,
            cupet_user_address: this.state.cupet_user_address,
            cupet_user_phonenumber: this.state.cupet_user_phonenumber,
            cupet_user_birth: this.state.cupet_user_birth,
            cupet_user_gender: this.state.cupet_user_gender,
            cupet_user_point: this.state.cupet_user_point,
          },
          address: {
            cupet_user_id: this.state.cupet_user_id,
            roadAddress: this.state.roadAddress,
            jibunAddress: this.state.jibunAddress,
            detailAddress: this.state.detailAddress,
          },
        }

        axios
          .post("/api1/userUpdate", userUpdateRequest)
          .then((response) => {
            console.log("정보 수정 완료:", response.data)
            localStorage.removeItem("check")
            alert("수정되었습니다.")

            //토큰 재발급
            this.redirectToken()
            this.$router.push("/MyCupetPage")
          })
          .catch((error) => {
            console.error("정보 수정 중 오류 발생:", error)
            alert("수정에 실패했습니다.")
          })
      })
    },
    getToken() {
      console.log("Sending Token request to API2")
      return axios
        .post("/api2/user/login", null, { params: this.formData })
        .then((response) => {
          this.responseData = response.data
          if (localStorage.getItem("check")) {
            localStorage.setItem("Token", response.data.token)
          } else {
            localStorage.setItem("check", response.data.token)
          }
        })
        .catch((error) => {
          alert("비밀번호가 틀렸습니다.", error)
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
          this.state.cupet_user_address = data.zonecode
          this.state.roadAddress = data.roadAddress
          this.state.jibunAddress = data.jibunAddress
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
        this.uploadImage(file)
      }
    },
    uploadImage(file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("use_id", this.state.cupet_user_id)

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
    fetchUserImage(cupet_user_id) {
      axios
        .get(`/api1/images/user/${cupet_user_id}`)
        .then((response) => {
          if (response.data.data.length > 0) {
            this.imageUrl = response.data.data
          } else {
            console.info("No images found for this user.")
          }
        })
        .catch((error) => {
          console.info("Error fetching user image:", error)
        })
    },
  },
  mounted() {
    this.fetchUserData()
    this.fetchUserImage(this.state.cupet_user_id)
  },
}
</script>

<style scoped>
.main-content {
  background-color: #f2fff2;
  margin-top: 30px;
  display: flex;
  align-items: flex-start;
  min-width: 500px;
}

.logo {
  margin-left: 20px;
  width: 180px;
  height: auto;
}

.header-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}

.join-container {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 5px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}

input {
  flex: 1;
}

.delete-button {
  margin-left: 7px;
}

.cancle-button {
  margin-left: 7px;
}

.logo-container {
  cursor: pointer;
}
</style>
