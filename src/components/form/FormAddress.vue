<template>
	<div>
		<div class="mb-2">
			<b-button @click="openDaumPostcode">주소검색</b-button>
		</div>
		<div class="d-flex flex-column gap-2">
			<b-form-input v-model="item.postcode" class="w-25" placeholder="우편번호" disabled />
			<b-form-input v-model="item.address" placeholder="주소" disabled />
			<b-form-input
				v-model="item.addressDetail"
				placeholder="상세주소"
				@input="$emit('changeAddress', getAddress())"
			/>
		</div>
	</div>
</template>

<script>
import daumPostcode from '@/api/daumPostcode';

export default {
	name: 'FormAddress',
	props: {
		postcode: {
			type: String,
			default: '',
		},
		address: {
			type: String,
			default: '',
		},
		addressDetail: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			item: {
				postcode: '',
				address: '',
				addressDetail: '',
			},
		};
	},
	watch: {
		address() {
			this.item.postcode = this.postcode;
			this.item.address = this.address;
			this.item.addressDetail = this.addressDetail;
		},
	},
	methods: {
		async openDaumPostcode() {
			const result = await daumPostcode(window);
			this.item.postcode = result.zonecode;
			this.item.address = result.address;
			this.item.addressDetail = '';
			this.$emit('changeAddress', this.getAddress());
		},
		getAddress() {
			return {
				postcode: this.item.postcode,
				address: this.item.address,
				addressDetail: this.item.addressDetail,
			};
		},
	},
};
</script>
