<template>
	<div>
		<div class="container mt-3 d-flex flex-column gap-4">
			<div>
				<b-button class="float-end" variant="primary" @click="router.push('estate/new')">
					매물 등록
				</b-button>
			</div>
			<div class="d-flex align-items-center gap-1">
				<b-form-input
					v-model="keyword"
					class="w-50"
					type="search"
					placeholder="제목으로 검색"
					@keypress.enter="fetchList"
				/>
				<div class="search-icon-wrapper" @click="fetchList">
					<i class="fa-solid fa-magnifying-glass"></i>
				</div>
				<div class="d-flex flex-wrap gap-2 ms-3">
					<b-button
						v-for="text of ESTATE.CONTRACT_TYPE"
						:key="text"
						:variant="contractType === text ? 'warning' : 'secondary'"
						@click="changeContractType(text)"
					>
						{{ text }}
					</b-button>
				</div>
			</div>
			<div class="d-flex flex-wrap gap-5">
				<estate-card
					v-for="estate of estateList"
					:key="estate.id"
					:item="estate"
					@clickCard="showDetailModal(estate.id)"
				/>
			</div>
		</div>

		<modal-estate :id="modalId" @hide="modal.hide()" @delete="completeDelete" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import { Modal } from 'bootstrap';
import { ESTATE } from '@/utils/constants';
import EstateCard from '@/components/estate/EstateCard.vue';
import ModalEstate from '@/components/estate/modal/ModalEstate.vue';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();

let modal = null;
let modalId = ref('');
const showDetailModal = (id) => {
	modalId.value = id;
	modal.show();
};
const completeDelete = () => {
	modal.hide();
	fetchList();
};
onMounted(() => (modal = new Modal(document.querySelector('#modal-estate'))));

let keyword = '';
let contractType = '';
const estateList = computed(() => store.state.estate.list.estateList);
const setLoading = (isLoading) => store.commit('loading/SET_LOADING', isLoading);
const fetchEstateList = (queryList) => store.dispatch('estate/list/FETCH_ESTATE_LIST', queryList);
const fetchList = async () => {
	try {
		setLoading(true);
		const queryList = [];
		if (keyword) {
			queryList.push({
				key: 'title',
				value: keyword,
				operator: '==',
			});
		}
		if (contractType) {
			queryList.push({
				key: 'contractType',
				value: contractType,
				operator: '==',
			});
		}
		await fetchEstateList(queryList);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		setLoading(false);
	}
};
const changeContractType = (type) => {
	contractType = contractType !== type ? type : '';
	fetchList();
};
onMounted(async () => await fetchList());
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
