import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import firebaseConfig from '@/configs/firebase-config'

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };