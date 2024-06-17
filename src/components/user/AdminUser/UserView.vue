<template>
    <div class="main-container">
        <CommonHeader />
        <div class="content-container">
            <CommonSideBar />
            <div class="UserView">
                <div class="text-center mb-4"> <h2>회원 정보</h2> </div>
                <table class="table table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>선택</th>
                            <th>이름</th>
                            <th>닉네임</th>
                            <th>우편번호</th>
                            <th>생년월일</th>
                            <th>전화번호</th>
                            <th>성별</th>
                            <th>이메일</th>
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
                            <td>{{ user.cupet_user_gender }}</td>
                            <td>{{ user.cupet_user_email }}</td>
                        </tr>
                    </tbody>
                    <br />
                    <button @click="deleteSelectedUsers" class="delete-button">회원 삭제</button>
                </table>
            </div>
        </div>
        <CommonFooter />
    </div>
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
            router.push({ name: 'UserDetail', params: { cupet_user_id: user_id } });
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
html, body {
  height: 100%;
  margin: 0;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex: 1;
}

.UserView {
  margin-left: 50px;
  margin-right: 50px;
  flex: 1;
}

.container {
  padding: 20px;
}

.table {
  margin-top: 30px;
}

.table > tbody {
  border-top: 1px solid #eee;
}

.table > tbody > tr {
  cursor: pointer;
  transition: background-color 0.2s;
}

.table > tbody > tr:hover {
  background-color: #f1f1f1;
}

.delete-button:hover {
    background-color: darkred;
}

td {
    position: relative;
}
</style>
