<template>
	<div id="modal-room-list" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">방 목록</h3>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<b-button
							class="float-end mb-3"
							type="button"
							variant="primary"
							@click="modalRoomAdd.show()"
						>
							추가
						</b-button>
						<b-table
							v-if="tableItems.length"
							:items="tableItems"
							variant="light"
							bordered
						>
							<template #cell(제목)="data">
								<a
									href="#"
									style="text-decoration: none"
									@click="showEstateDetail(data.value.id)"
									>{{ data.value.title }}
								</a>
							</template>
							<template #cell(삭제)="item">
								<div class="text-center">
									<i
										class="fa-solid fa-xmark"
										style="cursor: pointer"
										@click="deleteCustomerEstate(item.item['제목'].id)"
									/>
								</div>
							</template>
						</b-table>
						<div v-else class="mt-5 p-3 text-center">
							<span>등록된 방이 없습니다.</span>
						</div>
					</div>
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
					</div>
				</div>
			</div>
		</b-overlay>

		<modal-room-add @hide="modalCustomerResult.hide()" @add="addCustomerEstate" />
		<modal-estate :id="modalEstateId" :edit="false" @hide="modalEstate.hide()" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Modal } from 'bootstrap';
import ModalRoomAdd from './ModalRoomAdd.vue';
import ModalEstate from '@/components/estate/modal/ModalEstate.vue';

export default {
	name: 'ModalRoomList',
	components: {
		ModalRoomAdd,
		ModalEstate,
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
			modalRoomAdd: null,
			modalEstate: null,
			modalEstateId: '',
			tableItems: [],
		};
	},
	computed: {
		...mapState('customer/detail', ['customer']),
	},
	mounted() {
		this.modalRoomAdd = new Modal(document.querySelector('#modal-room-add'));
		this.modalEstate = new Modal(document.querySelector('#modal-estate'));

		const modal = document.querySelector('#modal-room-list');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(async () => {
				await this.fetchCustomerEstateList();
				this.tableItems = this.convertTableItems(this.customer.estateList);
			});
		});
	},
	methods: {
		...mapActions('customer/detail', [
			'FETCH_CUSTOMER',
			'FETCH_CUSTOMER_ESTATE_LIST',
			'UPDATE_CUSTOMER',
		]),
		async fetchCustomerEstateList() {
			try {
				this.isLoading = true;

				await this.FETCH_CUSTOMER_ESTATE_LIST(this.customer.estateIds);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		convertTableItems(list) {
			if (!list) return [];

			return list.map((item) => {
				return {
					제목: {
						title: item.title,
						id: item.id,
					},
					보증금: `${parseInt(item.deposit).toLocaleString()}만원`,
					월세: `${parseInt(item.monthly).toLocaleString()}만원`,
					삭제: true,
				};
			});
		},
		async addCustomerEstate(id) {
			this.modalRoomAdd.hide();

			try {
				this.isLoading = true;

				const estateIds = this.customer.estateIds;
				if (estateIds && estateIds.includes(id)) {
					this.$notify({
						type: 'error',
						text: '이미 추가된 방입니다.',
					});
				} else {
					await this.UPDATE_CUSTOMER({
						id: this.customer.id,
						body: { estateIds: estateIds ? [id, ...estateIds] : [id] },
					});
					this.$notify({
						type: 'success',
						text: '방이 추가되었습니다.',
					});
					await this.FETCH_CUSTOMER(this.customer.id);
					await this.FETCH_CUSTOMER_ESTATE_LIST(this.customer.estateIds);
					this.tableItems = this.convertTableItems(this.customer.estateList);
				}
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		showEstateDetail(id) {
			this.modalEstateId = id;
			this.modalEstate.show();
		},
		async deleteCustomerEstate(id) {
			try {
				this.isLoading = true;

				const estateIds = this.$_.cloneDeep(this.customer.estateIds);
				const index = estateIds.indexOf(id);
				if (index > -1) estateIds.splice(index, 1);

				await this.UPDATE_CUSTOMER({
					id: this.customer.id,
					body: { estateIds: estateIds },
				});
				this.$notify({
					type: 'success',
					text: '방이 삭제되었습니다.',
				});
				await this.FETCH_CUSTOMER(this.customer.id);
				await this.FETCH_CUSTOMER_ESTATE_LIST(this.customer.estateIds);
				this.tableItems = this.convertTableItems(this.customer.estateList);
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
