import { useEffect, useState } from 'react';
import {
  useParams,
  Link,
  useLoaderData,
  LoaderFunctionArgs,
} from 'react-router-dom';
import ProductMedia from '../components/product-media';
import ProductDetails from '../components/product-details';
import ProductFooterSection from '../components/product-footer-section';
import LoadingAnimation from '../components/loading-animation';
import { Product } from '../types/listing';

import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';

import styles from './product.module.scss';

const Products = () => {
  const params = useParams<{ title: string; id: string }>();
  const title = params.title;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const productName = title!.split('-').join(' ');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id: string = params.id!;
  const [loading, setLoading] = useState(true);

  const data = useLoaderData() as Product[];
  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div className={styles.main_content}>
        {loading && <LoadingAnimation />}
        <div className={styles.header}>
          <Link to="/">Home</Link>
          <i className="fa-solid fa-angle-right"></i>
          <Link to={`/collections/${id}`}>{id}</Link>
          <i className="fa-solid fa-angle-right"></i>
          <span>{productName}</span>
        </div>
        <div className={styles.product_container}>
          <ProductMedia images={data[0].images} />
          <ProductDetails product={data[0]} id={id} />
        </div>
      </div>
      <ProductFooterSection />
    </>
  );
};

export default Products;

export const getProductData = async ({ params }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id: string = params.id!;
  console.log(id);
  const title = params.title;
  const resolvedQuery = query(collection(db, id), where('id', '==', title));
  const querySnapshot = await getDocs(resolvedQuery);
  const productData = querySnapshot.docs.map((doc) => doc.data());
  //for dummy data
  if (productData.length === 0) {
    {
      const resolvedQuery = query(
        collection(db, 'dresses'),
        where('id', '==', title)
      );
      const querySnapshot = await getDocs(resolvedQuery);
      const productData = querySnapshot.docs.map((doc) => doc.data());
      return productData as Product[];
    }
  }
  return productData as Product[];
};
