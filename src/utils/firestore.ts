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
//import { AppliedFilter } from '../components/applied-filter';

import { db } from '../config/firebase-config';
import { SORT_OPTIONS } from '../constants/sort';

export const fetchCollection = async <Type>(
  id: string,
  cursor: QueryDocumentSnapshot<Type> | null,
  orderKey: keyof typeof SORT_OPTIONS | null
  //filters: Array<AppliedFilter> | null
): Promise<QuerySnapshot<Type>> => {
  const order = orderKey ? SORT_OPTIONS[orderKey] : null;
  const sort = order ? orderBy(order[0], order[1]) : orderBy('id');
  const pagination = cursor ? [startAfter(cursor)] : [];
  /*   const clauses =
    filters?.map((filter) => {
      where(filter.filterType, '==', filter.value);
    }) || [];  */

  const resolvedQuery = query<Type>(
    collection(db, id) as Query<Type>,
    // ...clauses,
    sort,
    ...pagination,
    limit(10)
  );

  const snapshot = await getDocs(resolvedQuery);
  if (snapshot.empty && !cursor)
    return fetchCollection<Type>('dresses', null, null);

  return snapshot;
};
