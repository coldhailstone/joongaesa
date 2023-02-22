<template>
	<b-card
		title="월세 1000/100"
		img-src="https://picsum.photos/600/300/?image=25"
		img-top
		class="card m-4"
		@click="$emit('clickCard', 'id')"
	>
		<b-card-text>
			<div class="d-flex flex-column mb-2">
				<span>11평 3층</span>
				<span>강남구 논현동</span>
			</div>
			<span class="title">🧡💛💚가성비 원룸💙💜🤎</span>
		</b-card-text>
	</b-card>
</template>

<script>
export default {
	name: 'EstateCard',
};
</script>

<style lang="scss" scoped>
::v-deep .card-title {
	font-weight: bold;
}
.card {
	max-width: 20rem;
	height: 300px;
	cursor: pointer;
	&:hover {
		background: rgba(54, 58, 60, 0.1);
	}
	.title {
		color: rgb(54, 58, 60);
	}
}
</style>
