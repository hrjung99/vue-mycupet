<template>
    <div>
        <div class="sub-content-inner">
            <img src="./../common/assets/logo.png" alt="new" width="180" height="120" class="logo sub-logo"/>
            <div class="pet-info">
                <div class="form-group">
                    <label for="cupet_pet_name">이름: </label>
                    <span v-if="!isEditing">{{ cupet_pet_name }}</span>
                    <input type="text" id="cupet_pet_name" v-model="cupet_pet_name" :disabled="!isEditing" v-show="isEditing" />
                </div>
                <div class="form-group">
                    <label for="cupet_pet_birth">생년월일: </label>
                    <span v-if="!isEditing">{{ cupet_pet_birth }}</span>
                    <input type="text" id="cupet_pet_birth" v-model="cupet_pet_birth" :disabled="!isEditing" v-show="isEditing" />
                </div>
                <div class="form-group">
                    <label for="cupet_pet_type">종: </label>
                    <span v-if="!isEditing">{{ cupet_pet_type }}</span>
                    <input type="text" id="cupet_pet_type" v-model="cupet_pet_type" :disabled="!isEditing" v-show="isEditing" />
                </div>
                <button type="button" class="savepet-button" @click="toggleEdit">
                    {{ isEditing ? '수정 완료' : '수정' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import "./../common/CommonButtonStyle.css";

export default {
    props: ['cupet_user_id', 'pet'],

    data() {
        return {
            cupet_pet_name: this.pet && this.pet.cupet_pet_name ? this.pet.cupet_pet_name : '',
            cupet_pet_birth: this.pet && this.pet.cupet_pet_birth ? this.pet.cupet_pet_birth : '',
            cupet_pet_type: this.pet && this.pet.cupet_pet_type ? this.pet.cupet_pet_type : '',
            isEditing: false
        };
    },

    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing;
            if (!this.isEditing) {
                this.updatePet();
            }
        },
        updatePet() {
            axios.post(`/api1/petUpdate`, {
                cupet_user_id: this.cupet_user_id,
                cupet_pet_no: this.pet.cupet_pet_no,
                cupet_pet_name: this.cupet_pet_name,
                cupet_pet_birth: this.cupet_pet_birth,
                cupet_pet_type: this.cupet_pet_type
            }).then(response => {
                console.log("Pet updated:", response.data);
                // 필요한 경우 애완동물 목록을 다시 불러오는 등의 작업을 수행할 수 있습니다.
            }).catch(error => {
                console.error("Error updating pet:", error);
            });
        }
    }
}
</script>

<style scoped>
.sub-content-inner {
    display: flex;
    align-items: flex-start;
}

.logo.sub-logo {
    margin-left: 20px;
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

.savepet-button {
    margin-top: 10px;
}
</style>