import { where } from '@firebase/firestore';
import { getList, add, uploadFile } from '@/api/firebase';
import store from '@/store';

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
				await getList(state.path, [
					where('userId', '==', store.state.user.user.uid),
					...queryList.map((query) => where(query.key, '==', query.value)),
				])
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
