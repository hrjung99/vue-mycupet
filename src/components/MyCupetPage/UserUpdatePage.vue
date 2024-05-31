<template>
    <div>
        <div class="main-content">
            <!-- 유저 정보 섹션 -->
            <img src="./../common/assets/logo.png" alt="new" width="180" height="120" class="logo"/>
            <div class="join-container">
                <h2>마이페이지</h2>
                <div class="form-group">
                    <label for="cupet_user_id">아이디: </label>
                    <input type="text" v-model="state.cupet_user_id" disabled>
                </div>
                <div class="form-group">
                    <label for="cupet_user_nickname">닉네임: </label>
                    <input type="text" v-model="state.cupet_user_nickname">
                </div>
                <div class="form-group">
                    <label for="cupet_user_name">이름: </label>
                    <input type="text" v-model="state.cupet_user_name">
                </div>
                <div class="form-group">
                    <label for="cupet_user_address">주소: </label>
                    <input type="text" v-model="state.cupet_user_address">
                </div>
                <div class="form-group">
                    <label for="cupet_user_phonenumber">전화번호: </label>
                    <input type="text" v-model="state.cupet_user_phonenumber">
                </div>
                <div class="form-group">
                    <label for="cupet_user_birth">생년월일: </label>
                    <input type="date" v-model="state.cupet_user_birth">
                </div>
                <div class="form-group">
                    <label>성별: </label>
                    <input type="text" v-model="state.cupet_user_gender">
                </div>
                <div class="form-group point-group">
                    <label>잔여포인트: </label>
                    <input type="text" v-model="state.cupet_user_point" disabled>
                    <router-link to="/MyCupetPointMain">
                        <button type="button" class="charge-button-small">
                            충전
                        </button>
                    </router-link>
                </div>
                <div class="buttons">
                    <button type="button" class="savepet-button" @click="toggleEdit">
                        {{ isEditing ? '수정 완료' : '수정' }}
                    </button>
                    <button type="button" class="delete-button" @click="toggleDelete">
                        탈퇴
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
    name: "UserUpdatePage",
    components: {
    },
    data() {
        return {
            state: reactive({}) // state를 반응형으로 변경
        };
    },
    methods: {
        fetchUserData() {
            const token = localStorage.getItem("Token");

            if (token) {
                axios
                    .post("/api1/userView", {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log("Data received:", response.data);
                        Object.assign(this.state, response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching user details:", error);
                    });
            } else {
                console.error("Token not found");
            }
        },
        toggleDelete() {
            const cupet_user_id = this.user.cupet_user_id;

            axios
                .get(`/api1/userDelete?cupet_user_id=${cupet_user_id}`) // GET 요청 수정
                .then(response => {
                    console.log("User deleted:", response.data);
                    this.$router.push('/MyCupetPage');
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                });
        },
        toggleEdit() {
            this.isEditing = !this.isEditing;
            if (!this.isEditing) {
                this.updateUser();
            }
        },
        updateUser() {
            axios.post(`/api1/userUpdate`, {
                cupet_user_id: this.state.cupet_user_id,
                cupet_user_name: this.state.cupet_user_name,
                cupet_user_nickname: this.state.cupet_user_nickname,
                cupet_user_address: this.state.cupet_user_address,
                cupet_user_gender: this.state.cupet_user_gender,
                cupet_user_phonenumber: this.state.cupet_user_phonenumber,
                cupet_user_birth: this.state.cupet_user_birth,
                cupet_user_point: this.state.cupet_user_point
            }).then(response => {
                console.log("User updated:", response.data);
                this.$router.push('/MyCupetPage');
            }).catch(error => {
                console.error("Error updating user:", error);
            });
        }
    },
    mounted() {
        this.fetchUserData();
    }
};
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
</style>