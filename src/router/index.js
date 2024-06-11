import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // MainPage 컴포넌트를 가져옵니다.
import LoginPage from '@/components/user/LoginMain.vue';
import JoinPage from '@/components/user/JoinMain.vue';
import FindPet from '@/components/cupetfindpet/FindPetMain.vue';
import MyCupetPage from '@/components/MyCupetPage/MypageMain.vue';
import MyCupetPointMain from '@/components/MyCupetPage/Point/MyCupetPointMain.vue';
import UserUpdatePageMain from '@/components/MyCupetPage/User/UserUpdatePageMain.vue';
import ShopMain from '@/components/shop/ShopMain.vue';
import ShopCart from '@/components/shop/ShopCart.vue';
import OrderPage from '@/components/shop/OrderPage.vue';
import OrdersPage from '@/components/shop/OrdersPage.vue';
import OrderDetailPage from '@/components/shop/OrderDetailPage.vue';
import BoardMain from '@/components/board/list/BoardMain.vue';
import BoardInsertMain from '@/components/board/insert/BoardInsertMain.vue';
import BoardUpdateMain from '@/components/board/update/BoardUpdateMain.vue';
import BoardViewMain from '@/components/board/view/BoardViewMain.vue';
import MissingPetMain from '@/components/cupetfindpet/MissingPetMain.vue';


const routes = [
    { path: '/', component: MainPage }, // 기본 경로('/')일 때 MainPage를 보여줍니다.
    { path: '/Login', component: LoginPage },
    { path: '/JoinUser', component: JoinPage },
    { path: '/FindPet', component: FindPet },
    { path: '/MyCupetPage', component: MyCupetPage },
    { path: '/MyCupetPointMain', component: MyCupetPointMain },
    { path: '/UserUpdatePageMain', component: UserUpdatePageMain },
    { path: '/ShopMain', component: ShopMain },
    { path: '/ShopCart', component: ShopCart },
    { path: '/OrderPage', component: OrderPage },
    { path: '/OrdersPage', component: OrdersPage },
    { path: '/order/:cupet_order_no', name: 'OrderDetail', component: OrderDetailPage },
    { path: '/BoardMain', component: BoardMain },
    { path: '/BoardInsertMain', component: BoardInsertMain },
    { path: '/BoardUpdateMain', component: BoardUpdateMain },
    { path: '/BoardViewMain', component: BoardViewMain },
    { path: '/MissingPetMain', component: MissingPetMain },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
