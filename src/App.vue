<template>
	<b-overlay class="h-100" :show="isLoading" rounded="sm">
		<div class="d-flex flex-column justify-content-between h-100">
			<nav-bar v-show="showLayout" />
			<router-view class="h-100 overflow-auto" />
			<footers v-show="showLayout" />
		</div>

		<notification />
	</b-overlay>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { getSessionKey } from '@/api/firebase';
import NavBar from '@/components/layout/NavBar.vue';
import Footers from '@/components/layout/Footer.vue';
import Notification from '@/components/common/Notification.vue';

export default {
	components: {
		NavBar,
		Footers,
		Notification,
	},
	data() {
		return {
			pathToHideLayout: ['/login', '/join'],
		};
	},
	computed: {
		...mapState('loading', ['isLoading']),
		currentPath() {
			return this.$route.path;
		},
		showLayout() {
			return !this.pathToHideLayout.includes(this.currentPath);
		},
	},
	created() {
		const sessionUser = sessionStorage.getItem(getSessionKey());
		if (sessionUser) {
			this.SET_USER(JSON.parse(sessionUser));
		}
	},
	methods: {
		...mapMutations('user', ['SET_USER']),
	},
};
</script>
