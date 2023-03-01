<template>
	<b-overlay class="h-100" :show="isLoading" rounded="sm">
		<div class="container mt-3 mb-3 d-flex flex-column gap-4">
			<h1 class="mb-4 fw-bold">{{ $route.name }}</h1>
			<div>
				<h4 class="mb-3 fw-bold">기본 정보</h4>
				<hr />
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 제목 </label>
							<b-form-input v-model="item.title" placeholder="제목" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 원본 링크 </label>
							<b-form-input v-model="item.link" placeholder="원본 링크" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 주소 </label>
							<form-address
								:postcode="item.postcode"
								:address="item.address"
								:addressDetail="item.addressDetail"
								@changeAddress="changeAddress"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 사진 </label>
							<form-file :list="item.photo" @changeFile="item.photo = $event" />
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">거래 정보</h4>
				<hr />
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 보증금 / 월세 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.deposit"
									@update:modelValue="item.deposit = $event"
									type="number"
									placeholder="보증금"
									suffix="만원"
								/>
								<form-input
									:value="item.monthly"
									@update:modelValue="item.monthly = $event"
									type="number"
									placeholder="월세"
									suffix="만원"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 관리비 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.cost"
									@update:modelValue="item.cost = $event"
									type="number"
									placeholder="관리비"
									suffix="만원"
								/>
								<template></template>
							</div>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 관리비 포함 항목 </label>
							<form-checkbox
								:value="item.managementCost"
								@update:modelValue="item.managementCost = $event"
								:options="setOptions(ESTATE.MANAGEMENT_COST)"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 거래유형 </label>
							<form-radio
								:value="item.contractType"
								@update:modelValue="item.contractType = $event"
								:options="setOptions(ESTATE.CONTRACT_TYPE)"
								name="contractType"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 건물형태 </label>
							<form-radio
								:value="item.buildingType"
								@update:modelValue="item.buildingType = $event"
								:options="setOptions(ESTATE.BUILDING_TYPE)"
								name="buildingType"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 건물종류 </label>
							<form-radio
								:value="item.buildingForm"
								@update:modelValue="item.buildingForm = $event"
								:options="setOptions(ESTATE.BUILDING_FORM)"
								name="buildingForm"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 사용승인일 </label>
							<form-input
								:value="item.useApprovalDate"
								@update:modelValue="item.useApprovalDate = $event"
								type="date"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 동 / 호 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.dong"
									@update:modelValue="item.dong = $event"
									placeholder="동"
									suffix="동"
								/>
								<form-input
									:value="item.ho"
									@update:modelValue="item.ho = $event"
									placeholder="호"
									suffix="호"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 층 / 구조 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.wholeFloor"
									@update:modelValue="item.wholeFloor = $event"
									placeholder="전체층"
									prefix="전체층"
								/>
								<form-input
									:value="item.correspondingFloor"
									@update:modelValue="item.correspondingFloor = $event"
									placeholder="해당층"
									prefix="해당층"
								/>
							</div>
						</div>
						<div class="d-flex flex-wrap gap-3 mt-2">
							<span class="me-3 pt-2">구조</span>
							<form-radio
								:value="item.roomStructure"
								@update:modelValue="item.roomStructure = $event"
								:options="setOptions(ESTATE.ROOM_STRUCTURE)"
								name="roomStructure"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 전용면적 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.pyung"
									@update:modelValue="item.pyung = $event"
									placeholder="평"
									suffix="평"
								/>
								<form-input
									:value="item.m2"
									@update:modelValue="item.m2 = $event"
									placeholder="m2"
									suffix="m<sup>2</sup>"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 주실 방향 </label>
							<form-radio
								:value="item.roomDirection"
								@update:modelValue="item.roomDirection = $event"
								:options="setOptions(ESTATE.ROOM_DIRECTION)"
								name="roomDirection"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 화장실 수 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.bathroomCount"
									@update:modelValue="item.bathroomCount = $event"
									type="number"
									placeholder="화장실 수"
								/>
								<template></template>
							</div>
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">기타 정보</h4>
				<hr />
				<b-form>
					<b-form-row>
						<div class="w-100">
							<label> 엘리베이터 </label>
							<form-radio
								:value="item.elevator"
								@update:modelValue="item.elevator = $event"
								:options="setOptions(ESTATE.ELEVATOR)"
								name="elevator"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 반려동물 </label>
							<form-radio
								:value="item.pet"
								@update:modelValue="item.pet = $event"
								:options="setOptions(ESTATE.PET)"
								name="pet"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 주차 </label>
							<b-form-group>
								<div class="d-flex flex-wrap gap-3 mt-2">
									<form-radio
										:value="item.parking"
										@update:modelValue="item.parking = $event"
										:options="setOptions(ESTATE.PARKING)"
										name="parking"
									/>
								</div>
							</b-form-group>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 옵션 </label>
							<form-checkbox
								:value="item.option"
								@update:modelValue="item.option = $event"
								:options="setOptions(ESTATE.OPTION)"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 입주가능일 </label>
							<form-input
								:value="item.moveDate"
								@update:modelValue="item.moveDate = $event"
								type="date"
							/>
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">상세 설명</h4>
				<b-form>
					<b-form-row class="mb-3">
						<form-textarea
							:value="item.description"
							@update:modelValue="item.description = $event"
						/>
					</b-form-row>
				</b-form>
			</div>
			<div class="d-flex flex-row-reverse gap-3">
				<b-button variant="primary" @click="save"> 저장 </b-button>
				<b-button @click="$router.go(-1)"> 취소 </b-button>
			</div>
		</div>
	</b-overlay>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ESTATE } from '@/utils/constants';
import FormFile from '@/components/form/FormFile.vue';
import FormAddress from '@/components/form/FormAddress.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';
import FormRadio from '@/components/form/FormRadio.vue';

export default {
	name: 'EstateAdd',
	components: {
		FormFile,
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
			ESTATE,
			isLoading: false,
			item: {
				title: '',
				link: '',
				postcode: '',
				address: '',
				addressDetail: '',
				photo: [],
				deposit: 0,
				monthly: 0,
				contractType: '',
				buildingType: '',
				buildingForm: '',
				useApprovalDate: '',
				dong: '',
				ho: '',
				wholeFloor: '',
				correspondingFloor: '',
				roomStructure: '',
				pyung: '',
				m2: '',
				roomDirection: '',
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
	computed: {
		...mapState('user', ['user']),
		...mapState('estate/detail', ['estate']),
		isUpdate() {
			return !!this.$route.params.id;
		},
	},
	async created() {
		if (this.isUpdate) {
			await this.fetchDetail();
			this.item = this.$_.cloneDeep(this.estate);
		}
	},
	methods: {
		...mapActions('estate/list', ['CREATE_ESTATE']),
		...mapActions('estate/detail', ['FETCH_ESTATE', 'UPDATE_ESTATE']),
		async fetchDetail() {
			try {
				this.isLoading = true;

				await this.FETCH_ESTATE(this.$route.params.id);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
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
			if (!this.validation()) return;

			try {
				this.isLoading = true;

				if (this.isUpdate) {
					await this.UPDATE_ESTATE({ id: this.$route.params.id, body: this.item });
					this.$notify({
						type: 'success',
						text: '매물이 수정되었습니다.',
					});
				} else {
					await this.CREATE_ESTATE(this.item);
					this.$notify({
						type: 'success',
						text: '매물이 등록되었습니다.',
					});
				}
				this.$router.push('/estate');
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		validation() {
			if (!this.item.title) {
				this.$notify({
					type: 'error',
					text: '제목은 필수값입니다.',
				});
				return false;
			}
			if (!this.item.contractType) {
				this.$notify({
					type: 'error',
					text: '거래유형은 필수값입니다.',
				});
				return false;
			}
			if (!this.item.deposit || !this.item.monthly) {
				this.$notify({
					type: 'error',
					text: '보증금/월세는 필수값입니다.',
				});
				return false;
			}
			return true;
		},
	},
};
</script>

<style lang="scss" scoped>
label {
	color: rgb(54, 58, 60);
	font-weight: 700;
	margin-top: 8px;
}
</style>
