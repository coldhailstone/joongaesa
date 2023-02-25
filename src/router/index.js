import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import store from '@/store';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, _, next) => {
	const needLoginMenuList = ['매물 관리', '고객 관리'];
	if (needLoginMenuList.includes(to.name)) {
		store.state.user.user ? next() : next('login');
	} else {
		next();
	}
});

export default router;
