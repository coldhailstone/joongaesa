import { createRouter, createWebHistory } from 'vue-router';
import { isEmpty } from 'lodash';
import routes from './routes';
import store from '@/store';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, _, next) => {
	const needLoginMenuList = ['매물 관리', '고객 관리'];
	if (needLoginMenuList.includes(to.name)) {
		!isEmpty(store.state.user.user) ? next() : next('login');
	} else {
		next();
	}
});
router.afterEach(() => {
	window.scrollTo(0, 0);
});

export default router;
