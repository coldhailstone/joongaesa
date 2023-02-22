import Home from '@/views/Home.vue';
import Login from '@/views/auth/Login.vue';
import Join from '@/views/auth/Join.vue';
import EstateList from '@/views/estate/EstateList.vue';
import EstateAdd from '@/views/estate/EstateAdd.vue';
import CustomerList from '@/views/customer/CustomerList.vue';

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
];
