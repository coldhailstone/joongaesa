<template>
	<b-overlay class="h-100" :show="isLoading" rounded="sm">
		<div class="wrapper">
			<nav-bar v-show="showLayout" />
			<router-view class="view h-100" />
			<footers v-show="showLayout" />
		</div>

		<notification />
	</b-overlay>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
	async created() {
		await this.FETCH_SESSION_USER();
	},
	methods: {
		...mapActions('user', ['FETCH_SESSION_USER']),
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	min-height: 100vh;
	position: relative;
	width: 100%;
	.view {
		padding-bottom: 70px;
	}
}
</style>
