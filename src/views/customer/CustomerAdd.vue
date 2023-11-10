<template>
	<b-overlay class="h-100" :show="isLoading" rounded="sm">
		<div class="container mt-3 mb-3 d-flex flex-column gap-4">
			<h1 class="mb-4 fw-bold">{{ $route.name }}</h1>
			<div>
				<h4 class="mb-3 fw-bold">기본 정보</h4>
				<hr />
				<b-form>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 연락처 </label>
							<form-input v-model="item.phone" type="number" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 방문일시 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input v-model="item.visitDate" type="date" />
								<form-input v-model="item.visitTime" type="time" />
							</div>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 성별 </label>
							<form-radio
								v-model="item.gender"
								:options="common.setOptions(CUSTOMER.GENDER)"
								name="gender"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 연령대 </label>
							<form-input v-model="item.age" type="number" placeholder="연령대" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 문의주신 방 </label>
							<div v-if="item.links.length === 1" class="d-flex gap-3 mt-2">
								<b-form-input
									v-model="item.links[0].url"
									placeholder="링크"
									style="flex: 3"
								/>
								<b-form-input
									v-model="item.links[0].memo"
									placeholder="메모"
									style="flex: 1"
								/>
								<b-button
									variant="primary"
									@click="item.links.push({ url: '', memo: '' })"
								>
									+
								</b-button>
							</div>
							<div
								v-else
								v-for="(link, index) of item.links"
								:key="index"
								class="d-flex gap-3 mt-2"
							>
								<b-form-input
									v-model="link.url"
									placeholder="링크"
									style="flex: 3"
								/>
								<b-form-input
									v-model="link.memo"
									placeholder="메모"
									style="flex: 1"
								/>
								<b-button
									v-if="index > 0"
									variant="danger"
									@click="item.links.splice(index, 1)"
								>
									-
								</b-button>
								<b-button
									v-else
									variant="primary"
									@click="item.links.push({ url: '', memo: '' })"
								>
									+
								</b-button>
							</div>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 건물형태 </label>
							<form-radio
								v-model="item.buildingType"
								:options="common.setOptions(CUSTOMER.BUILDING_TYPE)"
								name="buildingType"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 거래유형 </label>
							<form-radio
								v-model="item.contractType"
								:options="common.setOptions(CUSTOMER.CONTRACT_TYPE)"
								name="contractType"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 기간 </label>
							<b-form-input v-model="item.residence" placeholder="기간" />
						</div>
					</b-form-row>
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
					<b-form-row>
						<div class="w-100">
							<label> 대출여부 </label>
							<form-radio
								v-model="item.loan"
								:options="common.setOptions(CUSTOMER.OX)"
								name="loan"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 대출상품 </label>
							<b-form-input v-model="item.loanProduct" placeholder="대출상품" />
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 근생여부 </label>
							<form-radio
								v-model="item.geunlin"
								:options="common.setOptions(CUSTOMER.OX)"
								name="geunlin"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 위치 </label>
							<b-form-input v-model="item.position" placeholder="위치" />
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 입주날짜 </label>
							<form-input v-model="item.moveDate" type="date" />
						</div>
					</b-form-row>
				</b-form>
			</div>
			<div>
				<h4 class="mb-3 fw-bold">상세 정보</h4>
				<hr />
				<b-form>
					<b-form-row>
						<div class="w-100">
							<label> 엘리베이터 </label>
							<form-radio
								v-model="item.elevator"
								:options="common.setOptions(CUSTOMER.OX)"
								name="elevator"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 반려동물 </label>
							<form-radio
								v-model="item.pet"
								:options="common.setOptions(CUSTOMER.OX)"
								name="pet"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 주차 </label>
							<form-radio
								v-model="item.parking"
								:options="common.setOptions(CUSTOMER.OX)"
								name="parking"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 화장실 창문 </label>
							<form-radio
								v-model="item.window"
								:options="common.setOptions(CUSTOMER.OX)"
								name="window"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 컨디션 </label>
							<form-radio
								v-model="item.condition"
								:options="common.setOptions(CUSTOMER.CONDITION)"
								name="condition"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 구조 </label>
							<form-radio
								v-model="item.roomStructure"
								:options="common.setOptions(CUSTOMER.ROOM_STRUCTURE)"
								name="roomStructure"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 채광 </label>
							<form-radio
								v-model="item.roomDirection"
								:options="common.setOptions(CUSTOMER.ROOM_DIRECTION)"
								name="roomDirection"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 층수 </label>
							<form-radio
								v-model="item.floor"
								:options="common.setOptions(CUSTOMER.FLOOR)"
								name="floor"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 옵션 </label>
							<form-radio
								v-model="item.option"
								:options="common.setOptions(CUSTOMER.OPTION)"
								name="option"
							/>
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
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import { CUSTOMER } from '@/utils/constants';
import common from '@/utils/common';
import FormInput from '@/components/form/FormInput.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormRadio from '@/components/form/FormRadio.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const { notify } = useNotification();
const isUpdate = computed(() => !!route.params.id);
let isLoading = ref(false);
let item = ref({
	phone: 0,
	visitDate: '',
	visitTime: '',
	gender: '',
	age: 0,
	links: [{ url: '', memo: '' }],
	buildingType: '',
	contractType: '',
	residence: '',
	deposit: 0,
	monthly: 0,
	loan: '',
	loanProduct: '',
	geunlin: '',
	position: '',
	moveDate: '',
	elevator: '',
	pet: '',
	parking: '',
	window: '',
	condition: '',
	roomStructure: '',
	roomDirection: '',
	floor: '',
	option: '',
	description: '',
});

const today = computed(() => new Date().toISOString().substring(0, 10));
const currentTime = computed(() => {
	const date = new Date();
	const hh = date.getHours();
	const mm = date.getMinutes();
	return `${hh >= 10 ? hh : `0${hh}`}:${mm >= 10 ? mm : `0${mm}`}`;
});
onMounted(() => {
	if (!isUpdate.value) {
		item.value.visitTime = currentTime.value;
		item.value.visitDate = today.value;
		item.value.moveDate = today.value;
	}
});

const customer = computed(() => store.state.customer.detail.customer);
const fetchCustomer = (id) => store.dispatch('customer/detail/FETCH_CUSTOMER', id);
const updateCustomer = (payload) => store.dispatch('customer/detail/UPDATE_CUSTOMER', payload);
const createCustomer = (payload) => store.dispatch('customer/list/CREATE_CUSTOMER', payload);
const fetchDetail = async () => {
	try {
		isLoading.value = true;
		await fetchCustomer(route.params.id);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
onBeforeMount(async () => {
	if (isUpdate.value) {
		await fetchDetail();
		item.value = common.cloneDeep(customer.value);
	}
});

const validation = () => {
	if (!item.value.phone) {
		notify({ type: 'error', text: '연락처는 필수값입니다.' });
		return false;
	}
	return true;
};
const save = async () => {
	if (!validation()) return;

	try {
		isLoading.value = true;
		if (isUpdate.value) {
			await updateCustomer({ id: route.params.id, body: item.value });
			notify({ type: 'success', text: '고객이 수정되었습니다.' });
		} else {
			await createCustomer(item.value);
			notify({ type: 'success', text: '고객이 등록되었습니다.' });
		}
		router.push('/customer');
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
</script>

<style lang="scss" scoped>
label {
	color: rgb(54, 58, 60);
	font-weight: 700;
	margin-top: 8px;
}
</style>
