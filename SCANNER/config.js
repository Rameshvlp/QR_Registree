import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig={
    
    apiKey: "AIzaSyDj5ZpVo_HKxmCehkd-OpXiPjmGulTDOcY",
  authDomain: "qr-registree-40be3.firebaseapp.com",
  projectId: "qr-registree-40be3",
  storageBucket: "qr-registree-40be3.appspot.com",
  messagingSenderId: "733968466445",
  appId: "1:733968466445:web:323596faeb881484400b44",
  measurementId: "G-63MCM4LFFS"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };