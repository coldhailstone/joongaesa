export default {
	setOptions(constant) {
		return constant.map((text) => ({
			text,
			value: text,
		}));
	},
	convertTel(tel) {
		return tel?.replace(/\D+/g, '').replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
	},
};