import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // MainPage 컴포넌트를 가져옵니다.
import LoginPage from '@/components/user/LoginMain.vue';
import JoinPage from '@/components/user/JoinMain.vue';
import FindPet from '@/components/cupetfindpet/FindPetMain.vue';
import MyCupetPage from '@/components/MyCupetPage/MypageMain.vue';
import MyCupetPointMain from '@/components/MyCupetPage/MyCupetPointMain.vue';
import ShopMain from '@/components/shop/ShopMain.vue';
import ShopCart from '@/components/shop/ShopCart.vue';
import BoardMain from '@/components/board/BoardMain.vue';
import BoardInsertMain from '@/components/board/BoardInsertMain.vue';
import BoardUpdateMain from '@/components/board/BoardUpdateMain.vue';
import BoardViewMain from '@/components/board/BoardViewMain.vue';

const routes = [
    { path: '/', component: MainPage }, // 기본 경로('/')일 때 MainPage를 보여줍니다.
    { path: '/Login', component: LoginPage },
    { path: '/JoinUser', component: JoinPage },
    { path: '/FindPet', component: FindPet },
    { path: '/MyCupetPage', component: MyCupetPage },
    { path: '/MyCupetPointMain', component: MyCupetPointMain },
    { path: '/ShopMain', component: ShopMain },
    { path: '/ShopCart', component: ShopCart },
    { path: '/BoardMain', component: BoardMain },
    { path: '/BoardInsertMain', component: BoardInsertMain },
    { path: '/BoardUpdateMain', component: BoardUpdateMain },
    { path: '/BoardViewMain', component: BoardViewMain },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
