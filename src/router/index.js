import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue'; // MainPage 컴포넌트를 가져옵니다.
import LoginPage from '@/components/user/LoginForm.vue';
import JoinPage from '@/components/user/JoinForm.vue';

const routes = [
    { path: '/', component: MainPage }, // 기본 경로('/')일 때 MainPage를 보여줍니다.
    { path: '/Login', component: LoginPage },
    { path: '/JoinUser', component: JoinPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
