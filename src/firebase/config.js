import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAplHlDsFOjqGvfO-7bZ7yz-CVI-p6fssA',
	authDomain: 'cooking-recipes-site.firebaseapp.com',
	projectId: 'cooking-recipes-site',
	storageBucket: 'cooking-recipes-site.appspot.com',
	messagingSenderId: '784443708907',
	appId: '1:784443708907:web:63a787d8bc2385c894f5ae',
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

//initialize services
const projectFirestore = firebase.firestore();

export { projectFirestore };
