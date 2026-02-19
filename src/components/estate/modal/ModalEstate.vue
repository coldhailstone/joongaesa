<template>
	<div id="modal-estate" class="modal" tabindex="-1">
		<b-overlay class="h-100" :show="isLoading" rounded="sm">
			<div class="modal-dialog modal-lg modal-dialog-scrollable">
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
							<h5 class="section-title">기본 정보</h5>
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
							<h5 class="section-title">거래 정보</h5>
							<ul class="info">
								<li>
									<div class="key">보증금</div>
									<div>
										{{
											estate.deposit
												? `${Number(estate.deposit).toLocaleString(
														'ko-KR'
												  )}만원`
												: '-'
										}}
									</div>
								</li>
								<li>
									<div class="key">월세</div>
									<div>
										{{
											estate.monthly
												? `${Number(estate.monthly).toLocaleString()}만원`
												: '-'
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
							<h5 class="section-title">기타 정보</h5>
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
									<div>
										{{
											common.convertData(
												estate.landLordPhone,
												common.convertTel(estate.landLordPhone)
											)
										}}
									</div>
								</li>
								<li>
									<div class="key">현 임차인 연락처</div>
									<div>
										{{
											common.convertData(
												estate.currentLesseePhone,
												common.convertTel(estate.currentLesseePhone)
											)
										}}
									</div>
								</li>
							</ul>
						</div>
						<div>
							<h5 class="section-title">상세 설명</h5>
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

<script setup lang="ts">
import { Estate } from '@/types/estate';
import common from '@/utils/common';
import { useNotification } from '@kyvg/vue3-notification';
import { Ref, computed, nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

interface Props {
	id: string;
	edit?: boolean;
}

const store = useStore();
const router = useRouter();
const { notify } = useNotification();
const props = withDefaults(defineProps<Props>(), {
	edit: true,
});
const emit = defineEmits(['delete', 'hide']);
let isLoading: Ref<boolean> = ref(false);

const estate = computed<Estate>(() => store.state.estateDetail.estate);
const dateTime = computed<string>(() =>
	estate.value.createDatetime?.toDate().toLocaleString('ko-KR')
);
const address = computed<string>(() => {
	let result = '';
	if (estate.value.postcode) result += `(${estate.value.postcode}) `;
	if (estate.value.address) result += `${estate.value.address} `;
	if (estate.value.addressDetail) result += `${estate.value.addressDetail}`;
	return result;
});
const setEstate = (payload) => store.commit('estateDetail/SET_ESTATE', payload);
const fetchEstate = (id) => store.dispatch('estateDetail/FETCH_ESTATE', id);
const deleteEstate = (id) => store.dispatch('estateDetail/DELETE_ESTATE', id);
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
		emit('delete');
		notify({ type: 'success', text: '매물이 삭제되었습니다.' });
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
			await fetchDetail();
		});
	});
	modal.addEventListener('hide.bs.modal', () => {
		setEstate({});
	});
});
</script>

<style lang="scss" scoped>
.photo-carousel {
	border-radius: 8px;
	overflow: hidden;

	:deep(.carousel-item img) {
		height: 300px;
		width: 100%;
		object-fit: cover;
	}
}

.section-title {
	font-weight: 700;
	font-size: 0.95rem;
	color: #111827;
	margin-bottom: 16px;
	padding-bottom: 10px;
	border-bottom: 1px solid #e5e7eb;
	display: block;
}

.info {
	list-style-type: none;
	padding-left: 0;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	overflow: hidden;
	li {
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid #e5e7eb;
		&:last-child {
			border-bottom: 0;
		}
		> div {
			width: 75%;
			min-height: 46px;
			display: flex;
			align-items: center;
			padding: 8px 14px;
			overflow: hidden;
			font-size: 0.875rem;
			color: #111827;
		}
		.key {
			width: 25%;
			min-height: 46px;
			background: #f9fafb;
			border-right: 1px solid #e5e7eb;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.8rem;
			font-weight: 600;
			color: #6b7280;
			text-align: center;
			padding: 4px 8px;
		}
	}
}
</style>
