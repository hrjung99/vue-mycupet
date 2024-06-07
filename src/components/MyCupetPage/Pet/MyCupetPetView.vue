<template>
  <div>
    <div class="sub-content-inner">
      <div class="image-container">
        <button class="image_btn" @click="triggerFileInput">
          <img
            :src="imageUrl || 'img/logo.png'"
            alt="new"
            width="180"
            height="120"
            class="logo sub-logo"
          />
        </button>
        <button v-if="imageUrl" class="delete-image-btn" @click="deleteImage">
          X
        </button>
      </div>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
      />
      <div class="pet-info">
        <div class="form-group">
          <label for="cupet_pet_name">이름: </label>
          <span v-if="!isEditing">{{ cupet_pet_name }}</span>
          <input
            type="text"
            id="cupet_pet_name"
            v-model="cupet_pet_name"
            :disabled="!isEditing"
            v-show="isEditing"
          />
        </div>
        <div class="form-group">
          <label for="cupet_pet_birth">생년월일: </label>
          <span v-if="!isEditing">{{ cupet_pet_birth }}</span>
          <input
            type="date"
            id="cupet_pet_birth"
            v-model="cupet_pet_birth"
            :disabled="!isEditing"
            v-show="isEditing"
          />
        </div>
        <div class="form-group">
          <label for="cupet_pet_type">종: </label>
          <span v-if="!isEditing">{{ cupet_pet_type }}</span>
          <input
            type="text"
            id="cupet_pet_type"
            v-model="cupet_pet_type"
            :disabled="!isEditing"
            v-show="isEditing"
          />
        </div>
        <div class="buttons">
          <button type="button" class="savepet-button" @click="toggleEdit">
            {{ isEditing ? "수정 완료" : "수정" }}
          </button>
          <span v-if="!isEditing">
            <button type="button" class="delete-button" @click="toggleDelete">
              삭제
            </button>
          </span>
          <span v-else-if="isEditing">
            <button type="button" class="cancle-button" @click="toggleCancel">취소</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "./../../common/CommonButtonStyle.css";

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
      isEditing: false,
      imageUrl: null,
    };
  },

  mounted() {
    if (this.pet && this.pet.cupet_pet_no) {
      this.loadPetImage(this.pet.cupet_pet_no);
    }
  },

  methods: {
    loadPetImage(cupet_pet_no) {
      axios
        .get(`/api1/images/pet/${cupet_pet_no}`)
        .then((response) => {
          this.imageUrl = response.data.data;
        })
        .catch((error) => {
          console.error("Error loading pet image:", error);
        });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadImage(file);
      }
    },
    deleteImage() {
      axios
        .get(`/api1/images/delete/pet?use_id=${this.pet.cupet_pet_no}`)
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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("image_type", "pet");
      formData.append("use_id", this.pet.cupet_pet_no);

      axios
        .post("/api1/images/upload/pet", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.imageUrl = response.data.data;
          alert("이미지가 업로드되었습니다.");
        })
        .catch((error) => {
          alert("이미지 업로드에 실패했습니다.");
          console.error("Error uploading image:", error);
        });
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.updatePet();
      }
    },
    updatePet() {
      axios
        .post(`/api1/petUpdate`, {
          cupet_user_id: this.cupet_user_id,
          cupet_pet_no: this.pet.cupet_pet_no,
          cupet_pet_name: this.cupet_pet_name,
          cupet_pet_birth: this.cupet_pet_birth,
          cupet_pet_type: this.cupet_pet_type,
          cupet_pet_image: this.imageUrl, // 이미지 URL 추가
        })
        .then((response) => {
          alert("수정되었습니다.");
          console.log("Pet updated:", response.data);
        })
        .catch((error) => {
          alert("수정에 실패했습니다.");
          console.error("Error updating pet:", error);
        });
    },
    toggleDelete() {
      const cupet_pet_no = this.pet.cupet_pet_no;

      axios
        .get(`/api1/petDelete?cupet_pet_no=${cupet_pet_no}`)
        .then((response) => {
          alert("삭제되었습니다.");
          console.log("Pet deleted:", response.data);
          location.reload();
        })
        .catch((error) => {
          alert("삭제에 실패했습니다.");
          console.error("Error deleting pet:", error);
        });
    },
    toggleCancel() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.sub-content-inner {
  display: flex;
  align-items: flex-start;
}

.logo.sub-logo {
  margin-left: 20px;
  width: 60px;
  height: auto;
}

.pet-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: left;
}

.form-group input {
  margin-left: 10px;
  padding: 5px;
}

label {
  width: 80px;
  margin-right: 8px;
}

.buttons {
  display: flex;
}

.savepet-button,
.delete-button,
.cancle-button {
  margin-top: 5px;
}

.delete-button {
  margin-left: 10px;
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
