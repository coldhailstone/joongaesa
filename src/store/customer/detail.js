import { serverTimestamp } from '@firebase/firestore';
import { getList, getDetail, addData, updateData, deleteData } from '@/api/firebase';

export default {
	namespaced: true,
	state: {
		path: 'customer',
		customer: {},
		result: {},
	},
	mutations: {
		SET_CUSTOMER: (state, payload) => {
			state.customer = payload;
		},
		SET_RESULT: (state, payload) => {
			state.result = payload;
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
		async FETCH_RESULT({ state, commit }, id) {
			const resultList = await getList(`${state.path}/${id}/result`);
			commit('SET_RESULT', resultList[0]);
		},
		async CREATE_RESULT({ state }, { id, body }) {
			body.createDatetime = serverTimestamp();
			return await addData(`${state.path}/${id}/result`, body);
		},
		async UPDATE_RESULT({ state }, { id, resultId, body }) {
			return await updateData(`${state.path}/${id}/result`, resultId, body);
		},
	},
};
