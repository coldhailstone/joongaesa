import { where } from '@firebase/firestore';
import { getList, add, uploadFile } from '@/api/firebase';

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
		async FETCH_ESTATE_LIST({ state, commit }, queryList) {
			commit(
				'SET_ESTATE_LIST',
				await getList(
					state.path,
					queryList.map((query) => where(query.key, '==', query.value))
				)
			);
		},
		async CREATE_ESTATE({ state }, body) {
			if (body.photo && body.photo.length) {
				const photo = await Promise.all(body.photo.map((file) => uploadFile(file)));
				body.photo = photo;
			}
			return await add(state.path, body);
		},
		CREATE_PHOTO() {},
	},
};
