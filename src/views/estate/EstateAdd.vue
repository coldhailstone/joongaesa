<template>
	<div>
		<div class="container mt-3 mb-3 d-flex flex-column gap-4">
			<h1 class="mb-4 fw-bold">{{ $route.name }}</h1>
			<div>
				<h4 class="mb-3 fw-bold">매물 정보</h4>
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
								@changeFile="item.photos = $event"
							/>
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">거래 정보</h4>
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
							<b-form-input v-model="item.managementCost" />
						</div>
						<div class="w-50">
							<label> 공용 관리비 항목 </label>
							<b-form-input v-model="item.managementList" />
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
				<h4 class="mb-3 fw-bold">방 정보</h4>
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
							<b-form-input v-model="item.correspondingFloor" />
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
							<b-form-input v-model="item.BathroomCount" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 공급 면적 </label>
							<b-form-input v-model="item.supplyArea" />
						</div>
						<div class="w-50">
							<label> 전용 면적 </label>
							<b-form-input v-model="item.exclusiveArea" />
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
							<b-form-input v-model="item.sunlightDirection" />
						</div>
						<div class="w-50">
							<label> 총 세대 수 </label>
							<b-form-input v-model="item.totalHouseCount" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 총 주차 대수 </label>
							<b-form-input v-model="item.totalParkingCount" />
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
							<b-form-input v-model="item.useApprovalDate" />
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">시설 정보</h4>
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 난방 방식 </label>
							<b-form-input v-model="item.heatingMethod" />
						</div>
						<div class="w-50">
							<label> 냉방 시설 </label>
							<b-form-input v-model="item.coolingMethod" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 생활 시설 </label>
							<b-form-input v-model="item.livingFacilities" />
						</div>
						<div class="w-50">
							<label> 보안 시설 </label>
							<b-form-input v-model="item.securityFacility" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 기타 시설 </label>
							<b-form-input v-model="item.OtherFacility" />
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">상세 설명</h4>
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
			<div class="d-flex flex-row-reverse gap-3">
				<b-button variant="primary" @click="save"> 저장 </b-button>
				<b-button @click="$router.go(-1)"> 취소 </b-button>
			</div>
		</div>
	</div>
</template>

<script>
import AttachmentFile from '@/components/estate/AttachmentFile.vue';

export default {
	name: 'EstateAdd',
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
		};
	},
	methods: {
		save() {
			console.log(this.item);
		},
	},
};
</script>
