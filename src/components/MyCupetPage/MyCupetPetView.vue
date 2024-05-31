<template>
    <div>
        <div class="sub-content-inner">
            <img src="./../common/assets/logo.png" alt="new" width="180" height="120" class="logo sub-logo"/>
            <div class="pet-info">
                <div class="form-group">
                    <template v-if="isEditing">
                        <label for="cupet_pet_name">이름: </label>
                        <input type="text" id="cupet_pet_name" v-model="cupet_pet_name" />
                    </template>
                    <template v-else>
                        <label for="cupet_pet_name">이름: {{ cupet_pet_name }}</label>
                    </template>
                </div>
                <div class="form-group">
                    <template v-if="isEditing">
                        <label for="cupet_pet_birth">생년월일: </label>
                        <input type="date" id="cupet_pet_birth" v-model="cupet_pet_birth" />
                    </template>
                    <template v-else>
                        <label for="cupet_pet_birth">생년월일: {{ cupet_pet_birth }}</label>
                    </template>
                </div>
                <div class="form-group">
                    <template v-if="isEditing">
                        <label for="cupet_pet_type">종: </label>
                        <input type="text" id="cupet_pet_type" v-model="cupet_pet_type" />
                    </template>
                    <template v-else>
                        <label for="cupet_pet_type">종: {{ cupet_pet_type }}</label>
                    </template>
                </div>
                <button type="button" class="savepet-button" @click="toggleEditMode">
                    {{ isEditing ? '저장' : '수정' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
        toggleEditMode() {
            this.isEditing = !this.isEditing;
        },
        saveOrUpdate() {
            if (this.isEditing) {
                // 여기서 수정된 데이터를 저장하는 로직을 추가할 수 있습니다.
                this.isEditing = false;
            } else {
                this.isEditing = true;

                axios.post(`/api1/petInsert`, {
                    cupet_user_id: this.cupet_user_id,
                    cupet_pet_name: this.cupet_pet_name,
                    cupet_pet_birth: this.cupet_pet_birth,
                    cupet_pet_type: this.cupet_pet_type
                }).then(response => {
                    console.log("Pet inserted:", response.data);
                    // 애완동물 목록을 다시 불러오는 등의 작업을 할 수 있습니다.
                }).catch(error => {
                    console.error("Error inserting pet:", error);
                });
            }
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
    margin-left: 20px;
    margin-bottom: 5px;
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
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
