import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
} from '@firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const FIREBASE_CONFIG = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
if (location.hostname === 'localhost') {
	self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.VUE_APP_FIREBASE_DEBUG_TOKEN_CI;
}
const app = initializeApp(FIREBASE_CONFIG);
initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(process.env.VUE_APP_FIREBASE_RECAPTCHA_KEY),
	isTokenAutoRefreshEnabled: true,
});
getAnalytics(app);

// auth
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const getSessionKey = () => {
	return `firebase:authUser:${FIREBASE_CONFIG.apiKey}:[DEFAULT]`;
};

// store
export const db = getFirestore(app);
export const getList = async (path, queryList = []) => {
	const q =
		queryList && queryList.length
			? query(collection(db, path), ...queryList)
			: collection(db, path);
	const snapshots = await getDocs(q);
	return snapshots.docs.map((doc) => {
		return { ...doc.data(), id: doc.id };
	});
};
export const getDetail = async (path, id) => {
	const ref = await getDoc(doc(db, path, id));
	return ref.data();
};
export const addData = async (path, body) => {
	return await addDoc(collection(db, path), body);
};
export const updateData = async (path, id, body) => {
	return await updateDoc(doc(db, path, id), body);
};
export const deleteData = async (path, id) => {
	return await deleteDoc(doc(db, path, id));
};

// storage
const storage = getStorage(app);
export const uploadFile = async (file) => {
	const storageRef = ref(storage, `images/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
	const response = await uploadBytes(storageRef, file);
	return { name: file.name, url: await getDownloadURL(response.ref) };
};
