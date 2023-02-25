import { db } from '@/api/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
	namespaced: true,
	state: {
		estateList: [],
	},
	mutations: {
		SET_ESTATE_LIST: (state, payload) => {
			state.estateList = payload;
		},
	},
	actions: {
		async CREATE_ESTATE(_, body) {
			console.log(body);
			const ref = collection(db, 'estate');
			try {
				const res = await addDoc(ref, body);
				console.log(res); // res는 undefined입니다.
			} catch (error) {
				console.log(error);
			}
		},
		CREATE_PHOTO() {},
	},
};
