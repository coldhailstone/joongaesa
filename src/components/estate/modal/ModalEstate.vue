<template>
	<div id="modal-estate" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">매물 상세</h3>
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
							ref="carouselComp"
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
									<div class="fw-bold">
										{{ common.convertData(estate.title) }}
									</div>
								</li>
								<li>
									<div class="key">등록일</div>
									<div>{{ common.convertData(dateTime) }}</div>
								</li>
								<li>
									<div class="key">원본 링크</div>
									<div>
										<a
											:href="estate.link ? estate.link : '#'"
											target="_blank"
											style="text-decoration: none"
										>
											{{ common.convertData(estate.link) }}
										</a>
									</div>
								</li>
								<li>
									<div class="key">주소</div>
									<div>{{ common.convertData(address) }}</div>
								</li>
							</ul>
						</div>
						<div>
							<h4 class="mb-3 fw-bold">거래 정보</h4>
							<ul class="info">
								<li>
									<div class="key">보증금</div>
									<div>
										{{
											common.convertData(
												estate.deposit,
												`${parseInt(estate.deposit).toLocaleString()}만원`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">월세</div>
									<div>
										{{
											common.convertData(
												estate.monthly,
												`${parseInt(estate.monthly).toLocaleString()}만원`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">거래유형</div>
									<div>{{ common.convertData(estate.contractType) }}</div>
								</li>
								<li>
									<div class="key">건물형태</div>
									<div>{{ common.convertData(estate.buildingType) }}</div>
								</li>
								<li>
									<div class="key">건물종류</div>
									<div>{{ common.convertData(estate.buildingForm) }}</div>
								</li>
								<li>
									<div class="key">사용승인일</div>
									<div>{{ common.convertData(estate.useApprovalDate) }}</div>
								</li>
								<li>
									<div class="key">동</div>
									<div>
										{{ common.convertData(estate.dong, `${estate.dong}동`) }}
									</div>
								</li>
								<li>
									<div class="key">호</div>
									<div>
										{{ common.convertData(estate.ho, `${estate.ho}동`) }}
									</div>
								</li>
								<li>
									<div class="key">전체층</div>
									<div>
										{{
											common.convertData(
												estate.wholeFloor,
												`${estate.wholeFloor}층`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">해당층</div>
									<div>
										{{
											common.convertData(
												estate.correspondingFloor,
												`${estate.correspondingFloor}층`
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">구조</div>
									<div>{{ common.convertData(estate.roomStructure) }}</div>
								</li>
								<li>
									<div class="key">평</div>
									<div>
										{{ common.convertData(estate.pyung, `${estate.pyung}평`) }}
									</div>
								</li>
								<li>
									<div class="key">m<sup>2</sup></div>
									<div
										v-html="
											common.convertData(
												estate.m2,
												`${estate.m2}m<sup>2</sup>`
											)
										"
									></div>
								</li>
								<li>
									<div class="key">주실 방향</div>
									<div>{{ common.convertData(estate.roomDirection) }}</div>
								</li>
								<li>
									<div class="key">화장실 수</div>
									<div>
										{{
											common.convertData(
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
									<div>{{ common.convertData(estate.elevator) }}</div>
								</li>
								<li>
									<div class="key">반려동물</div>
									<div>{{ common.convertData(estate.pet) }}</div>
								</li>
								<li>
									<div class="key">주차</div>
									<div>{{ common.convertData(estate.parking) }}</div>
								</li>
								<li>
									<div class="key">관리비</div>
									<div>
										{{ common.convertData(estate.cost, `${estate.cost}만원`) }}
									</div>
								</li>
								<li>
									<div class="key">관리비 포함 항목</div>
									<div>
										{{
											common.convertData(
												estate.managementCost,
												estate.managementCost?.join(', ')
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">옵션</div>
									<div>
										{{
											common.convertData(
												estate.option,
												estate.option?.join(', ')
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">입주가능일</div>
									<div>{{ common.convertData(estate.moveDate) }}</div>
								</li>
								<li>
									<div class="key">임대인 연락처</div>
									<div>{{ common.convertData(estate.landLordPhone) }}</div>
								</li>
								<li>
									<div class="key">현 임차인 연락처</div>
									<div>{{ common.convertData(estate.currentLesseePhone) }}</div>
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
						<b-button v-if="edit" type="button" variant="danger" @click="deleteDetail">
							삭제
						</b-button>
						<b-button v-if="edit" type="button" variant="primary" @click="routeUpdate">
							수정
						</b-button>
					</div>
				</div>
			</div>
		</b-overlay>
	</div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';
import common from '@/utils/common';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const store = useStore();
const router = useRouter();
const { notify } = useNotification();
const props = defineProps({
	id: String,
	edit: { type: Boolean, default: true },
});
const emit = defineEmits(['delete', 'hide']);
let isLoading = ref(false);

let carouselComp = ref(null);
const estate = computed(() => store.state.estate.detail.estate);
const dateTime = computed(() => estate.value.createDatetime?.toDate().toLocaleString('ko-KR'));
const address = computed(() => {
	let result = '';
	if (estate.value.postcode) result += `(${estate.value.postcode}) `;
	if (estate.value.address) result += `${estate.value.address} `;
	if (estate.value.addressDetail) result += `${estate.value.addressDetail}`;
	return result;
});
const setEstate = (payload) => store.commit('estate/detail/SET_ESTATE', payload);
const fetchEstate = (id) => store.dispatch('estate/detail/FETCH_ESTATE', id);
const deleteEstate = (id) => store.dispatch('estate/detail/DELETE_ESTATE', id);
const fetchDetail = async () => {
	try {
		isLoading.value = true;
		await fetchEstate(props.id);
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
const deleteDetail = async () => {
	try {
		isLoading.value = true;
		await deleteEstate(props.id);
		notify({ type: 'success', text: '매물이 삭제되었습니다.' });
		emit('delete');
	} catch (error) {
		notify({ type: 'error', text: error.message });
	} finally {
		isLoading.value = false;
	}
};
const routeUpdate = () => {
	router.push(`/estate/${props.id}`);
	emit('hide');
};
onMounted(() => {
	const modal = document.querySelector('#modal-estate');
	modal.addEventListener('show.bs.modal', () => {
		nextTick(async () => {
			if (estate.value.photo && estate.value.photo.length) {
				carouselComp.value.updateSlideWidth();
			}
			await fetchDetail();
		});
	});
	modal.addEventListener('hide.bs.modal', () => {
		setEstate({});
	});
});
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
