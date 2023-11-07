<template>
	<b-card
		:title="$common.convertTel(item.phone)"
		class="card mt-4 mb-4 me-4"
		@click="$emit('clickCard', item.id)"
	>
		<b-card-text>
			<div class="d-flex flex-column mb-2">
				<span v-if="item.visitDate">
					방문날짜: <b>{{ item.visitDate }}</b>
				</span>
				<span v-if="item.visitTime">
					방문시간: <b>{{ item.visitTime }}</b>
				</span>
				<span v-if="item.gender">
					성별: <b>{{ item.gender }}</b>
				</span>
				<span v-if="item.buildingType">
					건물형태: <b>{{ item.buildingType }}</b>
				</span>
				<span v-if="item.contractType" class="mt-3">
					거래유형: <b>{{ item.contractType }}</b>
				</span>
				<span v-if="item.residence">
					기간: <b>{{ item.residence }}</b>
				</span>
				<span v-if="item.deposit">
					보증금: <b>{{ parseInt(item.deposit).toLocaleString() }}만원</b>
				</span>
				<span v-if="item.monthly">
					월세: <b>{{ parseInt(item.monthly).toLocaleString() }}만원</b>
				</span>
				<span v-if="item.position">
					위치: <b>{{ item.position }}</b>
				</span>
			</div>
		</b-card-text>
	</b-card>
</template>

<script>
export default {
	name: 'CustomerCard',
	props: {
		item: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style lang="scss" scoped>
:deep(.card-title) {
	font-weight: bold;
}

.card {
	width: 300px;
	height: 300px;
	cursor: pointer;
	&:hover {
		background: rgba(54, 58, 60, 0.1);
	}
	b {
		font-weight: 600;
	}
}
</style>
