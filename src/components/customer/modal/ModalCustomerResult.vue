<template>
	<div id="modal-customer-result" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">방문 결과</h3>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<div class="d-flex flex-column gap-3">
							<div class="section-card">
								<h5 class="section-title">재방문</h5>
								<b-form>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 재방문여부 </label>
											<form-radio
												v-model="item.revisit"
												:options="common.setOptions(CUSTOMER.OX)"
												name="revisit"
											/>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-100">
											<label> 재방문일시 </label>
											<div class="d-flex gap-3 mt-2">
												<form-input
													v-model="item.revisitDate"
													type="date"
												/>
												<form-input
													v-model="item.revisitTime"
													type="time"
												/>
											</div>
										</div>
									</b-form-row>
								</b-form>
							</div>
							<div class="section-card">
								<h5 class="section-title">계약 정보</h5>
								<b-form>
									<b-form-row class="mb-3">
										<div class="w-100">
											<label> 계약일자 / 입주일자 </label>
											<div class="d-flex gap-3 mt-2">
												<form-input
													v-model="item.contractDate"
													type="date"
												/>
												<form-input v-model="item.moveDate" type="date" />
											</div>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-100">
											<label> 계약주소 </label>
											<form-address
												:postcode="item.contractAddress.postcode"
												:address="item.contractAddress.address"
												:addressDetail="item.contractAddress.addressDetail"
												@changeAddress="
													changeAddress('contractAddress', $event)
												"
											/>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-100">
											<label> 보증금 / 계약금 </label>
											<div class="d-flex gap-3 mt-2">
												<form-input
													v-model="item.deposit"
													type="number"
													placeholder="보증금"
													suffix="만원"
												/>
												<form-input
													v-model="item.downPayment"
													type="number"
													placeholder="계약금"
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
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 현 임차인 연락처 </label>
											<form-input
												v-model="item.currentLesseePhone"
												type="number"
											/>
										</div>
									</b-form-row>
								</b-form>
							</div>
							<div class="section-card">
								<h5 class="section-title">임차인</h5>
								<b-form>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 성함 </label>
											<form-input v-model="item.lessee.name" />
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 주민등록번호 </label>
											<form-input v-model="item.lessee.registrationNumber" />
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 연락처 </label>
											<form-input v-model="item.lessee.phone" type="number" />
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 비상연락처 </label>
											<form-input
												v-model="item.lessee.emergencyPhone"
												type="number"
											/>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-100">
											<label> 주소 </label>
											<form-address
												:postcode="item.lessee.postcode"
												:address="item.lessee.address"
												:addressDetail="item.lessee.addressDetail"
												@changeAddress="changeAddress('lessee', $event)"
											/>
										</div>
									</b-form-row>
								</b-form>
							</div>
							<div class="section-card">
								<h5 class="section-title">임대인</h5>
								<b-form>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 성함 </label>
											<form-input v-model="item.landlord.name" />
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 주민등록번호 </label>
											<form-input
												v-model="item.landlord.registrationNumber"
											/>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 연락처 </label>
											<form-input
												v-model="item.landlord.phone"
												type="number"
											/>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-50">
											<label> 비상연락처 </label>
											<form-input
												v-model="item.landlord.emergencyPhone"
												type="number"
											/>
										</div>
									</b-form-row>
									<b-form-row class="mb-3">
										<div class="w-100">
											<label> 주소 </label>
											<form-address
												:postcode="item.landlord.postcode"
												:address="item.landlord.address"
												:addressDetail="item.landlord.addressDetail"
												@changeAddress="changeAddress('landlord', $event)"
											/>
										</div>
									</b-form-row>
								</b-form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
						<b-button type="button" variant="primary" @click="save"> 저장 </b-button>
					</div>
				</div>
			</div>
		</b-overlay>
	</div>
</template>

<script setup lang="ts">
import FormAddress from '@/components/form/FormAddress.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormRadio from '@/components/form/FormRadio.vue';
import { CustomerResult } from '@/types/customer';
import common from '@/utils/common';
import { CUSTOMER } from '@/utils/constants';
import { useNotification } from '@kyvg/vue3-notification';
import { Ref, computed, nextTick, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

interface Props {
	id: string;
}

const store = useStore();
const { notify } = useNotification();
const props = defineProps<Props>();
const emit = defineEmits(['hide']);
let isLoading: Ref<boolean> = ref(false);
let item: Ref<CustomerResult> = ref({
	revisit: '',
	revisitDate: '',
	revisitTime: '',
	contractDate: '',
	moveDate: '',
	contractAddress: {
		postcode: '',
		address: '',
		addressDetail: '',
	},
	deposit: 0,
	downPayment: 0,
	cost: 0,
	currentLesseePhone: 0,
	lessee: {
		name: '',
		registrationNumber: '',
		phone: 0,
		emergencyPhone: 0,
		postcode: '',
		address: '',
		addressDetail: '',
	},
	landlord: {
		name: '',
		registrationNumber: '',
		phone: 0,
		emergencyPhone: 0,
		postcode: '',
		address: '',
		addressDetail: '',
	},
});

const result = computed<CustomerResult>(() => store.state.customerDetail.result);
const fetchResult = (id) => store.dispatch('customerDetail/FETCH_RESULT', id);
const fetchCustomerResult = async () => {
	try {
		isLoading.value = true;
		await fetchResult(props.id);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
onMounted(() => {
	const modal = document.querySelector('#modal-customer-result');
	modal.addEventListener('show.bs.modal', () => {
		nextTick(async () => {
			await fetchCustomerResult();
			if (result.value) item.value = common.cloneDeep(result.value);
		});
	});
});

const isUpdate = computed<boolean>(() => !!item.value.id);
const createResult = (payload) => store.dispatch('customerDetail/CREATE_RESULT', payload);
const updateResult = (payload) => store.dispatch('customerDetail/UPDATE_RESULT', payload);
const save = async () => {
	try {
		isLoading.value = true;
		if (isUpdate.value) {
			await updateResult({
				id: props.id,
				resultId: item.value.id,
				body: item.value,
			});
		} else {
			await createResult({ id: props.id, body: item.value });
		}
		emit('hide');
		notify({ type: 'success', text: '결과가 저장되었습니다.' });
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};

const changeAddress = (key, { postcode, address, addressDetail }) => {
	item.value[key].postcode = postcode;
	item.value[key].address = address;
	item.value[key].addressDetail = addressDetail;
};
</script>

<style lang="scss" scoped>
.section-card {
	background: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.section-title {
	font-weight: 700;
	font-size: 0.95rem;
	color: #111827;
	margin-bottom: 16px;
	padding-bottom: 10px;
	border-bottom: 1px solid #e5e7eb;
	display: block;
}

label {
	display: block;
	color: #374151;
	font-weight: 600;
	font-size: 0.875rem;
	margin-bottom: 6px;
}
</style>
