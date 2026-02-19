<template>
	<div id="modal-room-add" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-dialog-scrollable">
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
						</div>
						<div class="d-flex flex-wrap gap-3">
							<estate-card
								v-for="estate of estateList"
								:key="estate.id"
								:item="estate"
								@clickCard="$emit('add', $event)"
							/>
						</div>
					</div>
					<div class="modal-footer">
						<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
					</div>
				</div>
			</div>
		</b-overlay>
	</div>
</template>

<script setup lang="ts">
import EstateCard from '@/components/estate/EstateCard.vue';
import { Estate } from '@/types/estate';
import common from '@/utils/common';
import { useNotification } from '@kyvg/vue3-notification';
import { Ref, computed, nextTick, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const { notify } = useNotification();
let isLoading: Ref<boolean> = ref(false);

let keyword: Ref<string> = ref('');
const estateList = computed<Estate[]>(() => store.state.estateList.estateList);
const fetchEstateList = (queryList) => store.dispatch('estateList/FETCH_ESTATE_LIST', queryList);
const fetchList = async () => {
	try {
		isLoading.value = true;
		const queryList = [];
		common.addQuery(queryList, 'title', keyword.value);
		await fetchEstateList(queryList);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
onMounted(() => {
	const modal = document.querySelector('#modal-room-add');
	modal.addEventListener('show.bs.modal', () => {
		nextTick(async () => {
			keyword.value = '';
			await fetchList();
		});
	});
});
</script>

<style lang="scss" scoped>
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
