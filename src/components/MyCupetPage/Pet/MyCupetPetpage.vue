<template>
    <div>
        <div class="sub-content-inner">
            <img src="./../../common/assets/logo.png" alt="new" width="180" height="120" class="logo sub-logo"/>
            <div class="pet-info">
                <div class="form-group">
                    <label for="cupet_pet_name">이름: </label>
                    <input type="text" id="cupet_pet_name" v-model="cupet_pet_name" class="small-input" />
                </div>
                <div class="form-group">
                    <label for="cupet_pet_birth">생년월일: </label>
                    <input type="date" id="cupet_pet_birth" v-model="cupet_pet_birth" class="small-input" />
                </div>
                <div class="form-group">
                    <label for="cupet_pet_type">종: </label>
                    <input type="text" id="cupet_pet_type" v-model="cupet_pet_type" class="small-input" />
                </div>
                <button type="button" class="savepet-button" @click="saveOrUpdate">저장</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import "./../../common/CommonButtonStyle.css";

export default {
    props: ['cupet_user_id', 'pet'],

    data() {
        return {
            cupet_pet_name: this.pet && this.pet.cupet_pet_name ? this.pet.cupet_pet_name : '',
            cupet_pet_birth: this.pet && this.pet.cupet_pet_birth ? this.pet.cupet_pet_birth : '',
            cupet_pet_type: this.pet && this.pet.cupet_pet_type ? this.pet.cupet_pet_type : ''
        };
    },

    methods: {
        saveOrUpdate() {
            axios.post(`/api1/petInsert`, {
                cupet_user_id: this.cupet_user_id,
                cupet_pet_name: this.cupet_pet_name,
                cupet_pet_birth: this.cupet_pet_birth,
                cupet_pet_type: this.cupet_pet_type
            }).then(response => {
                console.log("Pet inserted:", response.data);
                location.reload();
            }).catch(error => {
                console.error("Error inserting pet:", error);
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
</style>