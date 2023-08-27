/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEventHandler,
} from 'react';
import { useParams } from 'react-router-dom';
import ProductUpperSection from '../components/products-upper-section';
import ProductLowerSection from '../components/product-lower-section';
import ProductsMobileBuy from '../components/products-mobile-buy';
import LoadingAnimation from '../components/loading-animation';
import { PaginationState, Product, Size } from '../types/listing';
import { fetchCollection } from '../utils/firestore';

import styles from './products.module.scss';

export interface Selection extends Size {
  productId: string;
}

const Products = () => {
  const params = useParams<{ id: string }>();
  const id = params.id!;
  const prevId = useRef<string>('');

  const loadingAnimation = useRef<HTMLDivElement>(null);
  const [mobileData, setMobileData] = useState<Product | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);

  const [paginationState, setPaginationState] = useState<
    PaginationState<Product>
  >({
    data: [],
    hasMore: true,
    cursor: null,
  });

  const fetchData = useCallback(
    async (id: string, cursor: PaginationState<Product>['cursor']) => {
      const revalidate = prevId.current !== id;

      prevId.current = id;

      const snapshot = await fetchCollection<Product>(id, cursor);
      const docs = snapshot.docs.map((doc) => doc.data());

      if (revalidate) {
        return setPaginationState({
          data: [...docs],
          hasMore: docs.length > 0,
          cursor: snapshot.docs[snapshot.docs.length - 1],
        });
      }

      setPaginationState((prev) => ({
        data: [...prev.data, ...docs],
        hasMore: docs.length > 0,
        cursor: snapshot.docs[snapshot.docs.length - 1],
      }));
    },
    []
  );

  useEffect(() => {
    fetchData(id, null);
  }, [fetchData, id]);

  //for observer
  useEffect(() => {
    const loading = loadingAnimation.current;
    if (loading === null) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchData(id, paginationState.cursor);
        }
      });
    }, {});

    observer.observe(loading);

    return () => {
      observer.disconnect();
    };
  }, [fetchData, id, paginationState.cursor]);

  const mouseLeave = () => {
    if (window.innerWidth < 814) return;

    setSelection(null);
  };

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const card = target.closest(`.${styles.product_card}`) as HTMLDivElement;

    const value = target.getAttribute('data-size') as string;
    const productId = card.getAttribute('data-id') as string;
    const product = paginationState.data.find(
      (product) => product.id === productId
    )!;
    const size = product.sizes.find((size) => size.value === value)!;

    setSelection({ ...size, productId });
  };

  const handleMobileSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const card = target.closest(`.${styles.hover_animation}`) as HTMLDivElement;

    const value = target.getAttribute('data-size') as string;
    const productId = card.getAttribute('data-id') as string;
    const product = paginationState.data.find(
      (product) => product.id === productId
    )!;
    const size = product.sizes.find((size) => size.value === value)!;

    setSelection({ ...size, productId });
  };

  const showMobileSizes: MouseEventHandler<HTMLButtonElement> = (event) => {
    closeMobileBuy();
    setSelection(null);
    const target = event.currentTarget as HTMLButtonElement;
    const id = target.getAttribute('data-id') as string;
    setTimeout(() => {
      const product = paginationState.data.find(
        (product) => product.id === id
      )!;

      setMobileData(product);
    }, 200);
  };

  const closeMobileBuy = () => {
    setMobileData(null);
  };

  return (
    <div className={styles.main_content} key={id}>
      {ProductUpperSection(id)}
      {ProductLowerSection({
        paginationState,
        selection,
        handleSelect,
        showMobileSizes,
        mouseLeave,
      })}
      {ProductsMobileBuy({
        mobileData,
        selection,
        handleMobileSelect,
        closeMobileBuy,
      })}
      {paginationState.hasMore && (
        <div ref={loadingAnimation}>
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default Products;
