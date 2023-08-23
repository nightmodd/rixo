mport {
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

//import { AppliedFilter } from '../components/applied-filter';


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

  cursor: QueryDocumentSnapshot<Type> | null,
  order: Array<any> | null
  //filters: Array<AppliedFilter> | null
): Promise<QuerySnapshot<Type>> => {
  const clauses2 = order ? orderBy(order[0], order[1]) : orderBy('id');
  const clauses3 = cursor ? [startAfter(cursor)] : [];
 /*   const clauses =
    filters?.map((filter) => {
      where(filter.filterType, '==', filter.value);
    }) || [];  */

  const resolvedQuery = query<Type>(
    collection(db, id) as Query<Type>,
   // ...clauses,
    clauses2,
    ...clauses3,
    limit(10)
  );

  const snapshot = await getDocs(resolvedQuery);
  if (snapshot.empty && !cursor)
    return fetchCollection<Type>('dresses', null, null);


  return snapshot;
};
