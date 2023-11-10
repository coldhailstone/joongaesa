import _ from 'lodash';

export default {
	setOptions(constant) {
		return constant.map((text) => ({
			text,
			value: text,
		}));
	},
	convertData(value, convertValue) {
		if (!value || !value.length) return '-';
		return convertValue ?? value;
	},
	convertTel(tel) {
		return tel?.replace(/\D+/g, '').replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
	},
	cloneDeep(obj) {
		return _.cloneDeep(obj);
	},
	isEmpty(obj) {
		return _.isEmpty(obj);
	},
	addQuery(list, key, value) {
		if (!value) return;

		list.push({
			key,
			value,
			operator: '==',
		});
	},
};
