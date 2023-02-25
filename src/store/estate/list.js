import { add, get } from '@/api/firebase';

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
		async FETCH_ESTATE({ state }) {
			await get(state.path);
		},
		async CREATE_ESTATE({ state }, body) {
			console.log(body);
			await add(state.path, body);
		},
		CREATE_PHOTO() {},
	},
};
