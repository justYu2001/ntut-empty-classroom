import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';
import firebaseConfig from '@/configs/firebase-config'

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

if(import.meta.env.DEV) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export { firestore };