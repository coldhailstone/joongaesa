import { getDetail, updateData, deleteData } from '@/api/firebase';

export default {
	namespaced: true,
	state: {
		path: 'customer',
		customer: {},
	},
	mutations: {
		SET_CUSTOMER: (state, payload) => {
			state.customer = payload;
		},
	},
	actions: {
		async FETCH_CUSTOMER({ state, commit }, id) {
			commit('SET_CUSTOMER', await getDetail(state.path, id));
		},
		async UPDATE_CUSTOMER({ state }, { id, body }) {
			return await updateData(state.path, id, body);
		},
		async DELETE_CUSTOMER({ state }, id) {
			return await deleteData(state.path, id);
		},
	},
};
