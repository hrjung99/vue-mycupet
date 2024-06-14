<template>
    <CommonHeader />
    <div class="content-container">
        <CommonSideBar />
        <div>
            <h2>회원 정보</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>주소</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, idx1) in state.users" :key="idx1" @click="viewDetails(user.cupet_user_id)">
                        <td>{{ user.cupet_user_name }}</td>
                        <td>{{ user.cupet_user_nickname }}</td>
                        <td>{{ user.cupet_user_address }}</td>
                        <td>{{ user.cupet_user_birth }}</td>
                        <td>{{ user.cupet_user_phonenumber }}</td>
                    </tr>
                </tbody>
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

        onMounted(() => {
            fetchUsers();
        });

        return { state, fetchUsers, viewDetails };
    }
};
</script>

<style scoped>
.content-container {
    text-align: center;
}

.table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    text-align: center;
}
</style>