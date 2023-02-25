import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from '@firebase/firestore';

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
export const add = async (path, body) => {
	return await addDoc(collection(db, path), body);
};
export const getList = async (path) => {
	const snapshots = await getDocs(collection(db, path));
	return snapshots.docs.map((doc) => doc.data());
};
export const getDetail = async (path, id) => {
	const ref = await getDoc(doc(db, path, id));
	return ref.data();
};
