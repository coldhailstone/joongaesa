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
						<b-table :items="tableItems" variant="light" bordered>
							<template #cell(제목)="data">
								<a
									href="#"
									style="text-decoration: none"
									@click="showEstateDetail(data.value.id)"
									>{{ data.value.title }}
								</a>
							</template>
						</b-table>
					</div>
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
					</div>
				</div>
			</div>
		</b-overlay>

		<modal-room-add @hide="modalCustomerResult.hide()" @add="addRoom" />
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

				await this.FETCH_CUSTOMER_ESTATE_LIST(this.customer.roomIds);
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
				};
			});
		},
		async addRoom(id) {
			this.modalRoomAdd.hide();

			try {
				this.isLoading = true;

				const roomIds = this.customer.roomIds;
				if (roomIds && roomIds.includes(id)) {
					this.$notify({
						type: 'success',
						text: '이미 추가된 매물입니다.',
					});
				} else {
					await this.UPDATE_CUSTOMER({
						id: this.customer.id,
						body: { roomIds: roomIds ? [id, ...roomIds] : [id] },
					});
					this.$notify({
						type: 'success',
						text: '매물이 추가되었습니다.',
					});
					await this.FETCH_CUSTOMER(this.customer.id);
					await this.FETCH_CUSTOMER_ESTATE_LIST(this.customer.roomIds);
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
	},
};
</script>
