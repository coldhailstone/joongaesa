<template>
	<notifications class="notifications" position="bottom center">
		<template v-slot:body="{ item }">
			<div class="notification" :class="item.type">
				{{ item.text }}
			</div>
		</template>
	</notifications>
</template>

<script>
export default {
	name: 'Notification',
};
</script>

<style lang="scss" scoped>
.notifications {
	margin-bottom: 80px;
	.notification {
		width: 100%;
		padding: 8px;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(2.71828px);
		border-radius: 10px;
		color: white;
		text-align: center;
		font-size: 0.875rem;
		margin-top: 10px;
		&.success {
			background-color: #0dc577;
		}
		&.error {
			background-color: #ff5252;
		}
		&.warning {
			background-color: #ff8248;
		}
		&.info {
			background-color: #0b6cff;
		}
	}
}
</style>
