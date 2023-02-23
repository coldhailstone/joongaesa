import { createRouter, createWebHistory } from 'vue-router';
import { isLogin } from '@/api/firebase';
import routes from './routes';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, _, next) => {
	const needLoginMenuList = ['매물 관리', '고객 관리'];
	if (needLoginMenuList.includes(to.name)) {
		isLogin() ? next() : next('login');
	}
	next();
});

export default router;
