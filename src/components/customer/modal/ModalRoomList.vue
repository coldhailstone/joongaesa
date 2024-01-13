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
							@click="modalRoomAddComp.show()"
						>
							추가
						</b-button>
						<b-table
							v-if="tableItemList.length"
							:items="tableItemList"
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

		<modal-room-add @hide="modalRoomAddComp.hide()" @add="addCustomerEstate" />
		<modal-estate :id="modalEstateId" :edit="false" @hide="modalEstateComp.hide()" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useNotification } from '@kyvg/vue3-notification';
import { Modal } from 'bootstrap';
import common from '@/utils/common';
import ModalRoomAdd from './ModalRoomAdd.vue';
import ModalEstate from '@/components/estate/modal/ModalEstate.vue';

const store = useStore();
const { notify } = useNotification();
const props = defineProps({ id: String });
let isLoading = ref(false);
let tableItemList = ref([]);
const customer = computed(() => store.state.customer.detail.customer);
const convertTableItemList = (list) => {
	if (!list) return [];

	return list.map((item) => ({
		제목: { title: item.title, id: item.id },
		보증금: `${parseInt(item.deposit).toLocaleString()}만원`,
		월세: `${parseInt(item.monthly).toLocaleString()}만원`,
		삭제: true,
	}));
};

const fetchCustomerEstateList = (ids) =>
	store.dispatch('customer/detail/FETCH_CUSTOMER_ESTATE_LIST', ids);
const fectCustomer = (id) => store.dispatch('customer/detail/FETCH_CUSTOMER', id);
const updateCustomer = (payload) => store.dispatch('customer/detail/UPDATE_CUSTOMER', payload);
const addCustomerEstate = async (id) => {
	modalRoomAddComp.hide();

	try {
		isLoading.value = true;
		const estateIds = customer.value.estateIds;
		if (estateIds && estateIds.includes(id)) {
			notify({ type: 'error', text: '이미 추가된 방입니다.' });
		} else {
			await updateCustomer({
				id: props.id,
				body: { estateIds: estateIds ? [id, ...estateIds] : [id] },
			});
			notify({ type: 'success', text: '방이 추가되었습니다.' });

			await fectCustomer(props.id);
			await fetchCustomerEstateList(customer.value.estateIds);
			tableItemList.value = convertTableItemList(customer.value.estateList);
		}
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
const deleteCustomerEstate = async (id) => {
	try {
		isLoading.value = true;
		const estateIds = common.cloneDeep(customer.value.estateIds);
		const index = estateIds.indexOf(id);
		if (index > -1) estateIds.splice(index, 1);

		await updateCustomer({
			id: props.id,
			body: { estateIds },
		});
		notify({ type: 'success', text: '방이 삭제되었습니다.' });

		await fectCustomer(props.id);
		await fetchCustomerEstateList(customer.value.estateIds);
		tableItemList.value = convertTableItemList(customer.value.estateList);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};

let modalRoomAddComp = null;
let modalEstateComp = null;
let modalEstateId = ref('');
const showEstateDetail = (id) => {
	modalEstateId.value = id;
	modalEstateComp.show();
};
const fetchList = async () => {
	try {
		isLoading.value = true;
		await fetchCustomerEstateList(customer.value.estateIds);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
onMounted(() => {
	modalRoomAddComp = new Modal(document.querySelector('#modal-room-add'));
	modalEstateComp = new Modal(document.querySelector('#modal-estate'));

	const modal = document.querySelector('#modal-room-list');
	modal.addEventListener('show.bs.modal', () => {
		nextTick(async () => {
			await fetchList();
			tableItemList.value = convertTableItemList(customer.value.estateList);
		});
	});
});
</script>
