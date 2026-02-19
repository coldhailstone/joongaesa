<template>
	<div class="estate-card" @click="$emit('clickCard', item.id)">
		<div class="img-wrap">
			<img :src="imgSrc" alt="매물 이미지" />
			<span v-if="item.contractType" class="badge-type">{{ item.contractType }}</span>
		</div>
		<div class="card-info">
			<p class="price">{{ title }}</p>
			<p v-if="metaLine" class="meta">{{ metaLine }}</p>
			<p v-if="item.address" class="address">{{ item.address }}</p>
			<p v-if="item.title" class="desc">{{ item.title }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Estate } from '@/types/estate';
import { computed } from 'vue';

interface Props {
	item: Estate;
}

const props = defineProps<Props>();

const imgSrc = computed(() =>
	props.item.photo?.length ? props.item.photo[0].url : 'https://via.placeholder.com/400x200'
);

const title = computed(() => {
	const deposit = props.item.deposit?.toLocaleString() ?? '0';
	const monthly = props.item.monthly > 0 ? `/${props.item.monthly.toLocaleString()}` : '';
	return `${props.item.contractType} ${deposit}${monthly}`;
});

const metaLine = computed(() => {
	const parts = [];
	if (props.item.pyung) parts.push(`${props.item.pyung}평`);
	if (props.item.correspondingFloor) parts.push(`${props.item.correspondingFloor}층`);
	if (props.item.buildingType) parts.push(props.item.buildingType);
	return parts.join(' · ');
});
</script>

<style lang="scss" scoped>
.estate-card {
	background: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	overflow: hidden;
	cursor: pointer;
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(37, 99, 235, 0.14);
	}

	.img-wrap {
		position: relative;
		width: 100%;
		height: 180px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
		}

		&:hover img {
			transform: scale(1.04);
		}

		.badge-type {
			position: absolute;
			top: 10px;
			left: 10px;
			background: #2563eb;
			color: #ffffff;
			font-size: 0.72rem;
			font-weight: 700;
			padding: 3px 10px;
			border-radius: 20px;
			letter-spacing: 0.3px;
		}
	}

	.card-info {
		padding: 14px 16px 16px;

		.price {
			font-size: 1rem;
			font-weight: 700;
			color: #111827;
			margin-bottom: 4px;
		}

		.meta {
			font-size: 0.8rem;
			color: #6b7280;
			margin-bottom: 3px;
		}

		.address {
			font-size: 0.8rem;
			color: #9ca3af;
			margin-bottom: 4px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.desc {
			font-size: 0.85rem;
			color: #374151;
			font-weight: 500;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 0;
		}
	}
}
</style>
