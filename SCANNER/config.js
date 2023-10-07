import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig={
    
  apiKey: "AIzaSyDGj4Gw3pucthISZ_lahzPO60gw983FvOc",
  authDomain: "qr-registree-mad.firebaseapp.com",
  projectId: "qr-registree-mad",
  storageBucket: "qr-registree-mad.appspot.com",
  messagingSenderId: "284270592487",
  appId: "1:284270592487:web:37be55b76a6eee50483d42",
  measurementId: "G-8R3SDTT8FK"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };