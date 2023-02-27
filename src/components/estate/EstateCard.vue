<template>
	<b-card
		:title="title"
		:img-src="
			item.photo && item.photo.length
				? item.photo[0].url
				: 'https://via.placeholder.com/300x150'
		"
		img-top
		class="card mt-4 mb-4 me-4"
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
			return `${this.item.contractType} ${parseInt(this.item.deposit).toLocaleString()}만원 ${
				this.item.monthly > 0 ? `/ ${parseInt(this.item.monthly).toLocaleString()}만원` : ''
			}`;
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .card-title {
	font-weight: bold;
}
::v-deep .card-img-top {
	width: 300px;
	height: 150px;
	object-fit: cover;
}

.card {
	width: 300px;
	height: 300px;
	cursor: pointer;
	&:hover {
		background: rgba(54, 58, 60, 0.1);
	}
	.title {
		font-size: 1.25rem;
		font-weight: 500;
		color: rgb(54, 58, 60);
	}
}
</style>
