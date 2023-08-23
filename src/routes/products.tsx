/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEventHandler,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import SizesSelector from '../components/size-selector';
import LoadingAnimation from '../components/loading-animation';
import { PaginationState, Product, Size } from '../types/listing';
import { fetchCollection } from '../utils/firestore';

import bagImage from '../assets/shopping_bag.svg';
import styles from './products.module.scss';
import clsx from 'clsx';

const relatedProducts = [
  {
    title: 'Clothing',
    path: '/collections/clothing',
  },
  {
    title: 'Skirts',
    path: '/collections/skirts',
  },
  {
    title: 'Tops',
    path: '/collections/tops',
  },
  {
    title: 'Bridal',
    path: '/collections/bridal',
  },
];

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
      <div className={styles.upper_section}>
        <div className={styles.header}>
          <div className={styles.header_left}>
            <Link to="/">Home</Link>
            <i className="fa-solid fa-angle-right"></i>
            <span>{id}</span>
          </div>
        </div>

        <span className={styles.title}>{id}</span>
        <p className={styles.description}>
          These are the only Unique data that we have.
        </p>
        { <ul className={styles.related_products}>
          {relatedProducts.map((product) => (
            <li key={product.title}>
              <Link to={product.path}>{product.title}</Link>
            </li>
          ))}
        </ul> }
      </div>

      <div className={styles.lower_section}>
        <div className={styles.filter_section}></div>
        <div className={`${styles.products_section} ${styles.grid_4} `}>
          {paginationState.data.map((product) => (
            <div
              className={styles.product_card}
              key={product.id}
              data-id={product.id}
              onMouseLeave={mouseLeave}
            >
              <div className={styles.action_container}>
                <Link to={'/'} className={styles.product_images}>
                  <img
                    src={product.images[0]}
                    alt="product"
                    className={`${styles.images}`}
                  />
                  <img
                    src={product.images[1]}
                    alt="product"
                    className={`${styles.hidden_img} ${styles.images}`}
                  />
                </Link>
                <SizesSelector
                  product={product}
                  selection={selection}
                  handleSelect={handleSelect}
                />
              </div>

              <div className={styles.product_details}>
                <div className={styles.product_details_top}>
                  <Link to={'/'} className={styles.product_name}>
                    {product.name}
                  </Link>
                </div>
                <div className={styles.product_details_bottom}>
                  <Link to={'/'} className={styles.product_price}>
                    {product.currency} {product.price}
                  </Link>
                  <button
                    className={styles.show_sizes_button}
                    data-id={product.id}
                    onClick={showMobileSizes}
                  >
                    <img src={bagImage} alt="bag" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={clsx({
          [styles.mobile_buy]: true,
          [styles.show_mobile_buy]: mobileData,
        })}
      >
        <div className={styles.mobile_buy_upper}>
          <div className={styles.product_details_mobile}>
            <span className={styles.product_name}>{mobileData?.name}</span>
            <span className={styles.product_price}>
              {mobileData?.currency} {mobileData?.price}
            </span>
          </div>
          <button onClick={closeMobileBuy}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={styles.mobile_buy_bottom}>
          {mobileData && (
            <SizesSelector
              product={mobileData}
              selection={selection}
              handleSelect={handleMobileSelect}
            />
          )}
        </div>
      </div>

      {paginationState.hasMore && (
        <div ref={loadingAnimation}>
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default Products;
