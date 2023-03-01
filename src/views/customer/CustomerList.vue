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

		<modal-customer :id="modalId" @hide="modalCustomer.hide()" @delete="completeDelete" />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { Modal } from 'bootstrap';
import CustomerCard from '@/components/customer/CustomerCard.vue';
import ModalCustomer from '@/components/customer/modal/ModalCustomer.vue';

export default {
	name: 'CustomerList',
	components: {
		CustomerCard,
		ModalCustomer,
	},
	data() {
		return {
			keyword: '',
			visitDate: '',
			modalCustomer: null,
			modalId: '',
		};
	},
	computed: {
		...mapState('customer/list', ['customerList']),
		today() {
			return new Date().toISOString().substring(0, 10);
		},
	},
	mounted() {
		this.modalCustomer = new Modal(document.querySelector('#modal-customer'));
		this.$nextTick(() => {
			this.visitDate = this.today;
			this.fetchList();
		});
	},
	methods: {
		...mapMutations('loading', ['SET_LOADING']),
		...mapActions('customer/list', ['FETCH_CUSTOMER_LIST']),
		async fetchList() {
			try {
				this.SET_LOADING(true);

				const queryList = [];
				if (this.keyword) {
					queryList.push({
						key: 'phone',
						value: this.keyword,
					});
				}
				if (this.visitDate) {
					queryList.push({
						key: 'visitDate',
						value: this.visitDate,
					});
				}
				await this.FETCH_CUSTOMER_LIST(queryList);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.SET_LOADING(false);
			}
		},
		changeSearchDate() {
			this.fetchList();
		},
		showDetailModal(id) {
			this.modalId = id;
			this.modalCustomer.show();
		},
		completeDelete() {
			this.modalCustomer.hide();
			this.fetchList();
		},
	},
};
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
