<template>
    <div>
        <div class="main-content">
            <!-- 유저 정보 섹션 -->
            <img src="./../common/assets/logo.png" alt="new" width="180" height="120" class="logo"/>
            <div class="join-container">
                <h2>마이페이지</h2>
                <!-- 유저 정보 표시 -->
                <div class="form-group">
                    <label for="id">아이디: {{ state.cupet_user_id }}</label>
                </div>
                <div class="form-group">
                    <label for="nickname">닉네임: {{ state.cupet_user_nickname }}</label>
                </div>
                <div class="form-group">
                    <label for="name">이름: {{ state.cupet_user_name }}</label>
                </div>
                <div class="form-group">
                    <label for="address">주소: {{ state.cupet_user_address }}</label>
                </div>
                <div class="form-group">
                    <label for="phone">전화번호: {{ state.cupet_user_phonenumber }}</label>
                </div>
                <div class="form-group">
                    <label for="birth">생년월일: {{ state.cupet_user_birth }}</label>
                </div>
                <div class="form-group">
                    <label>성별: {{ state.cupet_user_gender }}</label>
                </div>
                <div class="form-group point-group">
                    <label>잔여포인트: {{ state.cupet_user_point }}</label>
                    <router-link to="/MyCupetPointMain">
                        <button type="button" class="charge-button-small">
                            충전
                        </button>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="sub-content">
            <div class="header-container">
                <h2>나의 애완동물</h2>
                <div class="pet-button-container">
                    <button type="submit" class="plus-button" @click="addNewPet">
                        <img src="./../MyCupetPage/image/플러스버튼.png" alt="new" width="30" height="30"/>
                    </button>
                </div>
            </div>
            <div class="pet-container">
                <!-- DB에서 가져온 애완동물 데이터를 보여줌 -->
                <div v-for="(pet, index) in petList" :key="index">
                    <MyCupetPetView :pet="pet" :cupet_user_id="state.cupet_user_id" />
                </div>
                <!-- 새 애완동물 추가 폼을 보여줌 -->
                <div v-for="(newPet, index) in newPetList" :key="index">
                    <MyCupetPetpage :cupet_user_id="state.cupet_user_id" :pet="newPet" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyCupetPetView from "@/components/MyCupetPage/MyCupetPetView.vue";
import MyCupetPetpage from "@/components/MyCupetPage/MyCupetPetpage.vue";
import axios from "axios";
import { reactive } from "vue";

export default {
    name: "MyCupetPage",
    components: {
        MyCupetPetView,
        MyCupetPetpage,
    },
    data() {
        return {
            petList: [], // 애완동물 목록을 담을 배열
            newPetList: [], // 새로 추가된 애완동물 목록을 담을 배열
            state: reactive({}) // state를 반응형으로 변경
        };
    },
    methods: {
        addNewPet() {
            this.newPetList.push({
                cupet_pet_name: '',
                cupet_pet_birth: '',
                cupet_pet_type: ''
            });
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
                        this.fetchPetData(); // 유저 데이터 받아온 후 펫 데이터도 가져옴
                    })
                    .catch((error) => {
                        console.error("Error fetching user details:", error);
                    });
            } else {
                console.error("Token not found");
            }
        },
        fetchPetData() {
            axios
                .get(`/api1/petView?cupet_user_id=${this.state.cupet_user_id}`)
                .then(response => {
                    this.petList = response.data.petView;
                })
                .catch(error => {
                    console.error("Error fetching pet data:", error);
                });
        }
    },
    mounted() {
        this.fetchUserData();
    }
};
</script>

<style scoped>
.main-content, .sub-content {
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
}

.header-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
}

.plus-button {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.pet-button-container {
    margin-right: 20px;
}

.pet-container {
    display: flex;
    flex-wrap: nowrap; /* 수평으로만 요소를 배치 */
    overflow-x: auto; /* 요소가 넘칠 경우 가로 스크롤 표시 */
}

.pet-container::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
}

.pet-container > * {
    flex: 0 0 auto; /* 자식 요소가 크기를 자동 조정하지 않고 고정 크기로 설정 */
    margin-right: 20px; /* 요소 간 간격 조절 */
}

.join-container, .pet-info {
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
    gap: 10px; /* 라벨과 버튼 사이의 간격을 설정 */
}

input {
    flex: 1;
}
</style>