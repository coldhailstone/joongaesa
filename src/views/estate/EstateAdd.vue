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
							<attachment-file @changeFile="item.photos = $event" />
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
							<b-form-select v-model="item.contractType" :options="options" />
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
							<b-form-checkbox-group
								v-model="item.managementList"
								:options="options"
								class="mt-2"
							></b-form-checkbox-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 개별 사용료 항목 </label>
							<b-form-checkbox-group
								v-model="item.hireList"
								:options="options"
								class="mt-2"
							></b-form-checkbox-group>
						</div>
						<div class="w-50">
							<label> 입주 가능일 </label>
							<b-form-input v-model="item.moveDate" type="date" />
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
							<b-form-select v-model="item.buildingType" :options="options" />
						</div>
						<div class="w-50">
							<label> 건물 이름 </label>
							<b-form-input v-model="item.buildingName" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 해당 층 </label>
							<b-form-input v-model="item.correspondingFloor" type="number" />
						</div>
						<div class="w-50">
							<label> 전체 층 </label>
							<b-form-input v-model="item.wholeFloor" type="number" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 방 개수 </label>
							<b-form-input v-model="item.roomCount" type="number" />
						</div>
						<div class="w-50">
							<label> 욕실 개수 </label>
							<b-form-input v-model="item.BathroomCount" type="number" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 공급 면적 </label>
							<b-form-input v-model="item.supplyAreaSize" />
						</div>
						<div class="w-50">
							<label> 전용 면적 </label>
							<b-form-input v-model="item.exclusiveAreaSize" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 방 거실 형태 </label>
							<b-form-select v-model="item.roomForm" :options="options" />
						</div>
						<div class="w-50">
							<label> 현관 유형 </label>
							<b-form-select v-model="item.porchType" :options="options" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 주실 방향 </label>
							<b-form-input v-model="item.sunlightDirection" />
						</div>
						<div class="w-50">
							<label> 총 세대 수 </label>
							<b-form-input v-model="item.totalHouseCount" type="number" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 총 주차 대수 </label>
							<b-form-input v-model="item.totalParkingCount" type="number" />
						</div>
						<div class="w-50">
							<label> 가능 주차 대수 </label>
							<b-form-input v-model="item.availableParkingCount" type="number" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 반려동물 여부 </label>
							<b-form-group>
								<b-form-radio v-model="item.pet" name="pet" value="Y">
									가능
								</b-form-radio>
								<b-form-radio v-model="item.pet" name="pet" value="N">
									불가능
								</b-form-radio>
							</b-form-group>
						</div>
						<div class="w-50">
							<label> 사용승인일 </label>
							<b-form-input v-model="item.useApprovalDate" type="date" />
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
							<b-form-select v-model="item.heatingMethod" :options="options" />
						</div>
						<div class="w-50">
							<label> 냉방 시설 </label>
							<b-form-input v-model="item.coolingMethod" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 생활 시설 </label>
							<b-form-checkbox-group
								v-model="item.livingFacilities"
								:options="options"
								class="mt-2"
							></b-form-checkbox-group>
						</div>
						<div class="w-50">
							<label> 보안 시설 </label>
							<b-form-checkbox-group
								v-model="item.securityFacility"
								:options="options"
								class="mt-2"
							></b-form-checkbox-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 기타 시설 </label>
							<b-form-checkbox-group
								v-model="item.OtherFacility"
								:options="options"
								class="mt-2"
							></b-form-checkbox-group>
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
				address: {},
				photos: [],
				contractType: '',
				price: '',
				managementCost: '',
				managementList: [],
				hireList: [],
				moveDate: '',
				buildingType: '',
				buildingName: '',
				correspondingFloor: '',
				wholeFloor: '',
				roomCount: '',
				BathroomCount: '',
				supplyAreaSize: '',
				exclusiveAreaSize: '',
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
			options: [
				{ text: 'Orange', value: 'orange' },
				{ text: 'Apple', value: 'apple' },
				{ text: 'Pineapple', value: 'pineapple' },
				{ text: 'Grape', value: 'grape' },
			],
		};
	},
	methods: {
		save() {
			console.log(this.item);
		},
	},
};
</script>

<style lang="scss" scoped>
.date-icon {
	right: 1rem;
	top: 10px;
	z-index: 1;
}
</style>
