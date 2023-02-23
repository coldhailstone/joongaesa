export default {
	namespaced: true,
	state: {
		estate: {},
	},
	mutations: {
		SET_ESTATE: (state, payload) => {
			state.estate = payload;
		},
	},
	actions: {},
};
