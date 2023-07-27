import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, getDocs, where } from 'firebase/firestore';

import { db } from '../config/firebase-config';

const Products = () => {
  const params = useParams<{ title: string; id: string }>();
  const title = params.title;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id: string = params.id!;

 
  const resolvedQuery = query(collection(db, id), where('id', '==', title));
  const snapshot = getDocs(resolvedQuery);

  const fetchProducts = async () => {
    const product = await snapshot;
    const productData = product.docs.map((doc) => doc.data());
    console.log(productData[0]);
  };
  useEffect(() => {
    const productData = fetchProducts();
  }, []);

  

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Products;
