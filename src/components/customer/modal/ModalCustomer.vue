<template>
	<div id="modal-customer" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">고객 상세</h3>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body d-flex flex-column gap-5">
						<div>
							<h4 class="mb-3 fw-bold">기본 정보</h4>
							<ul class="info">
								<li>
									<div class="key">연락처</div>
									<div class="fw-bold">
										{{
											common.convertData(
												customer.phone,
												common.convertTel(customer.phone)
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">방문일시</div>
									<div>{{ common.convertData(dateTime) }}</div>
								</li>
								<li>
									<div class="key">성별</div>
									<div>{{ common.convertData(customer.gender) }}</div>
								</li>
								<li>
									<div class="key">연령대</div>
									<div>{{ common.convertData(customer.age) }}</div>
								</li>
								<template v-for="(link, index) of customer.links" :key="index">
									<li>
										<div class="key">문의주신 방 {{ index + 1 }}</div>
										<div>
											<a
												:href="link.url ? link.url : '#'"
												target="_blank"
												style="text-decoration: none"
											>
												{{ common.convertData(link.url) }}
											</a>
										</div>
									</li>
									<li>
										<div class="key">메모 {{ index + 1 }}</div>
										<div>{{ common.convertData(link.memo) }}</div>
									</li>
								</template>
								<li>
									<div class="key">건물형태</div>
									<div>{{ common.convertData(customer.buildingType) }}</div>
								</li>
								<li>
									<div class="key">거래유형</div>
									<div>{{ common.convertData(customer.contractType) }}</div>
								</li>
								<li>
									<div class="key">기간</div>
									<div>{{ common.convertData(customer.residence) }}</div>
								</li>
								<li>
									<div class="key">보증금</div>
									<div>
										{{
											common.convertData(
												customer.deposit,
												`${parseInt(customer.deposit).toLocaleString()}만원`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">월세</div>
									<div>
										{{
											common.convertData(
												customer.monthly,
												`${parseInt(customer.monthly).toLocaleString()}만원`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">대출여부</div>
									<div>{{ common.convertData(customer.loan) }}</div>
								</li>
								<li>
									<div class="key">대출상품</div>
									<div>{{ common.convertData(customer.loanProduct) }}</div>
								</li>
								<li>
									<div class="key">근생여부</div>
									<div>{{ common.convertData(customer.geunlin) }}</div>
								</li>
								<li>
									<div class="key">위치</div>
									<div>{{ common.convertData(customer.position) }}</div>
								</li>
								<li>
									<div class="key">입주날짜</div>
									<div>{{ common.convertData(customer.moveDate) }}</div>
								</li>
							</ul>
						</div>
						<div>
							<h4 class="mb-3 fw-bold">상세 정보</h4>
							<ul class="info">
								<li>
									<div class="key">엘리베이터</div>
									<div>{{ common.convertData(customer.elevator) }}</div>
								</li>
								<li>
									<div class="key">반려동물</div>
									<div>{{ common.convertData(customer.pet) }}</div>
								</li>
								<li>
									<div class="key">주차</div>
									<div>{{ common.convertData(customer.parking) }}</div>
								</li>
								<li>
									<div class="key">화장실 창문</div>
									<div>{{ common.convertData(customer.windoe) }}</div>
								</li>
								<li>
									<div class="key">컨디션</div>
									<div>{{ common.convertData(customer.condition) }}</div>
								</li>
								<li>
									<div class="key">구조</div>
									<div>{{ common.convertData(customer.roomStructure) }}</div>
								</li>
								<li>
									<div class="key">채광</div>
									<div>{{ common.convertData(customer.roomDirection) }}</div>
								</li>
								<li>
									<div class="key">층수</div>
									<div>{{ common.convertData(customer.floor) }}</div>
								</li>
								<li>
									<div class="key">옵션</div>
									<div>{{ common.convertData(customer.option) }}</div>
								</li>
							</ul>
						</div>
						<div>
							<h4 class="mb-3 fw-bold">상세 설명</h4>
							<b-form-textarea
								:value="customer.description"
								rows="10"
								noResize
								disabled
								readonly
							/>
						</div>
					</div>
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
						<b-button
							type="button"
							variant="outline-primary"
							@click="modalRoomListComp.show()"
						>
							방 목록
						</b-button>
						<b-button
							type="button"
							variant="outline-primary"
							@click="modalCustomerResultComp.show()"
						>
							결과
						</b-button>
						<b-button type="button" variant="danger" @click="deleteDetail">
							삭제
						</b-button>
						<b-button type="button" variant="primary" @click="routeUpdate">
							수정
						</b-button>
					</div>
				</div>
			</div>
		</b-overlay>

		<modal-customer-result :id="id" @hide="modalCustomerResultComp.hide()" />
		<modal-room-list :id="id" @hide="modalCustomerResultComp.hide()" />
	</div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import { Modal } from 'bootstrap';
import common from '@/utils/common';
import ModalCustomerResult from './ModalCustomerResult.vue';
import ModalRoomList from './ModalRoomList.vue';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();

const props = defineProps({ id: String });
const emit = defineEmits(['delete', 'hide']);

let isLoading = ref(false);
const customer = computed(() => store.state.customer.detail.customer);
const dateTime = computed(() => {
	return `${customer.value.visitDate ?? ''} ${customer.value.visitTime ?? ''}`;
});
const fectCustomer = (id) => store.dispatch('customer/detail/FETCH_CUSTOMER', id);
const fetchDetail = async () => {
	try {
		isLoading.value = true;
		await fectCustomer(props.id);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
const deleteCustomer = (id) => store.dispatch('customer/detail/DELETE_CUSTOMER', id);
const deleteDetail = async () => {
	try {
		isLoading.value = true;
		await deleteCustomer(props.id);
		notify({ type: 'success', text: '고객 정보가 삭제되었습니다.' });
		emit('delete');
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
const routeUpdate = () => {
	router.push(`/customer/${props.id}`);
	emit('hide');
};

let modalCustomerResultComp = null;
let modalRoomListComp = null;
onMounted(() => {
	modalCustomerResultComp = new Modal(document.querySelector('#modal-customer-result'));
	modalRoomListComp = new Modal(document.querySelector('#modal-room-list'));

	const modal = document.querySelector('#modal-customer');
	modal.addEventListener('show.bs.modal', () => {
		nextTick(async () => await fetchDetail());
	});
});
</script>

<style lang="scss" scoped>
.carousel {
	img {
		width: 100%;
	}
}
.info {
	list-style-type: none;
	padding-left: 0;
	li {
		display: flex;
		align-items: center;
		height: 50px;
		border: 1px solid #ddd;
		&:not(:last-child) {
			border-bottom: 0;
		}
		> div {
			width: 75%;
			height: 100%;
			line-height: 50px;
			overflow: hidden;
		}
		.key {
			width: 25%;
			text-align: center;
			background: #eee;
			border-right: 1px solid #ddd;
			margin-right: 10px;
		}
	}
}
</style>
