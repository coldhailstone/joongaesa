<template>
	<div id="modal-estate-add" class="modal" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{{ title }}</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body d-flex flex-column gap-5">
					<div>
						<h4 class="fw-bold">매물 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-100">
									<label> 제목 </label>
									<b-form-input v-model="item.title" />
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-100">
									<label> 사진 </label>
									<attachment-file
										@change="item.photos = $event"
									/>
								</div>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<h4 class="fw-bold">거래 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 계약 형태 </label>
									<b-form-input v-model="item.contractType" />
								</div>
								<div class="w-50">
									<label> 가격 정보 </label>
									<b-form-input v-model="item.price" />
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 공용 관리비 </label>
									<b-form-input
										v-model="item.managementCost"
									/>
								</div>
								<div class="w-50">
									<label> 공용 관리비 항목 </label>
									<b-form-input
										v-model="item.managementList"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 개별 사용료 항목 </label>
									<b-form-input v-model="item.hire" />
								</div>
								<div class="w-50">
									<label> 입주 가능일 </label>
									<b-form-input v-model="item.moveDate" />
								</div>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<h4 class="fw-bold">방 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 건물 유형 </label>
									<b-form-input v-model="item.buildingType" />
								</div>
								<div class="w-50">
									<label> 건물 이름 </label>
									<b-form-input v-model="item.buildingName" />
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 해당 층 </label>
									<b-form-input
										v-model="item.correspondingFloor"
									/>
								</div>
								<div class="w-50">
									<label> 전체 층 </label>
									<b-form-input v-model="item.wholeFloor" />
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 방 개수 </label>
									<b-form-input v-model="item.roomCount" />
								</div>
								<div class="w-50">
									<label> 욕실 개수 </label>
									<b-form-input
										v-model="item.BathroomCount"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 공급 면적 </label>
									<b-form-input v-model="item.supplyArea" />
								</div>
								<div class="w-50">
									<label> 전용 면적 </label>
									<b-form-input
										v-model="item.exclusiveArea"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 방 거실 형태 </label>
									<b-form-input v-model="item.roomForm" />
								</div>
								<div class="w-50">
									<label> 현관 유형 </label>
									<b-form-input v-model="item.porchType" />
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 주실 방향 </label>
									<b-form-input
										v-model="item.sunlightDirection"
									/>
								</div>
								<div class="w-50">
									<label> 총 세대 수 </label>
									<b-form-input
										v-model="item.totalHouseCount"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 총 주차 대수 </label>
									<b-form-input
										v-model="item.totalParkingCount"
									/>
								</div>
								<div class="w-50">
									<label> 가능 주차 대수 </label>
									<b-form-input
										v-model="item.availableParkingCount"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 반려동물 여부 </label>
									<b-form-input v-model="item.pet" />
								</div>
								<div class="w-50">
									<label> 사용승인일 </label>
									<b-form-input
										v-model="item.useApprovalDate"
									/>
								</div>
							</b-form-row>
						</b-form>
					</div>
					<div>
						<h4 class="fw-bold">시설 정보</h4>
						<b-form>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 난방 방식 </label>
									<b-form-input
										v-model="item.heatingMethod"
									/>
								</div>
								<div class="w-50">
									<label> 냉방 시설 </label>
									<b-form-input
										v-model="item.coolingMethod"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 생활 시설 </label>
									<b-form-input
										v-model="item.livingFacilities"
									/>
								</div>
								<div class="w-50">
									<label> 보안 시설 </label>
									<b-form-input
										v-model="item.securityFacility"
									/>
								</div>
							</b-form-row>
							<b-form-row class="mb-3">
								<div class="w-50">
									<label> 기타 시설 </label>
									<b-form-input
										v-model="item.OtherFacility"
									/>
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
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						닫기
					</button>
					<button type="button" class="btn btn-primary">저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AttachmentFile from '@/components/estate/AttachmentFile.vue';

export default {
	name: 'ModalEstateAdd',
	components: {
		AttachmentFile,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		id: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			item: {
				title: '',
				photos: [],
				contractType: '',
				price: '',
				managementCost: '',
				managementList: '',
				hire: '',
				moveDate: '',
				buildingType: '',
				buildingName: '',
				correspondingFloor: '',
				wholeFloor: '',
				roomCount: '',
				BathroomCount: '',
				supplyArea: '',
				exclusiveArea: '',
				roomForm: '',
				porchType: '',
				sunlightDirection: '',
				totalHouseCount: '',
				totalParkingCount: '',
				availableParkingCount: '',
				pet: '',
				useApprovalDate: '',
				heatingMethod: '',
				coolingMethod: '',
				livingFacilities: '',
				securityFacility: '',
				OtherFacility: '',
				description: '',
			},
			attachments: [],
		};
	},
	mounted() {
		const modal = document.querySelector('#modal-estate-add');
		modal.addEventListener('show.bs.modal', () => {
			console.log('show');
		});
	},
};
</script>

<style lang="scss" scoped>
.modal {
	text-align: center;
	padding: 0 !important;
}
.modal:before {
	content: '';
	display: inline-block;
	height: 100%;
	vertical-align: middle;
	margin-right: -4px;
}
.modal-dialog {
	display: inline-block;
	text-align: left;
	vertical-align: middle;
}
.modal-body {
	max-height: 690px;
	overflow: auto;
}
</style>
