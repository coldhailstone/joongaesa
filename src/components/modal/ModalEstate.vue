<template>
	<div id="modal-estate" class="modal" tabindex="-1">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">매물 상세</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body d-flex flex-column gap-5">
					<carousel
						v-if="estate.photo && estate.photo.length"
						ref="carousel"
						class="carousel"
						:wrap-around="true"
					>
						<slide v-for="photo of estate.photo" :key="photo.name">
							<img :src="photo.url" />
						</slide>

						<template #addons>
							<navigation />
							<pagination />
						</template>
					</carousel>
					<div>
						<h4 class="fw-bold">
							신논현역 5분 역대급 2룸 가성비 이 금액대 이런방 못구합니다 조용한동네
						</h4>
						<span>등록일: 2023-02-22</span>
					</div>
				</div>
				<div class="modal-footer">
					<b-button type="button" data-bs-dismiss="modal">닫기</b-button>
					<b-button type="button" variant="danger" @click="deleteEstate">삭제</b-button>
					<b-button type="button" variant="primary" @click="routeUpdate"> 수정 </b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
	name: 'ModalEstate',
	components: {
		Carousel,
		Slide,
		Pagination,
		Navigation,
	},
	props: {
		id: {
			type: String,
			default: '',
		},
	},
	computed: {
		...mapState('estate/detail', ['estate']),
	},
	mounted() {
		const modal = document.querySelector('#modal-estate');
		modal.addEventListener('show.bs.modal', () => {
			this.$nextTick(() => {
				if (this.estate.photo && this.estate.photo.length) {
					const carousel = this.$refs.carousel;
					carousel.updateSlideWidth();
				}
				this.fetchDetail();
			});
		});
	},
	methods: {
		...mapActions('estate/detail', ['FETCH_ESTATE', 'DELETE_ESTATE']),
		async fetchDetail() {
			try {
				await this.FETCH_ESTATE(this.id);
				console.log(this.estate);
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			}
		},
		async deleteEstate() {
			try {
				await this.DELETE_ESTATE(this.id);
				this.$notify({
					type: 'success',
					text: '매물이 삭제되었습니다.',
				});
				this.$emit('delete');
			} catch (error) {
				this.$notify({
					type: 'error',
					text: error.message,
				});
			}
		},
		routeUpdate() {
			this.$router.push(`/estate/${this.estate.id}`);
			this.$emit('hide');
		},
	},
};
</script>

<style lang="scss" scoped>
.carousel {
	img {
		width: 100%;
	}
}
</style>
