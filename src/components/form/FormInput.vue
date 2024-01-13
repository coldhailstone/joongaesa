<template>
	<div class="d-flex align-items-center gap-1">
		<span v-if="prefix" v-html="prefix"></span>
		<b-form-input
			:value="modelValue"
			:type="type"
			:placeholder="placeholder"
			@input="$emit('update:modelValue', $event)"
		/>
		<span v-if="suffix" v-html="suffix"></span>
	</div>
</template>

<script setup lang="ts">
defineProps({
	modelValue: [String, Number],
	placeholder: String,
	prefix: String,
	suffix: String,
	type: { type: String, default: 'text' },
});
defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
span {
	width: 62px;
}
</style>
