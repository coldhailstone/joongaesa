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

		<modal-estate :id="modalId" @hide="modalEstateComp.hide()" @delete="completeDelete" />
	</div>
</template>

<script setup lang="ts">
import EstateCard from '@/components/estate/EstateCard.vue';
import ModalEstate from '@/components/estate/modal/ModalEstate.vue';
import { Estate } from '@/types/estate';
import common from '@/utils/common';
import { ESTATE } from '@/utils/constants';
import { useNotification } from '@kyvg/vue3-notification';
import { Modal } from 'bootstrap';
import { Ref, computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();
const setLoading = (isLoading) => store.commit('loading/SET_LOADING', isLoading);

let keyword: Ref<string> = ref('');
let contractType: Ref<string> = ref('');
const estateList = computed<Estate[]>(() => store.state.estate.list.estateList);
const fetchEstateList = (queryList) => store.dispatch('estate/list/FETCH_ESTATE_LIST', queryList);
const fetchList = async () => {
	try {
		setLoading(true);
		const queryList = [];
		common.addQuery(queryList, 'title', keyword.value);
		common.addQuery(queryList, 'contractType', contractType.value);
		await fetchEstateList(queryList);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		setLoading(false);
	}
};
const changeContractType = (type) => {
	contractType.value = contractType.value !== type ? type : '';
	fetchList();
};
onMounted(async () => await fetchList());

let modalEstateComp = null;
let modalId: Ref<string> = ref('');
const showDetailModal = (id) => {
	modalId.value = id;
	modalEstateComp.show();
};
const completeDelete = () => {
	modalEstateComp.hide();
	fetchList();
};
onMounted(() => (modalEstateComp = new Modal(document.querySelector('#modal-estate'))));
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
