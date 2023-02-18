<template>
	<b-navbar class="p-4" toggleable="lg" type="dark" variant="light">
		<b-navbar-brand href="#">
			<router-link to="/" class="text-decoration-none">
				중개사닷컴
			</router-link>
		</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" class="justify-content-between" is-nav>
			<b-navbar-nav>
				<b-nav-item
					v-for="menu of menuList"
					:key="menu.name"
					:to="menu.path"
				>
					<span v-if="menu.path !== '/'">{{ menu.name }}</span>
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown v-if="!$_.isEmpty(user)" right>
					<template #button-content>
						<span>사용자</span>
					</template>
					<b-dropdown-item href="#">프로필</b-dropdown-item>
					<b-dropdown-item href="#">로그아웃</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-button-group v-else>
					<b-button variant="primary" @click="$router.push('login')">
						로그인
					</b-button>
				</b-button-group>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import { menuList } from '@/router/routes';

export default {
	data() {
		return {
			menuList,
			user: {},
		};
	},
};
</script>
