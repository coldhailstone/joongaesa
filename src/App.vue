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

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import NavBar from '@/components/layout/NavBar.vue';
import Footers from '@/components/layout/Footer.vue';
import Notification from '@/components/common/Notification.vue';

const store = useStore();
const route = useRoute();

const isLoading = computed<boolean>(() => store.state.loading.isLoading);
const fetchSessionUser = () => store.dispatch('user/FETCH_SESSION_USER');
onBeforeMount(async () => await fetchSessionUser());

const pathToHideLayout = ['/login', '/join'];
const showLayout = computed<boolean>(() => !pathToHideLayout.includes(route.path));
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
