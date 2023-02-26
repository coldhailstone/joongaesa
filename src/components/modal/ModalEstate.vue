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
						<h4 class="mb-3 fw-bold">기본 정보</h4>
						<ul class="info">
							<li>
								<div class="key">제목</div>
								<div class="fw-bold">{{ convertData(estate.title) }}</div>
							</li>
							<li>
								<div class="key">등록일</div>
								<div>{{ convertData(dateTime) }}</div>
							</li>
							<li>
								<div class="key">원본 링크</div>
								<div>
									<a :href="estate.link ?? '#'">{{ convertData(estate.link) }}</a>
								</div>
							</li>
							<li>
								<div class="key">주소</div>
								<div>{{ convertData(address) }}</div>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-3 fw-bold">거래 정보</h4>
						<ul class="info">
							<li>
								<div class="key">보증금</div>
								<div>
									{{ convertData(estate.deposit, `${estate.deposit}만원`) }}
								</div>
							</li>
							<li>
								<div class="key">월세</div>
								<div>
									{{ convertData(estate.monthly, `${estate.monthly}만원`) }}
								</div>
							</li>
							<li>
								<div class="key">거래유형</div>
								<div>{{ convertData(estate.contractType) }}</div>
							</li>
							<li>
								<div class="key">건물 형태</div>
								<div>{{ convertData(estate.buildingType) }}</div>
							</li>
							<li>
								<div class="key">건물 종류</div>
								<div>{{ convertData(estate.buildingForm) }}</div>
							</li>
							<li>
								<div class="key">사용승인일</div>
								<div>{{ convertData(estate.useApprovalDate) }}</div>
							</li>
							<li>
								<div class="key">동</div>
								<div>{{ convertData(estate.dong, `${estate.dong}동`) }}</div>
							</li>
							<li>
								<div class="key">호</div>
								<div>{{ convertData(estate.ho, `${estate.ho}동`) }}</div>
							</li>
							<li>
								<div class="key">전체층</div>
								<div>
									{{ convertData(estate.wholeFloor, `${estate.wholeFloor}층`) }}
								</div>
							</li>
							<li>
								<div class="key">해당층</div>
								<div>
									{{
										convertData(
											estate.correspondingFloor,
											`${estate.correspondingFloor}층`
										)
									}}
								</div>
							</li>
							<li>
								<div class="key">구조</div>
								<div>{{ convertData(estate.roomStructure) }}</div>
							</li>
							<li>
								<div class="key">평</div>
								<div>{{ convertData(estate.pyung, `${estate.pyung}평`) }}</div>
							</li>
							<li>
								<div class="key">m<sup>2</sup></div>
								<div
									v-html="convertData(estate.m2, `${estate.m2}m<sup>2</sup>`)"
								></div>
							</li>
							<li>
								<div class="key">주실 방향</div>
								<div>{{ convertData(estate.roomDirection) }}</div>
							</li>
							<li>
								<div class="key">화장실 수</div>
								<div>
									{{
										convertData(
											estate.bathroomCount,
											`${estate.bathroomCount}개`
										)
									}}
								</div>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-3 fw-bold">기타 정보</h4>
						<ul class="info">
							<li>
								<div class="key">엘리베이터</div>
								<div>{{ convertData(estate.elevator) }}</div>
							</li>
							<li>
								<div class="key">반려동물</div>
								<div>{{ convertData(estate.pet) }}</div>
							</li>
							<li>
								<div class="key">주차</div>
								<div>{{ convertData(estate.parking) }}</div>
							</li>
							<li>
								<div class="key">관리비</div>
								<div>{{ convertData(estate.cost) }}만원</div>
							</li>
							<li>
								<div class="key">관리비 포함 항목</div>
								<div>
									{{
										convertData(
											estate.managementCost,
											estate.managementCost?.join(', ')
										)
									}}
								</div>
							</li>
							<li>
								<div class="key">옵션</div>
								<div>
									{{ convertData(estate.option, estate.option?.join(', ')) }}
								</div>
							</li>
							<li>
								<div class="key">입주가능일</div>
								<div>{{ convertData(estate.moveDate) }}</div>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-3 fw-bold">상세 설명</h4>
						<b-form-textarea
							:value="estate.description"
							rows="10"
							noResize
							disabled
							readonly
						/>
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
import { mapActions, mapMutations, mapState } from 'vuex';
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
		dateTime() {
			return this.estate.createDatetime?.toDate().toLocaleString('ko-KR');
		},
		address() {
			let result = '';
			if (this.estate.postcode) result += `(${this.estate.postcode}) `;
			if (this.estate.address) result += `${this.estate.address} `;
			if (this.estate.addressDetail) result += `${this.estate.addressDetail}`;
			return result;
		},
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
		modal.addEventListener('hide.bs.modal', () => {
			this.SET_ESTATE({});
		});
	},
	methods: {
		...mapMutations('estate/detail', ['SET_ESTATE']),
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
		convertData(value, convertValue) {
			if (!value || !value.length) return '-';
			return convertValue ?? value;
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
.info {
	list-style-type: none;
	padding-left: 0;
	li {
		display: flex;
		align-items: center;
		height: 50px;
		border: 1px solid #ddd;
		&:not(:last-child) {
			border-bottom: 0;
		}
		> div {
			width: 75%;
			height: 100%;
			line-height: 50px;
			overflow: hidden;
		}
		.key {
			width: 25%;
			text-align: center;
			background: #eee;
			border-right: 1px solid #ddd;
			margin-right: 10px;
		}
	}
}
</style>
