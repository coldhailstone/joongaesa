<template>
	<div>
		<div class="container mt-3 d-flex flex-column gap-4">
			<div>
				<b-button class="float-end" variant="primary" @click="$router.push('estate/new')">
					매물 등록
				</b-button>
			</div>
			<div class="d-flex flex-wrap gap-5">
				<estate-card
					v-for="estate of estateList"
					:key="estate.id"
					:item="estate"
					@clickCard="showDetailModal"
				/>
			</div>
		</div>

		<modal-estate :id="modalId" />
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Modal } from 'bootstrap';
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
			modalEstate: null,
			modalId: '',
		};
	},
	computed: {
		...mapState('estate/list', ['estateList']),
	},
	mounted() {
		this.modalEstate = new Modal(document.querySelector('#modal-estate'));
	},
	methods: {
		...mapMutations('loading', ['SET_LOADING']),
		showDetailModal(id) {
			this.modalId = id;
			this.modalEstate.show();
		},
	},
};
</script>
