<template>
	<div>
		<b-form-group>
			<div class="d-flex flex-wrap gap-3 mt-2">
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
import { ref, watch } from 'vue';

interface Props {
	modelValue: string;
	name: string;
	options: [];
}

const props = defineProps<Props>();
defineEmits(['update:modelValue']);

let selected = ref('');
watch(
	() => props.modelValue,
	(v) => {
		selected.value = v;
	}
);
</script>
