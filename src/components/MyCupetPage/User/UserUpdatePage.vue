<template>
    <div>
        <div class="main-content">
            <img src="./../../common/assets/logo.png" alt="new" width="180" height="120" class="logo"/>
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
                    <input type="text" v-model="state.cupet_user_point" disabled>
                    <router-link to="/MyCupetPointMain">
                        <button type="button" class="charge-button-small">
                            충전
                        </button>
                    </router-link>
                </div><br/>
                <div class="form-group">
                    <label for="cupet_userpwd">비밀번호 확인: </label>
                    <input type="password" v-model="formData.password">
                </div>
                <div class="buttons">
                    <button type="button" class="savepet-button" @click="toggleEdit">
                        수정
                    </button>
                    <button type="button" class="delete-button" @click="toggleDelete">
                        탈퇴
                    </button>
                    <router-link to="/MyCupetPage">
                        <button type="button" class="cancle-button">
                            취소
                        </button>
                    </router-link>
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
    data() {
        return {
            responseData: null,
            state: reactive({
                cupet_user_id: "",
                cupet_user_nickname: "",
                cupet_user_name: "",
                cupet_user_address: "",
                cupet_user_phonenumber: "",
                cupet_user_birth: "",
                cupet_user_gender: "",
                cupet_user_point: ""
            }),
            isEditing: true,
            formData: {
                username: "",
                password: "",
            }
        };
    },
    methods: {
        redirectToken() {
            const token = localStorage.getItem("Token");
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
                    localStorage.removeItem("Token");
                    localStorage.setItem("Token", res.data);
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
            }
        },
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
                        this.formData.username = this.state.cupet_user_id;
                    })
                    .catch((error) => {
                        console.error("Error fetching user details:", error);
                    });
            } else {
                console.error("Token not found");
            }
        },
        toggleDelete() {
            const cupet_user_id = this.state.cupet_user_id;
            
            console.log("Fetching token for delete operation");
            this.getToken().then(() => {
                if(!localStorage.getItem("check")) {
                    alert("비밀번호가 틀렸습니다.");
                    return;
                }else{
                    localStorage.removeItem("check")
                }

                console.log("Deleting user with ID:", cupet_user_id);
                axios
                    .post("/api1/userDelete", { cupet_user_id })
                    .then(response => {
                        console.log("User deleted:", response.data);

                        alert("탈퇴되었습니다.");
                        this.$router.push('/Login');
                    })
                    .catch(error => {
                        console.error("Error deleting user:", error);
                        alert("탈퇴에 실패했습니다.");
                    });
            });
        },
        toggleEdit() {
            this.isEditing = !this.isEditing;
            if (!this.isEditing) {
                this.updateUser();
            }
        },
        updateUser() {
            this.getToken().then(() => {
                if(!localStorage.getItem("check")) {
                    alert("비밀번호가 틀렸습니다.");
                    return;
                }

                axios.post("/api1/userUpdate", {
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
                    localStorage.removeItem("check");
                    alert("수정되었습니다.");

                    //토큰 재발급
                    this.redirectToken();
                    this.$router.push('/MyCupetPage');
                }).catch(error => {
                    console.error("Error updating user:", error);
                    alert("수정에 실패했습니다.");
                });
            });
        },
        getToken() {
            console.log("Sending Token request to API2");
            return axios
                .post("/api2/user/login", null, { params: this.formData })
                .then((response) => {
                    this.responseData = response.data;
                    if(localStorage.getItem("check")) {
                        localStorage.setItem("Token", response.data.token);
                    } else {
                        localStorage.setItem("check", response.data.token);
                    }
                })
                .catch((error) => {
                    alert("비밀번호가 틀렸습니다.", error);
                });
        },
        
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

.cancle-button {
    margin-left: 7px;
}
</style>