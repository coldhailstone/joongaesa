<template>
	<div>
		<b-form-group>
			<div class="radio-options d-flex flex-wrap gap-3 mt-2">
				<b-form-radio
					v-for="form of options"
					:key="form.value"
					v-model="selected"
					:value="form.value"
					:name="name"
					@input="$emit('update:modelValue', $event)"
				>
					{{ form.text }}
				</b-form-radio>
			</div>
		</b-form-group>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';

interface Props {
	modelValue?: string;
	name: string;
	options: [
		{
			value: string;
			text: string;
		}
	];
}

const props = defineProps<Props>();
defineEmits(['update:modelValue']);

let selected: Ref<string> = ref('');
watch(
	() => props.modelValue,
	(v) => {
		selected.value = v;
	}
);
</script>

<style lang="scss" scoped>
.radio-options {
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
