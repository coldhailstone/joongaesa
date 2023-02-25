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
							<form-address
								:postcode="item.postcode"
								:address="item.address"
								:addressDetail="item.addressDetail"
								@change="changeAddress"
							/>
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
							<label> 보증금 / 월세 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									v-model="item.deposit"
									type="number"
									placeholder="보증금"
									suffix="만원"
								/>
								<form-input
									v-model="item.monthly"
									type="number"
									placeholder="월세"
									suffix="만원"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 건물 형태 </label>
							<form-radio
								v-model="item.buildingType"
								:options="options.buildingType"
								name="buildingType"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 건물 종류 </label>
							<form-radio
								v-model="item.buildingForm"
								:options="options.buildingForm"
								name="buildingForm"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 거래유형 </label>
							<form-radio
								v-model="item.contractType"
								:options="options.contractType"
								name="contractType"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 사용승인일 </label>
							<form-input v-model="item.useApprovalDate" type="date" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 동 / 호 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input v-model="item.dong" placeholder="동" suffix="동" />
								<form-input v-model="item.ho" placeholder="호" suffix="호" />
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 층 / 구조 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									v-model="item.wholeFloor"
									placeholder="전체층"
									prefix="전체층"
								/>
								<form-input
									v-model="item.correspondingFloor"
									placeholder="해당층"
									prefix="해당층"
								/>
							</div>
						</div>
						<div class="d-flex flex-wrap gap-3 mt-2">
							<span class="me-3 pt-2">구조</span>
							<form-radio
								v-model="item.roomStructure"
								:options="options.roomStructure"
								name="roomStructure"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 전용면적 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input v-model="item.pyung" placeholder="평" suffix="평" />
								<form-input
									v-model="item.m2"
									placeholder="m2"
									suffix="m<sup>2</sup>"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 주실 방향 </label>
							<form-radio
								v-model="item.roomDirection"
								:options="options.roomDirection"
								name="roomDirection"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-25">
							<label> 화장실 수 </label>
							<form-input
								v-model="item.bathroomCount"
								type="number"
								placeholder="화장실 수"
							/>
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">기타 정보</h4>
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 엘리베이터 </label>
							<form-radio
								v-model="item.elevator"
								:options="options.elevator"
								name="elevator"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 반려동물 </label>
							<form-radio v-model="item.pet" :options="options.pet" name="pet" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 주차 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<form-radio
										v-model="item.parking"
										:options="options.parking"
										name="parking"
									/>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 관리비 </label>
							<div class="w-25">
								<form-input
									v-model="item.cost"
									type="number"
									placeholder="관리비"
									suffix="만원"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 관리비 포함 항목 </label>
							<form-checkbox
								v-model="item.managementCost"
								:options="options.managementCost"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 옵션 </label>
							<form-checkbox v-model="item.option" :options="options.option" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 입주가능일 </label>
							<form-input v-model="item.moveDate" type="date" />
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">상세 설명</h4>
				<b-form>
					<b-form-row class="mb-3">
						<form-textarea v-model="item.description" />
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
import AttachmentFile from '@/components/estate/AttachmentFile.vue';
import FormAddress from '@/components/estate/form/FormAddress.vue';
import FormInput from '@/components/estate/form/FormInput.vue';
import FormTextarea from '@/components/estate/form/FormTextarea.vue';
import FormCheckbox from '@/components/estate/form/FormCheckbox.vue';
import FormRadio from '@/components/estate/form/FormRadio.vue';
import { mapActions } from 'vuex';

export default {
	name: 'EstateAdd',
	components: {
		AttachmentFile,
		FormAddress,
		FormInput,
		FormTextarea,
		FormCheckbox,
		FormRadio,
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
				elevator: [],
				parking: [],
				managementCost: [],
				option: [],
			},
			item: {
				id: '',
				userId: '',
				title: '',
				postcode: '',
				address: '',
				addressDetail: '',
				photos: [],
				deposit: 0,
				monthly: 0,
				buildingType: '',
				buildingForm: '',
				contractType: '',
				useApprovalDate: '',
				roomStructure: [],
				roomDirection: [],
				bathroomCount: 0,
				elevator: '',
				pet: '',
				parking: '',
				cost: 0,
				managementCost: [],
				option: [],
				moveDate: '',
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
		this.options.elevator = this.setOptions(ESTATE.ELEVATOR);
		this.options.parking = this.setOptions(ESTATE.PARKING);
		this.options.managementCost = this.setOptions(ESTATE.MANAGEMENT_COST);
		this.options.option = this.setOptions(ESTATE.OPTION);
	},
	methods: {
		...mapActions('estate/list', ['CREATE_ESTATE']),
		setOptions(constant) {
			return constant.map((text) => ({
				text,
				value: text,
			}));
		},
		changeAddress({ postcode, address, addressDetail }) {
			this.item.postcode = postcode;
			this.item.address = address;
			this.item.addressDetail = addressDetail;
		},
		async save() {
			if (!this.item.title) {
				return this.$notify({
					type: 'error',
					text: '제목은 필수값입니다.',
				});
			}

			try {
				const response = await this.CREATE_ESTATE(this.item);
				console.log(response);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			}
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
