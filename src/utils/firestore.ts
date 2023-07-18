import {
  collection,
  query,
  limit,
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
  cursor: QueryDocumentSnapshot<Type> | null,
  order: Array<any> | null
): Promise<QuerySnapshot<Type>> => {
  const clauses = order ? orderBy(order[0], order[1]) : orderBy('id');
  const clauses2 = cursor ? [startAfter(cursor)] : [];

  const resolvedQuery = query<Type>(
    collection(db, id) as Query<Type>,
    clauses,
    ...clauses2,
    limit(10)
  );

  const snapshot = await getDocs(resolvedQuery);
  if (snapshot.empty && !cursor)
    return fetchCollection<Type>('dresses', null, null);

  return snapshot;
};
