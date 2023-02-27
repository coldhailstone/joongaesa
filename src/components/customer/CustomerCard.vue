<template>
	<b-card title="010-6788-1419" class="card mt-4 mb-4 me-4">
		<b-card-text>
			<div class="d-flex flex-column mb-2">
				<span>성별: 남</span>
				<span>방문날짜: 2023-02-28</span>
				<span>방문시간: 17:30</span>
				<span class="mt-3">유형: 전세</span>
				<span>보증금: 20,000만원</span>
				<span>월세: 0만원</span>
				<span>기간: 2년</span>
				<span>용도: 오피스텔, 투룸</span>
				<span>위치: 신림동, 봉천동</span>
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
::v-deep .card-title {
	font-weight: bold;
}

.card {
	width: 300px;
	height: 300px;
	cursor: pointer;
	&:hover {
		background: rgba(54, 58, 60, 0.1);
	}
}
</style>
