import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // MainPage 컴포넌트를 가져옵니다.
import LoginPage from '@/components/user/LoginMain.vue';
import JoinPage from '@/components/user/JoinForm.vue';
import FindPet from '@/components/cupetfindpet/FindPetMain.vue';
import MyCupetPage from '@/components/MyCupetPage/MypageMain.vue';
import ShopMain from '@/components/shop/ShopMain.vue';
import BoardMain from '@/components/board/BoardMain.vue';
import BoardInsertFormMain from '@/components/board/BoardInsertFormMain.vue';

const routes = [
    { path: '/', component: MainPage }, // 기본 경로('/')일 때 MainPage를 보여줍니다.
    { path: '/Login', component: LoginPage },
    { path: '/JoinUser', component: JoinPage },
    { path: '/FindPet', component: FindPet },
    { path: '/MyCupetPage', component: MyCupetPage },
    { path: '/ShopMain', component: ShopMain },
    { path: '/BoardMain', component: BoardMain },
    { path: '/BoardInsertFormMain', component: BoardInsertFormMain },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
