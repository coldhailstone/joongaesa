<template>
	<div>
		<b-form-group>
			<div class="d-flex flex-wrap gap-3 mt-2">
				<b-form-radio
					v-for="form of options"
					:key="form.value"
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

<script>
export default {
	name: 'FormRadio',
	props: {
		options: {
			type: Array,
			default: () => [],
		},
		name: {
			type: String,
			default: '',
		},
	},
};
</script>
