<template>
	<div id="modal-estate" class="modal" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">매물 상세</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body d-flex flex-column gap-5">
					<b-carousel
						controls
						indicators
						background="#ababab"
						img-width="1024"
						img-height="480"
					>
						<b-carousel-slide
							img-src="https://picsum.photos/1024/480/?image=58"
							active
						></b-carousel-slide>
					</b-carousel>
					<div>
						<h4 class="fw-bold">
							신논현역 5분 역대급 2룸 가성비 이 금액대 이런방 못구합니다 조용한동네
						</h4>
						<span>등록일: 2023-02-22</span>
					</div>
					<div>
						<h4 class="fw-bold">거래 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 계약 형태 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 가격 정보 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										공용 관리비
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										공용 관리비 항목
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										개별 사용료 항목
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										입주 가능일
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<h4 class="fw-bold">방 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 건물 유형 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 건물 이름 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 해당 층 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 전체 층 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 방 개수 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 욕실 개수 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 공급 면적 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 전용 면적 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										방 거실 형태
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 현관 유형 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 주실 방향 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 총 세대 수 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										총 주차 대수
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										가능 주차 대수
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref">
										반려동물 여부
									</label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 사용승인일 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<h4 class="fw-bold">시설 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 난방 방식 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 냉방 시설 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 생활 시설 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 보안 시설 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label for="inline-form-custom-select-pref"> 기타 시설 </label>
									<b-form-input
										id="inline-form-custom-select-pref"
										type="email"
									></b-form-input>
								</div>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<h4 class="fw-bold">상세 설명</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-100">
									<b-form-textarea
										v-model="item.description"
										rows="5"
										noResize
									></b-form-textarea>
								</div>
							</b-form-row>
						</b-form>
					</div>
				</div>
				<div class="modal-footer">
					<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
					<b-button type="button" variant="danger">삭제</b-button>
					<b-button type="button" variant="primary">저장</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'ModalEstate',
	props: {
		id: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			item: {
				description: '',
			},
		};
	},
	computed: {
		...mapState('estate/detail', ['estate']),
	},
	mounted() {
		const modal = document.querySelector('#modal-estate');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(() => {
				this.fetchDetail();
			});
		});
	},
	methods: {
		...mapActions('estate/detail', ['FETCH_ESTATE']),
		async fetchDetail() {
			await this.FETCH_ESTATE(this.id);
			console.log(this.estate);
		},
	},
};
</script>
