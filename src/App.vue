<template>
	<nav-bar />
	<router-view />

	<notification />
</template>

<script>
import { mapMutations } from 'vuex';
import { getSessionKey } from '@/api/firebase';
import NavBar from '@/components/common/NavBar.vue';
import Notification from '@/components/common/Notification.vue';

export default {
	components: {
		NavBar,
		Notification,
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
