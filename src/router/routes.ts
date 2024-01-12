import Home from '@/views/Home.vue';
import Join from '@/views/auth/Join.vue';
import Login from '@/views/auth/Login.vue';
import CustomerAdd from '@/views/customer/CustomerAdd.vue';
import CustomerList from '@/views/customer/CustomerList.vue';
import EstateAdd from '@/views/estate/EstateAdd.vue';
import EstateList from '@/views/estate/EstateList.vue';

export const menuList = [
	{
		path: '/',
		name: '홈',
		component: Home,
	},
	{
		path: '/estate',
		name: '매물 관리',
		component: EstateList,
	},
	{
		path: '/customer',
		name: '고객 관리',
		component: CustomerList,
	},
];

export default [
	...menuList,
	{
		path: '/login',
		name: '로그인',
		component: Login,
	},
	{
		path: '/join',
		name: '회원가입',
		component: Join,
	},
	{
		path: '/estate/new',
		name: '매물 등록',
		component: EstateAdd,
	},
	{
		path: '/estate/:id',
		name: '매물 수정',
		component: EstateAdd,
	},
	{
		path: '/customer/new',
		name: '고객 등록',
		component: CustomerAdd,
	},
	{
		path: '/customer/:id',
		name: '고객 수정',
		component: CustomerAdd,
	},
];
