import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Join from '@/views/auth/Join.vue';

export const menuList = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
];

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/join',
		name: 'join',
		component: Join,
	},
];

export default routes;
