<template>
	<div class="customer-card" @click="$emit('clickCard', item.id)">
		<div class="card-header-row">
			<span class="phone">{{ common.convertTel(item.phone) }}</span>
			<span v-if="item.visitDate" class="visit-badge">
				{{ item.visitDate }}{{ item.visitTime ? ` ${item.visitTime}` : '' }}
			</span>
		</div>
		<div class="card-body-area">
			<div v-if="item.contractType || item.buildingType || item.gender" class="badges">
				<span v-if="item.contractType" class="badge-tag primary">{{
					item.contractType
				}}</span>
				<span v-if="item.buildingType" class="badge-tag gray">{{ item.buildingType }}</span>
				<span v-if="item.gender" class="badge-tag gray">{{ item.gender }}</span>
			</div>
			<div v-if="item.deposit || item.monthly" class="price-row">
				<span v-if="item.deposit" class="price-item">
					보증금 <b>{{ item.deposit.toLocaleString() }}만</b>
				</span>
				<span v-if="item.monthly" class="price-item">
					월세 <b>{{ item.monthly.toLocaleString() }}만</b>
				</span>
			</div>
			<div class="info-rows">
				<span v-if="item.position" class="info-row">
					<i class="fa-solid fa-location-dot"></i>{{ item.position }}
				</span>
				<span v-if="item.residence" class="info-row">
					<i class="fa-regular fa-clock"></i>{{ item.residence }}
				</span>
				<span v-if="item.visitTime" class="info-row">
					<i class="fa-solid fa-clock"></i>방문 {{ item.visitTime }}
				</span>
			</div>
		</div>
	</div>
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
.customer-card {
	background: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	overflow: hidden;
	cursor: pointer;
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	padding: 16px;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(37, 99, 235, 0.14);
	}

	.card-header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		padding-bottom: 10px;
		border-bottom: 1px solid #f3f4f6;

		.phone {
			font-size: 0.95rem;
			font-weight: 700;
			color: #2563eb;
		}

		.visit-badge {
			font-size: 0.72rem;
			color: #6b7280;
			background: #f3f4f6;
			padding: 2px 8px;
			border-radius: 20px;
		}
	}

	.card-body-area {
		.badges {
			display: flex;
			flex-wrap: wrap;
			gap: 5px;
			margin-bottom: 10px;
		}

		.badge-tag {
			font-size: 0.72rem;
			font-weight: 600;
			padding: 3px 10px;
			border-radius: 20px;

			&.primary {
				background: rgba(37, 99, 235, 0.1);
				color: #2563eb;
			}

			&.gray {
				background: #f3f4f6;
				color: #6b7280;
			}
		}

		.price-row {
			display: flex;
			gap: 14px;
			margin-bottom: 10px;

			.price-item {
				font-size: 0.82rem;
				color: #374151;

				b {
					font-weight: 700;
					color: #111827;
				}
			}
		}

		.info-rows {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		.info-row {
			display: flex;
			align-items: center;
			gap: 7px;
			font-size: 0.82rem;
			color: #6b7280;

			i {
				width: 14px;
				font-size: 0.78rem;
				color: #9ca3af;
			}
		}
	}
}
</style>
