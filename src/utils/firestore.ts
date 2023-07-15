import {
  collection,
  query,
  limit,
  Firestore,
  getDocs,
  Query,
  QuerySnapshot,
  startAfter,
  orderBy,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { db } from '../config/firebase-config';

export const fetchCollection = async <Type>(
  id: string,
  cursor: QueryDocumentSnapshot<Type> | null
): Promise<QuerySnapshot<Type>> => {
  const clauses = cursor ? [startAfter(cursor)] : [];

  const resolvedQuery = query<Type>(
    collection(db, id) as Query<Type>,
    orderBy('id'),
    ...clauses,
    limit(12)
  );

  const snapshot = await getDocs(resolvedQuery);

  if (snapshot.empty && !cursor) return fetchCollection<Type>('dresses', null);

  return snapshot;
};
