<template>
	<div>
		<div class="container mt-3 d-flex flex-column gap-4">
			<div>
				<b-button class="float-end" variant="primary" @click="$router.push('customer/new')">
					고객 등록
				</b-button>
			</div>
			<div class="d-flex align-items-center gap-1">
				<b-form-input
					v-model="keyword"
					class="w-50"
					type="search"
					placeholder="연락처로 검색"
					@keypress.enter="fetchList"
				/>
				<div class="search-icon-wrapper" @click="fetchList">
					<i class="fa-solid fa-magnifying-glass"></i>
				</div>
				<div class="d-flex flex-wrap gap-2 ms-3">
					<b-form-input v-model="visitDate" type="date" @input="changeSearchDate" />
				</div>
			</div>
			<div class="d-flex flex-wrap gap-5">
				<customer-card
					v-for="customer of customerList"
					:key="customer.id"
					:item="customer"
					@clickCard="showDetailModal(customer.id)"
				/>
			</div>
		</div>

		<modal-customer :id="modalId" @hide="modalCustomerComp.hide()" @delete="completeDelete" />
	</div>
</template>

<script setup lang="ts">
import CustomerCard from '@/components/customer/CustomerCard.vue';
import ModalCustomer from '@/components/customer/modal/ModalCustomer.vue';
import common from '@/utils/common';
import { useNotification } from '@kyvg/vue3-notification';
import { Modal } from 'bootstrap';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const { notify } = useNotification();
const setLoading = (isLoading) => store.commit('loading/SET_LOADING', isLoading);

let keyword = ref('');
let visitDate = ref('');
const customerList = computed(() => store.state.customer.list.customerList);
const fetchCustomerList = (queryList) =>
	store.dispatch('customer/list/FETCH_CUSTOMER_LIST', queryList);
const fetchList = async () => {
	try {
		setLoading(true);
		const queryList = [];
		common.addQuery(queryList, 'phone', keyword.value.replace(/\D/g, ''));
		common.addQuery(queryList, 'visitDate', visitDate.value);
		await fetchCustomerList(queryList);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		setLoading(false);
	}
};
const changeSearchDate = async () => await fetchList();
onMounted(async () => await fetchList());

let modalCustomerComp = null;
let modalId = ref('');
const showDetailModal = (id) => {
	modalId.value = id;
	modalCustomerComp.show();
};
const completeDelete = async () => {
	modalCustomerComp.hide();
	await fetchList();
};
onMounted(() => (modalCustomerComp = new Modal(document.querySelector('#modal-customer'))));
</script>

<style lang="scss" scoped>
.search-icon-wrapper {
	width: 38px;
	height: 38px;
	line-height: 38px;
	text-align: center;
	background: rgba(54, 58, 60, 0.1);
	border: 1px solid #eee;
	border-radius: 10px;
	cursor: pointer;
}
</style>
