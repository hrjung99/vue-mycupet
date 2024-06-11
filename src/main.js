import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Vue Router를 가져옵니다.
import CKEditor from '@ckeditor/ckeditor5-vue';

// createApp을 한 번만 선언하고 CKEditor와 router를 함께 사용합니다.
const app = createApp(App);
app.use(router);
app.use(CKEditor);
app.mount('#app');
