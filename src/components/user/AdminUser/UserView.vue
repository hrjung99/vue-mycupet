<template>
    <CommonHeader />
    <div class="content-container">
        <CommonSideBar />
        <div class="table-container">
            <h2>회원 정보</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>주소</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, idx1) in state.users" :key="idx1" @click="viewDetails(user.cupet_user_id)">
                        <td><input type="checkbox" v-model="state.selectedUsers" :value="user.cupet_user_id" @click.stop></td>
                        <td>{{ user.cupet_user_name }}</td>
                        <td>{{ user.cupet_user_nickname }}</td>
                        <td>{{ user.cupet_user_address }}</td>
                        <td>{{ user.cupet_user_birth }}</td>
                        <td>{{ user.cupet_user_phonenumber }}</td>
                    </tr>
                </tbody>
                <br/>
                <button @click="deleteSelectedUsers" class="delete-button">선택한 회원 삭제</button>
            </table>
        </div>
    </div>
    <CommonFooter />
</template>

<script>
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import CommonHeader from "@/components/common/CommonHeader.vue";
import CommonSideBar from "@/components/common/CommonSideBar.vue";
import CommonFooter from "@/components/common/CommonFooter.vue";
import { useRouter } from 'vue-router';

export default {
    name: "UserView",
    components: {
        CommonHeader,
        CommonSideBar,
        CommonFooter,
    },
    setup() {
        const state = reactive({
            users: [],
            selectedUsers: []
        });

        const router = useRouter();

        const fetchUsers = () => {
            axios.get('/api1/getallusers')
                .then(({ data }) => {
                    state.users = [];
                    console.log(data);

                    for (let d of data) {
                        state.users.push(d);
                    }
                }).catch((error) => {
                    console.error("Error fetching users:", error);
                });
        };

        const viewDetails = (user_id) => {
            router.push({ name: 'UserDetail', params: { cupet_user_id : user_id } });
        };

        const deleteSelectedUsers = () => {
            if (state.selectedUsers.length === 0) {
                alert("삭제할 회원을 선택하세요.");
                return;
            }

            if (confirm("선택한 회원을 삭제하시겠습니까?")) {
                axios.request({
                    url: '/api1/deleteusers',
                    method: 'delete',
                    data: state.selectedUsers,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {
                        alert("선택한 회원이 삭제되었습니다.");
                        fetchUsers();
                        state.selectedUsers = [];
                    })
                    .catch((error) => {
                        console.error("Error deleting users:", error);
                        alert("회원 삭제 중 오류가 발생했습니다.");
                    });
            }
        };

        onMounted(() => {
            fetchUsers();
        });

        return { state, fetchUsers, viewDetails, deleteSelectedUsers };
    }
};
</script>

<style scoped>
.content-container {
    text-align: center;
}

.table-container {
    margin: 0 auto; 
    max-width: 800px; 
}

.table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    text-align: center;
}

th, td {
    padding: 10px 10px; /* 셀 안에 여백 */
    border: 1px solid #ddd; /* 셀 테두리 */
}


.delete-button:hover {
    background-color: darkred;
}

/* 글자와 테두리 사이에 추가적인 여백 */
td {
    position: relative;
}
</style>
