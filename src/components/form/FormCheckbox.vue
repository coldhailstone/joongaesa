<template>
	<div>
		<b-form-group>
			<div class="d-flex flex-wrap gap-3 mt-2">
				<b-form-checkbox-group
					v-model="selected"
					:options="options"
					@change="$emit('update:modelValue', selected)"
				/>
			</div>
		</b-form-group>
	</div>
</template>

<script>
export default {
	name: 'FormCheckbox',
	props: {
		value: {
			type: Array,
			default: () => [],
		},
		options: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			selected: [],
		};
	},
	mounted() {
		this.selected = this.value;
	},
};
</script>
