<template>
	<div>
		<b-form-group>
			<div class="checkbox-options d-flex flex-wrap gap-3 mt-2">
				<b-form-checkbox-group
					v-model="selected"
					:options="options"
					@change="$emit('update:modelValue', selected)"
				/>
			</div>
		</b-form-group>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';

interface Props {
	modelValue: [];
	options: [];
}

const props = defineProps<Props>();
defineEmits(['update:modelValue']);

let selected: Ref<[]> = ref([]);
watch(
	() => props.modelValue,
	(arr) => {
		selected.value = arr;
	}
);
</script>

<style lang="scss" scoped>
.checkbox-options {
	background: #f9fafb;
	border: 1px solid #f3f4f6;
	border-radius: 8px;
	padding: 10px 14px;
}

:deep(.form-check-input:checked) {
	background-color: #2563eb;
	border-color: #2563eb;
}
</style>
