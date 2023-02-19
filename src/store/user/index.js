export default {
	namespaced: true,
	state: {
		user: {},
	},
	mutations: {
		SET_USER: (state, payload) => {
			state.user = payload;
		},
	},
};
