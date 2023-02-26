import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import _ from 'lodash';
import BootstrapVue3 from 'bootstrap-vue-3';
import Notifications from '@kyvg/vue3-notification';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'vue3-carousel/dist/carousel.css';

import '@/styles/common.scss';
import '@/api/firebase';

const app = createApp(App).use(store).use(router).use(Notifications).use(BootstrapVue3);

app.config.globalProperties.$_ = _;

app.mount('#app');
