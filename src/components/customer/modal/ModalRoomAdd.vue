<template>
	<div id="modal-room-add" class="modal" tabindex="-1">
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

<script>
import { mapActions, mapState } from 'vuex';
import EstateCard from '@/components/estate/EstateCard.vue';

export default {
	name: 'ModalRoomAdd',
	components: {
		EstateCard,
	},
	data() {
		return {
			isLoading: false,
			keyword: '',
		};
	},
	computed: {
		...mapState('estate/list', ['estateList']),
	},
	mounted() {
		const modal = document.querySelector('#modal-room-add');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(() => {
				this.keyword = '';
				this.fetchList();
			});
		});
	},
	methods: {
		...mapActions('estate/list', ['FETCH_ESTATE_LIST']),
		async fetchList() {
			try {
				this.isLoading = true;

				const queryList = [];
				if (this.keyword) {
					queryList.push({
						key: 'title',
						value: this.keyword,
						operator: '==',
					});
				}
				await this.FETCH_ESTATE_LIST(queryList);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			} finally {
				this.isLoading = false;
			}
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
