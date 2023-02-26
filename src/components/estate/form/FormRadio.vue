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

<script>
export default {
	name: 'FormRadio',
	props: {
		value: {
			type: String,
			default: () => '',
		},
		options: {
			type: Array,
			default: () => [],
		},
		name: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			selected: '',
		};
	},
	watch: {
		value: {
			handler(newVal) {
				this.selected = newVal;
			},
		},
	},
};
</script>
