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
						<div class="d-flex flex-wrap gap-5">
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
		};
	},
	computed: {
		...mapState('estate/list', ['estateList']),
	},
	mounted() {
		const modal = document.querySelector('#modal-room-add');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(() => {
				this.fetchList();
			});
		});
	},
	methods: {
		...mapActions('estate/list', ['FETCH_ESTATE_LIST']),
		async fetchList() {
			try {
				this.isLoading = true;

				await this.FETCH_ESTATE_LIST([]);
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
