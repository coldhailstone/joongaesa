<template>
	<div>
		<div class="container mt-4 d-flex flex-column gap-4">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="fw-bold mb-0">고객 목록</h4>
				<b-button variant="primary" @click="$router.push('customer/new')">
					<i class="fa-solid fa-plus me-1"></i>고객 등록
				</b-button>
			</div>
			<div class="search-area p-3 d-flex align-items-center gap-2 flex-wrap">
				<b-form-input
					v-model="keyword"
					class="search-input"
					type="search"
					placeholder="연락처로 검색"
					@keypress.enter="fetchList"
				/>
				<div class="search-icon-wrapper" @click="fetchList">
					<i class="fa-solid fa-magnifying-glass"></i>
				</div>
				<div class="d-flex flex-wrap gap-2 ms-2">
					<b-form-input
						v-model="visitDate"
						class="date-input"
						type="date"
						@input="changeSearchDate"
					/>
				</div>
			</div>
			<div class="d-flex flex-wrap gap-4">
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
import { Ref, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const { notify } = useNotification();
const setLoading = (isLoading) => store.commit('loading/SET_LOADING', isLoading);

let keyword: Ref<string> = ref('');
let visitDate: Ref<string> = ref('');
const customerList = computed<[]>(() => store.state.customerList.customerList);
const fetchCustomerList = (queryList) =>
	store.dispatch('customerList/FETCH_CUSTOMER_LIST', queryList);
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
let modalId: Ref<string> = ref('');
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
.search-area {
	background: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

	.search-input {
		max-width: 280px;
		border-radius: 8px;
		border-color: #e5e7eb;

		&:focus {
			border-color: #2563eb;
			box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
		}
	}

	.date-input {
		border-radius: 8px;
		border-color: #e5e7eb;

		&:focus {
			border-color: #2563eb;
			box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
		}
	}
}

.search-icon-wrapper {
	width: 38px;
	height: 38px;
	line-height: 38px;
	text-align: center;
	background: rgba(37, 99, 235, 0.08);
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	cursor: pointer;
	color: #2563eb;
	transition: background 0.15s ease;

	&:hover {
		background: rgba(37, 99, 235, 0.16);
	}
}
</style>
