import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // MainPage 컴포넌트를 가져옵니다.
import LoginPage from '@/components/user/LoginForm.vue';
import JoinPage from '@/components/user/JoinForm.vue';
import FindPet from '@/components/findpet/FindPetMain.vue';
import MyCupetPage from '@/components/MyCupetPage/MypageMain.vue';
import MyCupetPetpage from '@/components/MyCupetPage/MyCupetPetpage.vue';
import ShopMain from '@/components/shop/ShopMain.vue';

const routes = [
    { path: '/', component: MainPage }, // 기본 경로('/')일 때 MainPage를 보여줍니다.
    { path: '/Login', component: LoginPage },
    { path: '/JoinUser', component: JoinPage },
    { path: '/FindPet', component: FindPet },
    { path: '/MyCupetPage', component: MyCupetPage },
    { path: '/MyCupetPetpage', component: MyCupetPetpage },
    { path: '/ShopMain', component: ShopMain },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
