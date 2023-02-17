<template>
	<b-nav>
		<b-nav-item v-for="route of routes" :key="route.name" :to="route.path">
			{{ route.name }}
		</b-nav-item>
	</b-nav>
</template>

<script>
import routes from '@/router/routes';

export default {
	data() {
		return {
			routes,
		};
	},
};
</script>
