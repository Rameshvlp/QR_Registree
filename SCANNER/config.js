import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig={
    
(Put your app key)
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
