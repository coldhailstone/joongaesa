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
							<form-input
								:value="item.phone"
								@update:modelValue="item.phone = $event"
								type="number"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-100">
							<label> 방문일시 </label>
							<div class="d-flex gap-3 mt-2">
								<form-input
									:value="item.visitDate"
									@update:modelValue="item.visitDate = $event"
									type="date"
								/>
								<form-input
									:value="item.visitTime"
									@update:modelValue="item.visitTime = $event"
									type="time"
								/>
							</div>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 성별 </label>
							<form-radio
								:value="item.gender"
								@update:modelValue="item.gender = $event"
								:options="common.setOptions(CUSTOMER.GENDER)"
								name="gender"
							/>
						</div>
					</b-form-row>
					<b-form-row class="mb-3">
						<div class="w-50">
							<label> 연령대 </label>
							<form-input
								:value="item.age"
								@update:modelValue="item.age = $event"
								type="number"
								placeholder="연령대"
							/>
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
								:value="item.buildingType"
								@update:modelValue="item.buildingType = $event"
								:options="common.setOptions(CUSTOMER.BUILDING_TYPE)"
								name="buildingType"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 거래유형 </label>
							<form-radio
								:value="item.contractType"
								@update:modelValue="item.contractType = $event"
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
					<b-form-row>
						<div class="w-100">
							<label> 대출여부 </label>
							<form-radio
								:value="item.loan"
								@update:modelValue="item.loan = $event"
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
								:value="item.geunlin"
								@update:modelValue="item.geunlin = $event"
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
				<h4 class="mb-3 fw-bold">상세 정보</h4>
				<hr />
				<b-form>
					<b-form-row>
						<div class="w-100">
							<label> 엘리베이터 </label>
							<form-radio
								:value="item.elevator"
								@update:modelValue="item.elevator = $event"
								:options="common.setOptions(CUSTOMER.OX)"
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
								:options="common.setOptions(CUSTOMER.OX)"
								name="pet"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 주차 </label>
							<form-radio
								:value="item.parking"
								@update:modelValue="item.parking = $event"
								:options="common.setOptions(CUSTOMER.OX)"
								name="parking"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 화장실 창문 </label>
							<form-radio
								:value="item.window"
								@update:modelValue="item.window = $event"
								:options="common.setOptions(CUSTOMER.OX)"
								name="window"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 컨디션 </label>
							<form-radio
								:value="item.condition"
								@update:modelValue="item.condition = $event"
								:options="common.setOptions(CUSTOMER.CONDITION)"
								name="condition"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 구조 </label>
							<form-radio
								:value="item.roomStructure"
								@update:modelValue="item.roomStructure = $event"
								:options="common.setOptions(CUSTOMER.ROOM_STRUCTURE)"
								name="roomStructure"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 채광 </label>
							<form-radio
								:value="item.roomDirection"
								@update:modelValue="item.roomDirection = $event"
								:options="common.setOptions(CUSTOMER.ROOM_DIRECTION)"
								name="roomDirection"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 층수 </label>
							<form-radio
								:value="item.floor"
								@update:modelValue="item.floor = $event"
								:options="common.setOptions(CUSTOMER.FLOOR)"
								name="floor"
							/>
						</div>
					</b-form-row>
					<b-form-row>
						<div class="w-100">
							<label> 옵션 </label>
							<form-radio
								:value="item.option"
								@update:modelValue="item.option = $event"
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
import { CUSTOMER } from '@/utils/constants';
import common from '@/utils/common';
import FormInput from '@/components/form/FormInput.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import FormRadio from '@/components/form/FormRadio.vue';

export default {
	name: 'CustomerAdd',
	components: {
		FormInput,
		FormTextarea,
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
			common,
			CUSTOMER,
			isLoading: false,
			item: {
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
			},
		};
	},
	computed: {
		...mapState('customer/detail', ['customer']),
		isUpdate() {
			return !!this.$route.params.id;
		},
		today() {
			return new Date().toISOString().substring(0, 10);
		},
		currentTime() {
			const date = new Date();
			const hh = date.getHours();
			const mm = date.getMinutes();
			return `${hh >= 10 ? hh : `0${hh}`}:${mm >= 10 ? mm : `0${mm}`}`;
		},
	},
	async created() {
		if (this.isUpdate) {
			await this.fetchDetail();
			this.item = this.$_.cloneDeep(this.customer);
		}
	},
	mounted() {
		if (!this.isUpdate) {
			this.item.visitTime = this.currentTime;
			this.item.visitDate = this.today;
			this.item.moveDate = this.today;
		}
	},
	methods: {
		...mapActions('customer/list', ['CREATE_CUSTOMER']),
		...mapActions('customer/detail', ['FETCH_CUSTOMER', 'UPDATE_CUSTOMER']),
		async fetchDetail() {
			try {
				this.isLoading = true;

				await this.FETCH_CUSTOMER(this.$route.params.id);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		async save() {
			if (!this.validation()) return;

			try {
				this.isLoading = true;

				if (this.isUpdate) {
					await this.UPDATE_CUSTOMER({ id: this.$route.params.id, body: this.item });
					this.$notify({
						type: 'success',
						text: '고객이 수정되었습니다.',
					});
				} else {
					await this.CREATE_CUSTOMER(this.item);
					this.$notify({
						type: 'success',
						text: '고객이 등록되었습니다.',
					});
				}
				this.$router.push('/customer');
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
			if (!this.item.phone) {
				this.$notify({
					type: 'error',
					text: '연락처는 필수값입니다.',
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
