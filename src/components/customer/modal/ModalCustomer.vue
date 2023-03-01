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
											convertData(
												customer.phone,
												$common.convertTel(customer.phone)
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">방문일시</div>
									<div>{{ convertData(dateTime) }}</div>
								</li>
								<li>
									<div class="key">성별</div>
									<div>{{ convertData(customer.gender) }}</div>
								</li>
								<li>
									<div class="key">연령대</div>
									<div>{{ convertData(customer.age) }}</div>
								</li>
								<li>
									<div class="key">문의주신 방</div>
									<div>
										<a :href="customer.link ?? '#'">
											{{ convertData(customer.link) }}
										</a>
									</div>
								</li>
								<li>
									<div class="key">건물형태</div>
									<div>{{ convertData(customer.buildingType) }}</div>
								</li>
								<li>
									<div class="key">거래유형</div>
									<div>{{ convertData(customer.contractType) }}</div>
								</li>
								<li>
									<div class="key">기간</div>
									<div>{{ convertData(customer.residence) }}</div>
								</li>
								<li>
									<div class="key">보증금</div>
									<div>
										{{
											convertData(
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
											convertData(
												customer.monthly,
												`${parseInt(customer.monthly).toLocaleString()}만원`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">대출여부</div>
									<div>{{ convertData(customer.loan) }}</div>
								</li>
								<li>
									<div class="key">대출상품</div>
									<div>{{ convertData(customer.loanProduct) }}</div>
								</li>
								<li>
									<div class="key">근생여부</div>
									<div>{{ convertData(customer.geunlin) }}</div>
								</li>
								<li>
									<div class="key">위치</div>
									<div>{{ convertData(customer.position) }}</div>
								</li>
								<li>
									<div class="key">입주날짜</div>
									<div>{{ convertData(customer.moveDate) }}</div>
								</li>
							</ul>
						</div>
						<div>
							<h4 class="mb-3 fw-bold">상세 정보</h4>
							<ul class="info">
								<li>
									<div class="key">엘리베이터</div>
									<div>{{ convertData(customer.elevator) }}</div>
								</li>
								<li>
									<div class="key">반려동물</div>
									<div>{{ convertData(customer.pet) }}</div>
								</li>
								<li>
									<div class="key">주차</div>
									<div>{{ convertData(customer.parking) }}</div>
								</li>
								<li>
									<div class="key">화장실 창문</div>
									<div>{{ convertData(customer.windoe) }}</div>
								</li>
								<li>
									<div class="key">컨디션</div>
									<div>{{ convertData(customer.condition) }}</div>
								</li>
								<li>
									<div class="key">구조</div>
									<div>{{ convertData(customer.roomStructure) }}</div>
								</li>
								<li>
									<div class="key">채광</div>
									<div>{{ convertData(customer.roomDirection) }}</div>
								</li>
								<li>
									<div class="key">층수</div>
									<div>{{ convertData(customer.floor) }}</div>
								</li>
								<li>
									<div class="key">옵션</div>
									<div>{{ convertData(customer.option) }}</div>
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
							@click="modalRoomList.show()"
						>
							방 목록
						</b-button>
						<b-button
							type="button"
							variant="outline-primary"
							@click="modalCustomerResult.show()"
						>
							결과
						</b-button>
						<b-button type="button" variant="danger" @click="deleteCustomer">
							삭제
						</b-button>
						<b-button type="button" variant="primary" @click="routeUpdate">
							수정
						</b-button>
					</div>
				</div>
			</div>
		</b-overlay>

		<modal-customer-result :id="id" @hide="modalCustomerResult.hide()" />
		<modal-room-list :id="id" @hide="modalCustomerResult.hide()" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Modal } from 'bootstrap';
import ModalCustomerResult from './ModalCustomerResult.vue';
import ModalRoomList from './ModalRoomList.vue';

export default {
	name: 'ModalCustomer',
	components: {
		ModalCustomerResult,
		ModalRoomList,
	},
	props: {
		id: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			isLoading: false,
			modalCustomerResult: null,
			modalRoomList: null,
		};
	},
	computed: {
		...mapState('customer/detail', ['customer']),
		dateTime() {
			return `${this.customer.visitDate ? this.customer.visitDate : ''} ${
				this.customer.visitTime ? this.customer.visitTime : ''
			}`;
		},
	},
	mounted() {
		this.modalCustomerResult = new Modal(document.querySelector('#modal-customer-result'));
		this.modalRoomList = new Modal(document.querySelector('#modal-room-list'));

		const modal = document.querySelector('#modal-customer');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(() => {
				this.fetchDetail();
			});
		});
	},
	methods: {
		...mapActions('customer/detail', ['FETCH_CUSTOMER', 'DELETE_CUSTOMER']),
		async fetchDetail() {
			try {
				this.isLoading = true;

				await this.FETCH_CUSTOMER(this.id);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		async deleteCustomer() {
			try {
				this.isLoading = true;

				await this.DELETE_CUSTOMER(this.id);
				this.$notify({
					type: 'success',
					text: '고객 정보가 삭제되었습니다.',
				});
				this.$emit('delete');
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		routeUpdate() {
			this.$router.push(`/customer/${this.customer.id}`);
			this.$emit('hide');
		},
		convertData(value, convertValue) {
			if (!value || !value.length) return '-';
			return convertValue ?? value;
		},
	},
};
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
