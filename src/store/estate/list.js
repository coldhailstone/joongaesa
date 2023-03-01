import { where, serverTimestamp } from '@firebase/firestore';
import { getList, addData, uploadFile } from '@/api/firebase';
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
					...queryList.map((query) => where(query.key, query.operator, query.value)),
				])
			);
		},
		async CREATE_ESTATE({ state }, body) {
			body.userId = store.state.user.user.uid;
			body.createDatetime = serverTimestamp();
			if (body.photo && body.photo.length) {
				const photo = await Promise.all(body.photo.map((file) => uploadFile(file)));
				body.photo = photo;
			}
			return await addData(state.path, body);
		},
	},
};
