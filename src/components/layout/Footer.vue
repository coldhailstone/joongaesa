<template>
	<div class="footer-wrapper">
		<footer
			class="d-flex flex-wrap justify-content-between align-items-center p-3 my-2 border-top"
		>
			<div class="col-md-4 d-flex align-items-center">
				<a href="/" class="me-2 mb-md-0 text-muted text-decoration-none lh-1">
					<img class="logo" src="@/assets/logo.svg" />
				</a>
				<span class="text-muted">© 2023 Company, Inc</span>
			</div>
		</footer>
	</div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
	position: absolute;
	width: 100%;
	height: 70px;
	bottom: 0px;
	.logo {
		width: 30px;
	}
}
</style>
