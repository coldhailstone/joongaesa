<template>
	<b-card
		:title="title"
		:img-src="
			item.photo && item.photo.length
				? item.photo[0].url
				: 'https://via.placeholder.com/300x150'
		"
		img-top
		class="card"
		@click="$emit('clickCard', item.id)"
	>
		<b-card-text>
			<div class="d-flex flex-column mb-2 meta">
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
	font-weight: 700;
	font-size: 1rem;
	color: #111827;
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
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
	}

	.meta {
		font-size: 0.85rem;
		color: #6b7280;
	}

	.title {
		font-size: 1rem;
		font-weight: 500;
		color: #111827;
	}
}
</style>
