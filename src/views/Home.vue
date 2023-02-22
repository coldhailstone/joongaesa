<template>
	<div class="d-flex flex-column gap-5">
		<div class="banner position-relative">
			<img src="@/assets/home_banner.jpg" class="w-100 h-100" />
			<h1 class="position-absolute p-3 ms-3 fw-bold">
				고객 관리<br />
				매물 관리는<br />
				중개사닷컴
			</h1>
		</div>
		<div class="contents container p-3">
			<h2 class="mb-4 fw-bold">종이는 그만!</h2>
			<p>
				이제 책상위 지저분한 서류들 깨끗하게 정리하세요.<br />
				모바일 또는 웹으로 편하게 사용할 수 있는 중개인을 위한 어플리케이션
				중개사닷컴입니다.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
};
</script>

<style lang="scss" scoped>
.banner {
	min-height: 280px;
	max-height: 680px;
	img {
		object-fit: cover;
	}
	h1 {
		top: 8rem;
		color: #0a174e;
	}
}
.contents {
	color: rgb(54, 58, 60);
}
</style>
