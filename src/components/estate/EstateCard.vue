<template>
	<b-card
		:title="title"
		img-src="https://picsum.photos/600/300/?image=25"
		img-top
		class="card m-4"
		@click="$emit('clickCard', item.id)"
	>
		<b-card-text>
			<div class="d-flex flex-column mb-2">
				<span v-if="item.pyung && item.correspondingFloor">
					{{ `${item.pyung}평 ${item.correspondingFloor}층` }}
				</span>
				<span v-if="item.address">{{ item.address }}</span>
			</div>
			<span class="title">{{ item.title }}</span>
		</b-card-text>
	</b-card>
</template>

<script>
export default {
	name: 'EstateCard',
	props: {
		item: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		title() {
			return `${this.item.contractType} ${this.item.deposit} ${
				this.item.monthly > 0 ? `/ ${this.item.monthly}` : ''
			}`;
		},
	},
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
