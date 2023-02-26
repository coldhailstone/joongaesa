import { getDetail, uploadFile, updateData, deleteData } from '@/api/firebase';

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
		async UPDATE_ESTATE({ state }, { id, body }) {
			if (body.photo && body.photo.length) {
				const photo = await Promise.all(
					body.photo.filter((file) => !file.url).map((file) => uploadFile(file))
				);
				body.photo = [...photo, ...body.photo.filter((file) => file.url)];
			}
			return await updateData(state.path, id, body);
		},
		async DELETE_ESTATE({ state }, id) {
			return await deleteData(state.path, id);
		},
	},
};
