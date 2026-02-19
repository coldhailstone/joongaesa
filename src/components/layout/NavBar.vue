<template>
	<b-navbar class="navbar py-3 px-4" toggleable="lg" type="light" variant="white">
		<b-navbar-brand href="#">
			<router-link to="/" class="text-decoration-none fw-bold fs-4 brand-logo">
				중개사닷컴
			</router-link>
		</b-navbar-brand>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" class="justify-content-between" is-nav>
			<b-navbar-nav class="gap-2">
				<b-nav-item v-for="menu of menuList" :key="menu.name" :to="menu.path">
					<span v-if="menu.path !== '/'">{{ menu.name }}</span>
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown v-if="!common.isEmpty(user)" right>
					<template #button-content>
						<img
							v-if="user.photoURL"
							:src="user.photoURL"
							class="icon me-2"
							referrerpolicy="no-referrer"
						/>
						<span>{{ user.displayName ?? user.email }}</span>
					</template>
					<b-dropdown-item @click="logout"> 로그아웃 </b-dropdown-item>
					<b-dropdown-item @click="deleteAccount"> 회원탈퇴 </b-dropdown-item>
				</b-nav-item-dropdown>
				<b-button-group v-else>
					<b-button variant="primary" @click="$router.push('login')"> 로그인 </b-button>
				</b-button-group>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script setup lang="ts">
import { menuList } from '@/router/routes';
import common from '@/utils/common';
import { useNotification } from '@kyvg/vue3-notification';
import { User } from 'firebase/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();

const user = computed<User>(() => store.state.user.user);
const signOut = () => store.dispatch('user/SIGN_OUT');
const logout = async () => {
	try {
		await signOut();
		router.push('/');
		notify({ type: 'success', text: '로그아웃에 성공했습니다.' });
	} catch (error) {
		notify({ type: 'error', text: error.message });
	}
};
const deleteUser = () => store.dispatch('user/DELETE_USER');
const deleteAccount = async () => {
	try {
		await deleteUser();
		router.push('/');
		notify({ type: 'success', text: '회원탈퇴가 완료되었습니다.' });
	} catch (error) {
		notify({ type: 'error', text: error.message });
	}
};
</script>

<style lang="scss" scoped>
:deep(.dropdown-menu) {
	margin-top: 0 !important;
}

:deep(.nav-link) {
	color: #6b7280 !important;
	font-weight: 500;
	transition: color 0.15s ease;

	&:hover,
	&.router-link-active {
		color: #2563eb !important;
	}
}

.navbar {
	position: sticky;
	top: 0;
	width: 100%;
	z-index: 9;
	background-color: #ffffff !important;
	border-bottom: 1px solid #e5e7eb;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.brand-logo {
	color: #2563eb !important;
	letter-spacing: -0.5px;
}

.icon {
	width: 32px;
	height: 32px;
	border-radius: 32px;
}
</style>
