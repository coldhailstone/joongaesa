import { where, serverTimestamp } from '@firebase/firestore';
import { getList, addData } from '@/api/firebase';
import store from '@/store';

export default {
	namespaced: true,
	state: {
		path: 'customer',
		customerList: [],
	},
	mutations: {
		SET_CUSTOMER_LIST: (state, payload) => {
			state.customerList = payload;
		},
	},
	actions: {
		async FETCH_CUSTOMER_LIST({ state, commit }, queryList) {
			commit(
				'SET_CUSTOMER_LIST',
				await getList(state.path, [
					where('userId', '==', store.state.user.user.uid),
					...queryList.map((query) => where(query.key, '==', query.value)),
				])
			);
		},
		async CREATE_CUSTOMER({ state }, body) {
			body.userId = store.state.user.user.uid;
			body.createDatetime = serverTimestamp();
			return await addData(state.path, body);
		},
	},
};
