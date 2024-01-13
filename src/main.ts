import Notifications from '@kyvg/vue3-notification';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/api/firebase';
import '@/styles/common.scss';

const app = createApp(App).use(store).use(router).use(Notifications).use(BootstrapVue3);

app.mount('#app');
