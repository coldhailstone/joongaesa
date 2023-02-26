<template>
	<div>
		<div class="container mt-3 d-flex flex-column gap-4">
			<div>
				<b-button class="float-end" variant="primary" @click="$router.push('estate/new')">
					매물 등록
				</b-button>
			</div>
			<div class="d-flex align-items-center gap-1">
				<b-form-input
					v-model="keyword"
					class="w-50"
					type="search"
					placeholder="제목을 검색하세요"
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

		<modal-estate :id="modalId" @hide="modalEstate.hide()" @delete="completeDelete" />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { Modal } from 'bootstrap';
import { ESTATE } from '@/utils/constants';
import EstateCard from '@/components/estate/EstateCard.vue';
import ModalEstate from '@/components/modal/ModalEstate.vue';

export default {
	name: 'EstateList',
	components: {
		EstateCard,
		ModalEstate,
	},
	data() {
		return {
			ESTATE,
			keyword: '',
			contractType: '',
			modalEstate: null,
			modalId: '',
		};
	},
	computed: {
		...mapState('estate/list', ['estateList']),
	},
	mounted() {
		this.modalEstate = new Modal(document.querySelector('#modal-estate'));
		this.$nextTick(() => this.fetchList());
	},
	methods: {
		...mapMutations('loading', ['SET_LOADING']),
		...mapActions('estate/list', ['FETCH_ESTATE_LIST']),
		async fetchList() {
			try {
				const queryList = [];
				if (this.keyword) {
					queryList.push({
						key: 'title',
						value: this.keyword,
					});
				}
				if (this.contractType) {
					queryList.push({
						key: 'contractType',
						value: this.contractType,
					});
				}
				await this.FETCH_ESTATE_LIST(queryList);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			}
		},
		changeContractType(type) {
			if (type === this.contractType) this.contractType = '';
			else this.contractType = type;
			this.fetchList();
		},
		showDetailModal(id) {
			this.modalId = id;
			this.modalEstate.show();
		},
		completeDelete() {
			this.modalEstate.hide();
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
