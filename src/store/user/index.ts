import { auth, getSessionKey, provider } from '@/api/firebase';
import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	deleteUser,
	sendEmailVerification,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

export default {
	namespaced: true,
	state: {
		user: {},
	},
	mutations: {
		SET_USER: (state, payload) => {
			state.user = payload;
		},
	},
	actions: {
		FETCH_USER({ commit }) {
			const user = auth.currentUser;
			if (user && user.emailVerified) commit('SET_USER', user);
		},
		async FETCH_SESSION_USER({ commit }) {
			const user = await sessionStorage.getItem(getSessionKey());
			if (user) commit('SET_USER', JSON.parse(user));
		},
		SET_PERSISTENCE() {
			return setPersistence(auth, browserSessionPersistence);
		},
		SIGN_IN_WITH_POPUP() {
			return signInWithPopup(auth, provider);
		},
		SIGN_IN_WITH_EMAIL(_, { email, password }) {
			return signInWithEmailAndPassword(auth, email, password);
		},
		CREATE_USER_WITH_EMAIL(_, { email, password }) {
			return createUserWithEmailAndPassword(auth, email, password);
		},
		SEND_EMAIL_VERIFICATION() {
			return sendEmailVerification(auth.currentUser);
		},
		async SIGN_OUT({ commit }) {
			await signOut(auth);
			commit('SET_USER', {});
		},
		async DELETE_USER({ commit }) {
			await deleteUser(auth.currentUser);
			commit('SET_USER', {});
		},
	},
};
