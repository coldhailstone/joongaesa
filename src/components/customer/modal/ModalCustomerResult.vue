<template>
	<div id="modal-customer-result" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">방 보신 이후 결과</h3>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="container mt-3 mb-3 d-flex flex-column gap-4">
						<div>
							<h4 class="mb-3 fw-bold">재방문</h4>
							<hr />
							<b-form>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 재방문여부 </label>
										<form-radio
											:value="item.revisit"
											@update:modelValue="item.revisit = $event"
											:options="$common.setOptions(CUSTOMER.OX)"
											name="revisit"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-100">
										<label> 재방문일시 </label>
										<div class="d-flex gap-3 mt-2">
											<form-input
												:value="item.revisitDate"
												@update:modelValue="item.revisitDate = $event"
												type="date"
											/>
											<form-input
												:value="item.revisitTime"
												@update:modelValue="item.revisitTime = $event"
												type="time"
											/>
										</div>
									</div>
								</b-form-row>
							</b-form>
						</div>
						<div>
							<h4 class="mb-3 fw-bold">계약 정보</h4>
							<hr />
							<b-form>
								<b-form-row class="mb-3">
									<div class="w-100">
										<label> 계약일자 / 입주일자 </label>
										<div class="d-flex gap-3 mt-2">
											<form-input
												:value="item.contractDate"
												@update:modelValue="item.contractDate = $event"
												type="date"
											/>
											<form-input
												:value="item.moveDate"
												@update:modelValue="item.moveDate = $event"
												type="date"
											/>
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
												:value="item.deposit"
												@update:modelValue="item.deposit = $event"
												type="number"
												placeholder="보증금"
												suffix="만원"
											/>
											<form-input
												:value="item.downPayment"
												@update:modelValue="item.downPayment = $event"
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
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 현 임차인 연락처 </label>
										<form-input
											:value="item.currentLesseePhone"
											@update:modelValue="item.currentLesseePhone = $event"
											type="number"
										/>
									</div>
								</b-form-row>
							</b-form>
						</div>
						<div>
							<h4 class="mb-3 fw-bold">임차인</h4>
							<hr />
							<b-form>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 성함 </label>
										<form-input
											:value="item.lessee.name"
											@update:modelValue="item.lessee.name = $event"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 주민등록번호 </label>
										<form-input
											:value="item.lessee.registrationNumber"
											@update:modelValue="
												item.lessee.registrationNumber = $event
											"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 연락처 </label>
										<form-input
											:value="item.lessee.phone"
											@update:modelValue="item.lessee.phone = $event"
											type="number"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 비상연락처 </label>
										<form-input
											:value="item.lessee.emergencyPhone"
											@update:modelValue="item.lessee.emergencyPhone = $event"
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
						<div>
							<h4 class="mb-3 fw-bold">임대인</h4>
							<hr />
							<b-form>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 성함 </label>
										<form-input
											:value="item.landlord.name"
											@update:modelValue="item.landlord.name = $event"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 주민등록번호 </label>
										<form-input
											:value="item.landlord.registrationNumber"
											@update:modelValue="
												item.landlord.registrationNumber = $event
											"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 연락처 </label>
										<form-input
											:value="item.landlord.phone"
											@update:modelValue="item.landlord.phone = $event"
											type="number"
										/>
									</div>
								</b-form-row>
								<b-form-row class="mb-3">
									<div class="w-50">
										<label> 비상연락처 </label>
										<form-input
											:value="item.landlord.emergencyPhone"
											@update:modelValue="
												item.landlord.emergencyPhone = $event
											"
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
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
						<b-button type="button" variant="primary" @click="save"> 저장 </b-button>
					</div>
				</div>
			</div>
		</b-overlay>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { CUSTOMER } from '@/utils/constants';
import FormInput from '@/components/form/FormInput.vue';
import FormRadio from '@/components/form/FormRadio.vue';
import FormAddress from '@/components/form/FormAddress.vue';

export default {
	name: 'CustomerAdd',
	components: {
		FormInput,
		FormRadio,
		FormAddress,
	},
	props: {
		id: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			CUSTOMER,
			isLoading: false,
			item: {
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
			},
		};
	},
	computed: {
		...mapState('customer/detail', ['result']),
		isUpdate() {
			return !!this.item.id;
		},
	},
	mounted() {
		const modal = document.querySelector('#modal-customer-result');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(async () => {
				await this.fetchResult();
				if (this.result) this.item = this.$_.cloneDeep(this.result);
			});
		});
	},
	methods: {
		...mapActions('customer/detail', ['FETCH_RESULT', 'CREATE_RESULT', 'UPDATE_RESULT']),
		async fetchResult() {
			try {
				this.isLoading = true;

				await this.FETCH_RESULT(this.id);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		changeAddress(key, { postcode, address, addressDetail }) {
			this.item[key].postcode = postcode;
			this.item[key].address = address;
			this.item[key].addressDetail = addressDetail;
		},
		async save() {
			try {
				this.isLoading = true;

				if (this.isUpdate) {
					await this.UPDATE_RESULT({
						id: this.id,
						resultId: this.item.id,
						body: this.item,
					});
				} else {
					await this.CREATE_RESULT({ id: this.id, body: this.item });
				}
				this.$notify({
					type: 'success',
					text: '결과가 저장되었습니다.',
				});
				this.$emit('hide');
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
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
