import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, getDocs, where } from 'firebase/firestore';
import ProductMedia from '../components/product-media';

import { db } from '../config/firebase-config';

import styles from './product.module.scss';

const Products = () => {
  const params = useParams<{ title: string; id: string }>();
  const title = params.title;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const productName = title!.split('-').join(' ');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id: string = params.id!;
  const [product, setProduct] = useState<any>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const resolvedQuery = query(collection(db, id), where('id', '==', title));
    const getProducts = async () => {
      const querySnapshot = await getDocs(resolvedQuery);
      const productData = querySnapshot.docs.map((doc) => doc.data());
      console.log(productData);
      setProduct(productData);
    };
    getProducts();
  }, [id, title]);

  useEffect(() => {
    if (product[0]?.images) {
      setImages(product[0].images);
    }
  }, [product]);

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
        <ProductMedia images={images} />
        <div className={styles.details_section}></div>
      </div>
    </div>
  );
};

export default Products;
