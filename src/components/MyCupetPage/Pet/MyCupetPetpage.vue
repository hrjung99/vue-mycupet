<template>
  <div>
    <div class="sub-content-inner">
      <button class="image_btn" @click="triggerFileInput">
        <img
          :src="imageUrl || 'img/logo.png'"
          alt="new"
          width="180"
          height="120"
          class="logo sub-logo"
        />
      </button>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
      />
      <div class="pet-info">
        <div class="form-group">
          <label for="cupet_pet_name">이름: </label>
          <input
            type="text"
            id="cupet_pet_name"
            v-model="cupet_pet_name"
            class="small-input"
          />
        </div>
        <div class="form-group">
          <label for="cupet_pet_birth">생년월일: </label>
          <input
            type="date"
            id="cupet_pet_birth"
            v-model="cupet_pet_birth"
            class="small-input"
          />
        </div>
        <div class="form-group">
          <label for="cupet_pet_type">종: </label>
          <input
            type="text"
            id="cupet_pet_type"
            v-model="cupet_pet_type"
            class="small-input"
          />
        </div>
        <button type="button" class="savepet-button" @click="saveOrUpdate">
          저장
        </button>
        <button type="button" class="cancle-button" @click="cancle">
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import "./../../common/CommonButtonStyle.css"

export default {
  props: ["cupet_user_id", "pet"],

  data() {
    return {
      cupet_pet_name:
        this.pet && this.pet.cupet_pet_name ? this.pet.cupet_pet_name : "",
      cupet_pet_birth:
        this.pet && this.pet.cupet_pet_birth ? this.pet.cupet_pet_birth : "",
      cupet_pet_type:
        this.pet && this.pet.cupet_pet_type ? this.pet.cupet_pet_type : "",
      imageUrl:
        this.pet && this.pet.cupet_pet_image ? this.pet.cupet_pet_image : null,
      selectedFile: null,
    }
  },

  methods: {
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
    uploadImage(file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("image_type", "pet")

      const use_id = file.use_id ? file.use_id : this.pet.cupet_pet_no
      formData.append("use_id", use_id)

      axios
        .post("/api1/images/upload/pet", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("이미지가 업로드되었습니다.")
          location.reload()
        })
        .catch((error) => {
          console.error("이미지 업로드 중 오류 발생:", error)
          alert("이미지를 업로드하는 중 오류가 발생했습니다.")
        })
    },
    saveOrUpdate() {
      axios
        .post(`/api1/petInsert`, {
          cupet_user_id: this.cupet_user_id,
          cupet_pet_name: this.cupet_pet_name,
          cupet_pet_birth: this.cupet_pet_birth,
          cupet_pet_type: this.cupet_pet_type,
          cupet_pet_image: this.imageUrl,
        })
        .then((response) => {
          console.log("API 응답:", response.data)
          const cupet_pet_no = response.data.cupet_pet_no
          if (cupet_pet_no) {
            // 파일 입력 요소에서 파일을 가져옵니다.
            const file = this.$refs.fileInput.files[0]

            if (file) {
              file.use_id = cupet_pet_no
              this.uploadImage(file)
            }

            alert("저장되었습니다.")
            location.reload()
          } else {
            console.error("펫 번호가 응답에 포함되어 있지 않습니다.")
            alert("펫 번호가 응답에 포함되어 있지 않습니다.")
          }
        })
        .catch((error) => {
          console.error("펫 저장 중 오류 발생:", error)
          alert("펫 정보를 저장하는 중 오류가 발생했습니다.")
        })
    },
    cancle() {
      location.reload()
    },
  },
}
</script>

<style scoped>
.sub-content-inner {
  display: flex;
  align-items: flex-start;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}

.form-group button {
  margin-left: 10px;
}

label {
  width: 80px;
  margin-right: 8px;
}

.savepet-button {
  margin-bottom: 15px;
}

.small-input {
  width: 150px;
}

.cancle-button {
  margin-left: 7px;
}

.image_btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.sub-logo {
  width: 60px;
  height: auto;
}
</style>
