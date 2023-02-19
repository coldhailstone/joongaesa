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
						<img
							v-if="user.photoURL"
							:src="user.photoURL"
							class="me-2"
							style="
								width: 32px;
								height: 32px;
								border-radius: 32px;
							"
						/>
						<span>{{ user.displayName ?? user.email }}</span>
					</template>
					<b-dropdown-item @click="signOut">
						로그아웃
					</b-dropdown-item>
					<b-dropdown-item @click="deleteUser">
						회원탈퇴
					</b-dropdown-item>
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
import { mapMutations, mapState } from 'vuex';
import { menuList } from '@/router/routes';
import { signOutUser, removeUser } from '@/api/firebase';

export default {
	data() {
		return {
			menuList,
		};
	},
	computed: {
		...mapState('user', ['user']),
	},
	methods: {
		...mapMutations('user', ['SET_USER']),
		async signOut() {
			await signOutUser();
			this.SET_USER({});

			this.$notify({
				type: 'success',
				text: '로그아웃에 성공했습니다.',
			});
			this.$router.push({ name: 'home' });
		},
		async deleteUser() {
			await removeUser();
			this.SET_USER({});

			this.$notify({
				type: 'success',
				text: '회원탈퇴가 완료되었습니다.',
			});
			this.$router.push({ name: 'home' });
		},
	},
};
</script>
