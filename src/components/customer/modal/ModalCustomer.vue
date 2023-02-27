<template>
	<div id="modal-customer" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">고객 상세</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body d-flex flex-column gap-5">몸통</div>
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
						<b-button type="button" variant="danger">삭제</b-button>
						<b-button type="button" variant="primary">수정</b-button>
					</div>
				</div>
			</div>
		</b-overlay>
	</div>
</template>

<script>
export default {
	name: 'ModalCustomer',
	data() {
		return {
			isLoading: false,
		};
	},
};
</script>
