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
		style="box-sizing: content-box"
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

<script setup lang="ts">
import { Estate } from '@/types/estate';
import { computed } from 'vue';

interface Props {
	item: Estate;
}

const props = defineProps<Props>();
const title = computed<string>(() => {
	return `${props.item.contractType} ${props.item.deposit.toLocaleString()}${
		props.item.monthly > 0 ? `/${props.item.monthly.toLocaleString()}` : ''
	}`;
});
</script>

<style lang="scss" scoped>
:deep(.card-title) {
	font-weight: bold;
}
:deep(.card-img-top) {
	width: 300px;
	height: 150px;
	object-fit: cover;
}

.card {
	width: 300px;
	height: 300px;
	cursor: pointer;
	overflow: hidden;
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
