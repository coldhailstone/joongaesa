import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signOut,
	deleteUser,
	setPersistence,
	browserSessionPersistence,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA5oSZUdjxR-vF9gHD7-gh8TfuSsyRrVA4',
	authDomain: 'joongaesa.firebaseapp.com',
	projectId: 'joongaesa',
	storageBucket: 'joongaesa.appspot.com',
	messagingSenderId: '796796122060',
	appId: '1:796796122060:web:6b71f76a5e395314bc2369',
	measurementId: 'G-WKZ852HBEH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Auth
const auth = getAuth();
const provider = new GoogleAuthProvider();
export const setPersistenceSession = () => {
	return setPersistence(auth, browserSessionPersistence);
};
export const signInWithGoogle = () => {
	return signInWithPopup(auth, provider);
};
export const createUserWithEmail = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithEmail = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};
export const sendEmailVerify = () => {
	return sendEmailVerification(getUser());
};
export const signOutUser = () => {
	return signOut(auth);
};
export const removeUser = () => {
	return deleteUser(getUser());
};
export const getUser = () => {
	return auth.currentUser;
};
export const getSessionKey = () => {
	return `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;
};
export const getSessionUser = () => {
	return sessionStorage.getItem(getSessionKey());
};
export const isLogin = () => {
	return !!getSessionUser();
};

// store
export const db = getFirestore(app);
export const setDocument = async (path, document, body) => {
	return await setDoc(doc(db, path, document), body);
};
