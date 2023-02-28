<template>
	<div class="d-flex align-items-center gap-1">
		<span v-if="prefix" v-html="prefix"></span>
		<b-form-input
			:value="value"
			:type="type"
			:placeholder="placeholder"
			@input="$emit('update:modelValue', $event)"
		/>
		<span v-if="suffix" v-html="suffix"></span>
	</div>
</template>

<script>
export default {
	name: 'FormInput',
	props: {
		value: {
			type: [String, Number],
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
			default: '',
		},
		prefix: {
			type: String,
			default: '',
		},
		suffix: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss" scoped>
span {
	width: 62px;
}
</style>
