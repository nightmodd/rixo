import {
  useParams,
  Link,
  useLoaderData,
  LoaderFunctionArgs,
} from 'react-router-dom';
import ProductMedia from '../components/product-media';
import ProductDetails from '../components/product-details';
import ProductFooterSection from '../components/product-footer-section';
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

  const data = useLoaderData() as Product[];

  return (
    <div className={styles.main_content}>
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
      <ProductFooterSection />
    </div>
  );
};

export default Products;

export const getProductData = async ({ params }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id: string = params.id!;
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
