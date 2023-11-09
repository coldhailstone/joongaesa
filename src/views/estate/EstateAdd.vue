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
							<label> 관리비 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									v-model="item.cost"
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
								v-model="item.managementCost"
								:options="common.setOptions(ESTATE.MANAGEMENT_COST)"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 거래유형 </label>
							<form-radio
								v-model="item.contractType"
								:options="common.setOptions(ESTATE.CONTRACT_TYPE)"
								name="contractType"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 건물형태 </label>
							<form-radio
								v-model="item.buildingType"
								:options="common.setOptions(ESTATE.BUILDING_TYPE)"
								name="buildingType"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 건물종류 </label>
							<form-radio
								v-model="item.buildingForm"
								:options="common.setOptions(ESTATE.BUILDING_FORM)"
								name="buildingForm"
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
								:options="common.setOptions(ESTATE.ROOM_STRUCTURE)"
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
					<b-form-row>
						<div class="w-100">
							<label> 주실 방향 </label>
							<form-radio
								v-model="item.roomDirection"
								:options="common.setOptions(ESTATE.ROOM_DIRECTION)"
								name="roomDirection"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 화장실 수 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									v-model="item.bathroomCount"
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
								v-model="item.elevator"
								:options="common.setOptions(ESTATE.ELEVATOR)"
								name="elevator"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 반려동물 </label>
							<form-radio
								v-model="item.pet"
								:options="common.setOptions(ESTATE.PET)"
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
										v-model="item.parking"
										:options="common.setOptions(ESTATE.PARKING)"
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
								v-model="item.option"
								:options="common.setOptions(ESTATE.OPTION)"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 입주가능일 </label>
							<form-input v-model="item.moveDate" type="date" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 임대인 연락처 </label>
							<form-input v-model="item.landLordPhone" type="number" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 현 임차인 연락처 </label>
							<form-input v-model="item.currentLesseePhone" type="number" />
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
	</b-overlay>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import { ESTATE } from '@/utils/constants';
import common from '@/utils/common';
import FormFile from '@/components/form/FormFile.vue';
import FormAddress from '@/components/form/FormAddress.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';
import FormRadio from '@/components/form/FormRadio.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const { notify } = useNotification();

let item = ref({
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
	landLordPhone: 0,
	currentLesseePhone: 0,
	description: '',
});
let isLoading = ref(false);
const isUpdate = computed(() => !!route.params.id);
const estate = computed(() => store.state.estate.detail.estate);
const fetchEstate = (id) => store.dispatch('estate/detail/FETCH_ESTATE', id);
const fetchDetail = async () => {
	try {
		isLoading.value = true;
		await fetchEstate(route.params.id);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
onBeforeMount(async () => {
	if (isUpdate.value) {
		await fetchDetail();
		item.value = common.cloneDeep(estate.value);
	}
});

const updateEstate = (id, body) => store.dispatch('estate/detail/UPDATE_ESTATE', { id, body });
const createEstate = (body) => store.dispatch('estate/list/CREATE_ESTATE', body);
const validation = () => {
	if (!item.value.title) {
		notify({ type: 'error', text: '제목은 필수값입니다.' });
		return false;
	}
	if (!item.value.contractType) {
		notify({ type: 'error', text: '거래유형은 필수값입니다.' });
		return false;
	}
	if (!item.value.deposit || !item.value.monthly) {
		notify({ type: 'error', text: '보증금/월세는 필수값입니다.' });
		return false;
	}
	return true;
};
const save = async () => {
	if (!validation()) return;

	try {
		isLoading.value = true;
		if (isUpdate.value) {
			await updateEstate(route.params.id, item.value);
			notify({ type: 'success', text: '매물이 수정되었습니다.' });
		} else {
			await createEstate(item.value);
			notify({ type: 'success', text: '매물이 등록되었습니다.' });
		}
		router.push('/estate');
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};

const changeAddress = ({ postcode, address, addressDetail }) => {
	item.value.postcode = postcode;
	item.value.address = address;
	item.value.addressDetail = addressDetail;
};
</script>

<style lang="scss" scoped>
label {
	color: rgb(54, 58, 60);
	font-weight: 700;
	margin-top: 8px;
}
</style>
