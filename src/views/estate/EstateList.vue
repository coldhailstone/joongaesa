<template>
	<div>
		<div class="container mt-4 d-flex flex-column gap-4">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="fw-bold mb-0">매물 목록</h4>
				<b-button variant="primary" @click="router.push('estate/new')">
					<i class="fa-solid fa-plus me-1"></i>매물 등록
				</b-button>
			</div>
			<div class="search-area p-3 d-flex align-items-center gap-2 flex-wrap">
				<b-form-input
					v-model="keyword"
					class="search-input"
					type="search"
					placeholder="제목으로 검색"
					@keypress.enter="fetchList"
				/>
				<div class="search-icon-wrapper" @click="fetchList">
					<i class="fa-solid fa-magnifying-glass"></i>
				</div>
				<div class="d-flex flex-wrap gap-2 ms-2">
					<b-button
						v-for="text of ESTATE.CONTRACT_TYPE"
						:key="text"
						:variant="contractType === text ? 'primary' : 'outline-secondary'"
						size="sm"
						@click="changeContractType(text)"
					>
						{{ text }}
					</b-button>
				</div>
			</div>
			<div class="d-flex flex-wrap gap-4">
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
const estateList = computed<Estate[]>(() => store.state.estateList.estateList);
const fetchEstateList = (queryList) => store.dispatch('estateList/FETCH_ESTATE_LIST', queryList);
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
