<template>
	<div class="d-flex flex-column">
		<div class="hero d-flex align-items-center justify-content-center">
			<div class="hero-content text-center text-white">
				<h1 class="fw-bold mb-3">
					고객 관리 · 매물 관리는<br />
					중개사닷컴
				</h1>
				<p class="mb-5 fs-5">
					이제 책상 위 지저분한 서류들을 깨끗하게 정리하세요.<br />
					모바일과 웹에서 편하게 사용하는 중개인 전용 서비스입니다.
				</p>
				<div class="d-flex justify-content-center gap-3 flex-wrap">
					<router-link to="/estate" class="btn btn-light btn-lg fw-bold px-4">
						<i class="fa-solid fa-building me-2"></i>매물 관리
					</router-link>
					<router-link to="/customer" class="btn btn-outline-light btn-lg fw-bold px-4">
						<i class="fa-solid fa-users me-2"></i>고객 관리
					</router-link>
				</div>
			</div>
		</div>

		<div class="container py-5">
			<h2 class="text-center fw-bold mb-2">주요 기능</h2>
			<p class="text-center text-muted mb-5">
				중개사닷컴이 제공하는 핵심 서비스를 만나보세요.
			</p>
			<div class="d-flex flex-wrap justify-content-center gap-4">
				<div class="feature-card p-4 text-center">
					<div class="feature-icon mb-3">
						<i class="fa-solid fa-house-circle-check"></i>
					</div>
					<h5 class="fw-bold mb-2">매물 관리</h5>
					<p class="text-muted mb-0">
						다양한 매물 정보를 손쉽게 등록하고 관리하세요.<br />
						이미지, 주소, 거래 조건을 한눈에 확인할 수 있습니다.
					</p>
				</div>
				<div class="feature-card p-4 text-center">
					<div class="feature-icon mb-3">
						<i class="fa-solid fa-address-book"></i>
					</div>
					<h5 class="fw-bold mb-2">고객 관리</h5>
					<p class="text-muted mb-0">
						방문 고객의 요구 사항과 연락처를<br />
						체계적으로 기록하고 추적하세요.
					</p>
				</div>
				<div class="feature-card p-4 text-center">
					<div class="feature-icon mb-3">
						<i class="fa-solid fa-mobile-screen"></i>
					</div>
					<h5 class="fw-bold mb-2">어디서나 접속</h5>
					<p class="text-muted mb-0">
						모바일, 태블릿, PC 어디서든<br />
						편리하게 사용할 수 있는 반응형 웹 서비스입니다.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.hero {
	background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
	min-height: 480px;
	padding: 4rem 2rem;

	.hero-content {
		max-width: 640px;

		h1 {
			font-size: 2.5rem;
		}

		p {
			opacity: 0.92;
		}
	}
}

.feature-card {
	background: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	width: 280px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
	}

	.feature-icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: rgba(37, 99, 235, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;

		i {
			font-size: 1.5rem;
			color: #2563eb;
		}
	}

	p {
		font-size: 0.9rem;
		line-height: 1.7;
	}
}
</style>
