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

<script setup>
defineProps({
	modelValue: String,
	rows: {
		type: Number,
		default: 5,
	},
});
defineEmits(['update:modelValue']);
</script>
