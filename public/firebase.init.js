// import { initializeApp } from 'firebase/app';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js';

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
