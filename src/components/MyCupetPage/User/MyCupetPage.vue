<template>
  <div>
    <div class="main-content">
      <div class="image-container">
        <button class="image_btn" @click="triggerFileInput">
          <img :src="imageUrl || 'img/logo.png'" alt="new" width="180" height="120" class="logo" />
        </button>
        <button v-if="imageUrl" class="delete-image-btn" @click="deleteImage">
          X
        </button>
      </div>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
      <div class="join-container">
        <div class="page-header">
          <h2>마이페이지</h2>
          <router-link to="/UserUpdatePageMain">
            <button type="submit" class="user-update-button">
              <img src="./../../MyCupetPage/image/수정아이콘.png" alt="new" width="30" height="30" />
            </button>
          </router-link>
        </div>
        <div class="form-group" v-for="(value, key) in userFields" :key="key">
          <label :for="key">{{ key }}: {{ value }}</label>
        </div>
        <router-link v-if="state.cupet_user_principle === 'admin'" to="/UserView">
          <button type="button" class="manage-users-button">회원 관리</button>
        </router-link>
        <div class="form-group point-group">
          <label>잔여포인트: {{ state.cupet_user_point }}</label>
          <router-link to="/PayPage">
            <button type="button" class="charge-button-small">충전</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="sub-content">
      <div class="header-container">
        <h2>나의 애완동물</h2>
        <div class="pet-button-container">
          <button type="submit" class="plus-button" @click="addNewPet">
            <img src="./../../MyCupetPage/image/플러스버튼.png" alt="new" width="30" height="30" />
          </button>
        </div>
      </div>
      <div class="pet-container">
        <div v-for="(pet, index) in petList" :key="index">
          <MyCupetPetView :pet="pet" :cupet_user_id="state.cupet_user_id" />
        </div>
        <div v-for="(newPet, index) in newPetList" :key="index">
          <MyCupetPetpage :cupet_user_id="state.cupet_user_id" :pet="newPet" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyCupetPetView from "@/components/MyCupetPage/Pet/MyCupetPetView.vue"
import MyCupetPetpage from "@/components/MyCupetPage/Pet/MyCupetPetpage.vue"
import axios from "axios"
import { reactive } from "vue"

export default {
  name: "MyCupetPage",
  components: {
    MyCupetPetView,
    MyCupetPetpage,
  },
  data() {
    return {
      petList: [],
      newPetList: [],
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
        cupet_user_point: 0,
        cupet_user_principle: "",
      }),
      imageUrl: null,
    }
  },
  computed: {
    userFields() {
      return {
        아이디: this.state.cupet_user_id,
        닉네임: this.state.cupet_user_nickname,
        이름: this.state.cupet_user_name,
        우편번호: this.state.cupet_user_address,
        "도로명 주소": this.state.roadAddress,
        "지번 주소": this.state.jibunAddress,
        "상세 주소": this.state.detailAddress,
        전화번호: this.state.cupet_user_phonenumber,
        생년월일: this.state.cupet_user_birth,
        성별: this.state.cupet_user_gender,
        권한: this.state.cupet_user_principle,
      }
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadImage(file)
      }
    },
    deleteImage() {
      axios
        .get(`/api1/images/delete/user?use_id=${this.state.cupet_user_id}`)
        .then(() => {
          this.imageUrl = null
          alert("이미지가 삭제되었습니다.")
        })
        .catch((error) => {
          console.error("이미지 삭제 중 에러:", error)
          alert("이미지 삭제에 실패했습니다.")
        })
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
    addNewPet() {
      this.newPetList.push({
        cupet_pet_name: "",
        cupet_pet_birth: "",
        cupet_pet_type: "",
      })
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
            Object.assign(this.state, response.data.cupet_user_address)
            this.state.cupet_user_id = response.data.cupet_user_id
            this.state.cupet_user_nickname = response.data.cupet_user_nickname
            this.state.cupet_user_name = response.data.cupet_user_name
            this.state.cupet_user_address = response.data.cupet_user_address
            this.state.roadAddress = response.data.address.roadAddress
            this.state.jibunAddress = response.data.address.jibunAddress
            this.state.detailAddress = response.data.address.detailAddress
            this.state.cupet_user_phonenumber =
              response.data.cupet_user_phonenumber
            this.state.cupet_user_birth = response.data.cupet_user_birth
            this.state.cupet_user_gender = response.data.cupet_user_gender
            this.state.cupet_user_point = response.data.cupet_user_point
            this.state.cupet_user_principle = response.data.cupet_user_principle

            this.fetchPetData()
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
      axios
        .get(`/api1/petView?cupet_user_id=${this.state.cupet_user_id}`)
        .then((response) => {
          this.petList = response.data.petView
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error)
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
  },
}
</script>

<style scoped>
.main-content,
.sub-content {
  background-color: #f2fff2;
}

.main-content {
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

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.page-header h2 {
  margin-right: 5px;
}

.plus-button,
.user-update-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.header-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}

.pet-button-container {
  margin-right: 20px;
}

.pet-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.pet-container::-webkit-scrollbar {
  display: none;
}

.pet-container > * {
  flex: 0 0 auto;
  margin-right: 20px;
}

.join-container,
.pet-info {
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

.point-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  flex: 1;
}

.image_btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.image-container {
  position: relative;
  display: inline-block;
}

.delete-image-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  color: black;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  z-index: 1;
}
</style>
