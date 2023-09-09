import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig={
    
    apiKey: "AIzaSyA_5mPGunELZ58Zff_3BSgeygkui-wEvQI",
    authDomain: "return-easy-df48b.firebaseapp.com",
    projectId: "return-easy-df48b",
    storageBucket: "return-easy-df48b.appspot.com",
    messagingSenderId: "721311658723",
    appId: "1:721311658723:web:10fbb124705c9685d78bd6"
      
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };