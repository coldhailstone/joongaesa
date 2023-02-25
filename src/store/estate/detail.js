import { getDetail } from '@/api/firebase';

export default {
	namespaced: true,
	state: {
		path: 'estate',
		estate: {},
	},
	mutations: {
		SET_ESTATE: (state, payload) => {
			state.estate = payload;
		},
	},
	actions: {
		async FETCH_ESTATE({ state, commit }, id) {
			commit('SET_ESTATE', await getDetail(state.path, id));
		},
	},
};
