import { add, getList } from '@/api/firebase';

export default {
	namespaced: true,
	state: {
		path: 'estate',
		estateList: [],
	},
	mutations: {
		SET_ESTATE_LIST: (state, payload) => {
			state.estateList = payload;
		},
	},
	actions: {
		async FETCH_ESTATE({ state, commit }) {
			commit('SET_ESTATE_LIST', await getList(state.path));
		},
		async CREATE_ESTATE({ state }, body) {
			return await add(state.path, body);
		},
		CREATE_PHOTO() {},
	},
};
