import { QueryDocumentSnapshot, WithFieldValue } from '@firebase/firestore/dist/lite';
import { collection } from 'firebase/firestore/lite';

import { firestore } from '@/modules/firebase';
import { Classroom } from "@/types";

const converter = <T>() => ({
    toFirestore: (data: WithFieldValue<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) => {
    return collection(firestore, collectionPath).withConverter(converter<T>());
}

const db = {
    emptyClassroom: dataPoint<Classroom>('empty-classroom'),
};

export { db };
export default db;
