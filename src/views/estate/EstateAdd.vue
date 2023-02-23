<template>
	<div>
		<div class="container mt-3 mb-3 d-flex flex-column gap-4">
			<h1 class="mb-4 fw-bold">{{ $route.name }}</h1>
			<div>
				<h4 class="mb-3 fw-bold">기본 정보</h4>
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 제목 </label>
							<b-form-input v-model="item.title" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 주소 </label>
							<div class="mb-2">
								<b-button @click="openDaumPostcode">주소검색</b-button>
							</div>
							<div class="d-flex flex-column gap-2">
								<b-form-input
									v-model="item.postcode"
									class="w-25"
									placeholder="우편번호"
									disabled
								/>
								<b-form-input v-model="item.address" placeholder="주소" disabled />
								<b-form-input v-model="item.addressDetail" placeholder="상세주소" />
							</div>
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
						<div class="w-100">
							<label> 건물 형태 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<b-form-radio
										v-for="form of options.buildingType"
										:key="form.value"
										v-model="item.buildingType"
										:value="form.value"
										name="buildingType"
									>
										{{ form.text }}
									</b-form-radio>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 사용승인일 </label>
							<b-form-input v-model="item.useApprovalDate" type="date" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 건물 종류 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<b-form-radio
										v-for="form of options.buildingForm"
										:key="form.value"
										v-model="item.buildingForm"
										:value="form.value"
										name="buildingForm"
									>
										{{ form.text }}
									</b-form-radio>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 거래유형 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<b-form-radio
										v-for="form of options.contractType"
										:key="form.value"
										v-model="item.contractType"
										:value="form.value"
										name="contractType"
									>
										{{ form.text }}
									</b-form-radio>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 동 / 호 </label>
							<div class="d-flex gap-3 mt-2">
								<div class="d-flex align-items-center gap-1 w-25">
									<b-form-input v-model="item.title" placeholder="동" />
									<span>동</span>
								</div>
								<div class="d-flex align-items-center gap-1 w-25">
									<b-form-input v-model="item.title" placeholder="호" />
									<span>호</span>
								</div>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 층 / 구조 </label>
							<div class="d-flex gap-3 mt-2">
								<div class="d-flex align-items-center gap-1">
									<span class="w-25">전체층</span>
									<b-form-input v-model="item.title" placeholder="전체층" />
								</div>
								<div class="d-flex align-items-center gap-1">
									<span class="w-25">해당층</span>
									<b-form-input v-model="item.title" placeholder="해당층" />
								</div>
							</div>
						</div>
						<div class="d-flex flex-wrap gap-3 mt-2">
							<span class="me-3">구조</span>
							<b-form-radio
								v-for="form of options.roomStructure"
								:key="form.value"
								v-model="item.roomStructure"
								:value="form.value"
								name="roomStructure"
							>
								{{ form.text }}
							</b-form-radio>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 전용면적 </label>
							<div class="d-flex gap-3 mt-2">
								<div class="d-flex align-items-center gap-1 w-25">
									<b-form-input v-model="item.title" placeholder="평" />
									<span>평</span>
								</div>
								<div class="d-flex align-items-center gap-1 w-25">
									<b-form-input v-model="item.title" placeholder="m2" />
									<span>m<sup>2</sup></span>
								</div>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 주실 방향 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<b-form-radio
										v-for="form of options.roomDirection"
										:key="form.value"
										v-model="item.roomDirection"
										:value="form.value"
										name="roomDirection"
									>
										{{ form.text }}
									</b-form-radio>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-25">
							<label> 화장실 수 </label>
							<b-form-input v-model="item.correspondingFloor" type="number" />
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">기타 정보</h4>
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 반려동물 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<b-form-radio
										v-for="form of options.pet"
										:key="form.value"
										v-model="item.pet"
										:value="form.value"
										name="pet"
									>
										{{ form.text }}
									</b-form-radio>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 주차 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<b-form-radio
										v-for="form of options.parking"
										:key="form.value"
										v-model="item.parking"
										:value="form.value"
										name="parking"
									>
										{{ form.text }}
									</b-form-radio>
								</div>
							</b-form-group>
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
import { ESTATE } from '@/utils/constants';
import daumPostcode from '@/api/daumPostcode';
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
			options: {
				buildingType: [],
				buildingForm: [],
				contractType: [],
				roomStructure: [],
				roomDirection: [],
				pet: [],
				parking: [],
			},
			item: {
				title: '',
				postcode: '',
				address: '',
				addressDetail: '',
				photos: [],
				buildingType: [],
				buildingForm: [],
				contractType: [],
				roomStructure: [],
				roomDirection: [],
				price: '',
				managementCost: '',
				managementCostList: [],
				hireList: [],
				moveDate: '',
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
				parking: '',
				useApprovalDate: '',
				heatingMethod: '',
				coolingMethod: '',
				livingFacilities: [],
				securityFacility: [],
				otherFacility: [],
				description: '',
			},
		};
	},
	created() {
		this.options.buildingType = this.setOptions(ESTATE.BUILDING_TYPE);
		this.options.buildingForm = this.setOptions(ESTATE.BUILDING_FORM);
		this.options.contractType = this.setOptions(ESTATE.CONTRACT_TYPE);
		this.options.roomStructure = this.setOptions(ESTATE.ROOM_STRUCTURE);
		this.options.roomDirection = this.setOptions(ESTATE.ROOM_DIRECTION);
		this.options.pet = this.setOptions(ESTATE.PET);
		this.options.parking = this.setOptions(ESTATE.PARKING);
	},
	methods: {
		setOptions(constant) {
			return constant.map((text) => ({
				text,
				value: text,
			}));
		},
		async openDaumPostcode() {
			const result = await daumPostcode(window);
			this.item.postcode = result.zonecode;
			this.item.address = result.roadAddress;
			this.item.addressDetail = '';
		},
		save() {
			console.log(this.item);
		},
	},
};
</script>

<style lang="scss" scoped>
label {
	color: rgb(54, 58, 60);
	font-weight: 500;
}
</style>
