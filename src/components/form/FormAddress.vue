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

<script setup>
import { ref, watch } from 'vue';
import daumPostcode from '@/api/daumPostcode';

const props = defineProps({
	postcode: String,
	address: String,
	addressDetail: String,
});
const emit = defineEmits(['changeAddress']);

let item = ref({
	postcode: '',
	address: '',
	addressDetail: '',
});
const openDaumPostcode = async () => {
	const result = await daumPostcode(window);
	item.value.postcode = result.zonecode;
	item.value.address = result.address;
	item.value.addressDetail = '';
	emit('changeAddress', getAddress());
};
const getAddress = () => ({ ...item.value });
watch(
	() => props.address,
	() => {
		item.value = { ...props };
	}
);
</script>
