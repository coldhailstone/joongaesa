import store from '@/store';
import common from '@/utils/common';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, _, next) => {
	const needLoginMenuList = ['매물 관리', '고객 관리'];
	if (needLoginMenuList.includes(to.name.toString())) {
		!common.isEmpty(store.state.user.user) ? next() : next('login');
	} else {
		next();
	}
});
router.afterEach(() => {
	window.scrollTo(0, 0);
});

export default router;
