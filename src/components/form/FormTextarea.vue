<template>
	<div>
		<b-form-textarea
			:value="value"
			:rows="rows"
			noResize
			@input="$emit('update:modelValue', $event)"
		/>
	</div>
</template>

<script>
export default {
	name: 'FormTextarea',
	props: {
		value: {
			type: String,
			default: '',
		},
		rows: {
			type: Number,
			default: 5,
		},
	},
};
</script>
