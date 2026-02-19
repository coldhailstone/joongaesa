<template>
	<b-card
		:title="common.convertTel(item.phone)"
		class="card"
		@click="$emit('clickCard', item.id)"
	>
		<b-card-text>
			<div class="d-flex flex-column mb-2">
				<span v-if="item.visitDate" class="info-row">
					<span class="label">방문날짜</span>
					<b>{{ item.visitDate }}</b>
				</span>
				<span v-if="item.visitTime" class="info-row">
					<span class="label">방문시간</span>
					<b>{{ item.visitTime }}</b>
				</span>
				<span v-if="item.gender" class="info-row">
					<span class="label">성별</span>
					<b>{{ item.gender }}</b>
				</span>
				<span v-if="item.buildingType" class="info-row">
					<span class="label">건물형태</span>
					<b>{{ item.buildingType }}</b>
				</span>
				<span v-if="item.contractType" class="info-row mt-2">
					<span class="label">거래유형</span>
					<b>{{ item.contractType }}</b>
				</span>
				<span v-if="item.residence" class="info-row">
					<span class="label">기간</span>
					<b>{{ item.residence }}</b>
				</span>
				<span v-if="item.deposit" class="info-row">
					<span class="label">보증금</span>
					<b>{{ item.deposit.toLocaleString() }}만원</b>
				</span>
				<span v-if="item.monthly" class="info-row">
					<span class="label">월세</span>
					<b>{{ item.monthly.toLocaleString() }}만원</b>
				</span>
				<span v-if="item.position" class="info-row">
					<span class="label">위치</span>
					<b>{{ item.position }}</b>
				</span>
			</div>
		</b-card-text>
	</b-card>
</template>

<script setup lang="ts">
import { Customer } from '@/types/customer';
import common from '@/utils/common';

interface Props {
	item: Customer;
}

defineProps<Props>();
defineEmits(['clickCard']);
</script>

<style lang="scss" scoped>
:deep(.card-title) {
	font-weight: 700;
	font-size: 1rem;
	color: #2563eb;
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

	.info-row {
		display: flex;
		gap: 6px;
		font-size: 0.85rem;
		color: #374151;

		.label {
			color: #6b7280;
			min-width: 52px;
		}

		b {
			font-weight: 600;
			color: #111827;
		}
	}
}
</style>
