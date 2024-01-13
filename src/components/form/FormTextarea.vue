<template>
	<div>
		<b-form-textarea
			:value="modelValue"
			:rows="rows"
			noResize
			@input="$emit('update:modelValue', $event)"
		/>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: string;
	rows?: number;
}

withDefaults(defineProps<Props>(), {
	rows: 5,
});
defineEmits(['update:modelValue']);
</script>
