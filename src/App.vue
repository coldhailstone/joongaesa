<template>
	<div class="d-flex flex-column justify-content-between h-100">
		<nav-bar v-show="showLayout" />
		<router-view class="h-100" />
		<footers v-show="showLayout" />
	</div>

	<notification />
</template>

<script>
import { mapMutations } from 'vuex';
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
			pageNamesHideLayout: ['login', 'join'],
		};
	},
	computed: {
		currentPageName() {
			return this.$route.name;
		},
		showLayout() {
			return !this.pageNamesHideLayout.includes(this.currentPageName);
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
