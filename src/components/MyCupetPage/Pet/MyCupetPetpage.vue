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
        <button type="button" class="cancle-button" @click="cancle">취소</button>
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
      imageUrl: this.pet && this.pet.cupet_pet_image ? this.pet.cupet_pet_image : null,
    };
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadImage(file);
      }
    },
    uploadImage(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("image_type", "pet");
      formData.append("use_id", this.cupet_pet_no);

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
          console.log("Pet inserted:", response.data);
          alert("저장되었습니다.");
          location.reload();
        })
        .catch((error) => {
          console.error("Error inserting pet:", error);
        });
    },
    cancle() {
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
</style>