import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEventHandler,
} from 'react';
import { useLocation } from 'react-router';
import { useParams, useLoaderData, LoaderFunctionArgs } from 'react-router-dom';

import SortMenu from '../components/sort';
import ProductUpperSection from '../components/products-upper-section';
import ProductLowerSection from '../components/products-lower-section';
import ProductsMobileBuy from '../components/products-mobile-buy';
import LoadingAnimation from '../components/loading-animation';
import ProductsMobileFilters from '../components/products-mobile-filters';

import { AppliedFilter } from '../components/applied-filter';
import { PaginationState, Product, Size } from '../types/listing';
import { fetchCollection } from '../utils/firestore';

import styles from './products.module.scss';
import clsx from 'clsx';
import { SORT_OPTIONS } from '../constants/sort';

export interface Selection extends Size {
  productId: string;
}

const Products = () => {
  const params = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = params.id!;

  const prevId = useRef<string>('');
  const backdropMobile = useRef<HTMLDivElement>(null);
  const loadingAnimation = useRef<HTMLDivElement>(null);

  const [mobileData, setMobileData] = useState<Product | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [sortBy, setSortBy] = useState<keyof typeof SORT_OPTIONS | null>(null);
  const [tempFilters, setTempFilters] = useState<Array<AppliedFilter> | null>(
    []
  );
  const [activeFilters, setActiveFilters] =
    useState<Array<AppliedFilter> | null>([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const [paginationState, setPaginationState] = useState<
    PaginationState<Product>
  >({
    data: [],
    hasMore: true,
    cursor: null,
  });

  const data = useLoaderData() as Product[];
  console.log(data);
  const location = useLocation();

  //getting data from firestore
  const fetchData = useCallback(
    async (
      id: string,
      cursor: PaginationState<Product>['cursor'],
      order: keyof typeof SORT_OPTIONS | null
    ) => {
      const revalidate = prevId.current !== id;

      prevId.current = id;

      const snapshot = await fetchCollection<Product>(id, cursor, order);
      const docs = snapshot.docs.map((doc) => doc.data());

      if (revalidate) {
        setActiveFilters(null);
        setSortBy(null);
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
    if (prevId.current !== id) {
      setPaginationState({
        data: [],
        hasMore: true,
        cursor: null,
      });
    }
  }, [id]);

  useEffect(() => {
    fetchData(id, null, sortBy);
  }, [fetchData, id, sortBy]);

  // infinite scroll
  useEffect(() => {
    const loading = loadingAnimation.current;
    if (loading === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchData(id, paginationState.cursor, sortBy);
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    observer.observe(loading);

    return () => {
      observer.disconnect();
    };
  }, [fetchData, id, paginationState.cursor, sortBy]);

  //getting sort from url
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get('sort');
    if (sort) {
      if (sort === 'lowToHigh') {
        setSortBy('lowToHigh');
      }
      if (sort === 'highToLow') {
        setSortBy('highToLow');
      }
      if (sort === 'A-Z') {
        setSortBy('A-Z');
      }
      if (sort === 'Z-A') {
        setSortBy('Z-A');
      }
      if (sort === 'default') {
        setSortBy('default');
      }
    }
  }, [location]);

  //handlers  for the desktop version
  const mouseLeave = () => {
    if (window.innerWidth < 814) return;
    setSelection(null);
  };

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const card = target.closest(`.${styles.product_card}`) as HTMLDivElement;

    const value = target.getAttribute('data-size') as string;
    const productId = card.getAttribute('data-id') as string;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const product = paginationState.data.find(
      (product) => product.id === productId
    )!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const size = product.sizes.find((size) => size.value === value)!;

    setSelection({ ...size, productId });
  };

  //handlers  for the mobile version
  const handleMobileSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const card = target.closest(`.${styles.hover_animation}`) as HTMLDivElement;

    const value = target.getAttribute('data-size') as string;
    const productId = card.getAttribute('data-id') as string;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const product = paginationState.data.find(
      (product) => product.id === productId
    )!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const size = product.sizes.find((size) => size.value === value)!;

    setSelection({ ...size, productId });
  };

  const showMobileSizes: MouseEventHandler<HTMLButtonElement> = (event) => {
    closeMobileBuy();
    setSelection(null);
    const target = event.currentTarget as HTMLButtonElement;
    const id = target.getAttribute('data-id') as string;
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const product = paginationState.data.find(
        (product) => product.id === id
      )!;

      setMobileData(product);
    }, 200);
  };

  const closeMobileBuy = () => {
    setMobileData(null);
  };

  //filter handlers

  const applyFilters = () => {
    setActiveFilters(tempFilters);
  };

  const removeFilter = (value: string | Array<string>, filterType: string) => {
    const newFilters = tempFilters?.filter((filter) => {
      if (filterType === 'price') {
        return filter.filterType !== filterType;
      }
      return filter.value !== value;
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setActiveFilters(newFilters!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setTempFilters(newFilters!);
  };

  const clearFilters = () => {
    setTempFilters(null);
    setActiveFilters(null);
  };

  const addAppliedFilter = (filters: Array<AppliedFilter>) => {
    setTempFilters(filters);
  };

  const toggleFiltersMobile = () => {
    setShowFiltersMobile((prev) => !prev);
  };

  backdropMobile.current?.addEventListener('click', () => {
    setShowFiltersMobile(false);
  });

  return (
    <>
      <div className={styles.secondryNav}>
        <SortMenu />
        <button className={styles.filterButton} onClick={toggleFiltersMobile}>
          Filter
          <i className="fa-solid fa-angle-down"></i>
        </button>
      </div>

      <div className={styles.main_content} key={id}>
        {ProductUpperSection({
          id,
        })}

        {ProductLowerSection({
          id,
          paginationState,
          selection,
          handleSelect,
          showMobileSizes,
          mouseLeave,
          activeFilters,
          tempFilters,
          addAppliedFilter,
          removeFilter,
          clearFilters,
          applyFilters,
        })}

        {ProductsMobileBuy({
          mobileData,
          selection,
          handleMobileSelect,
          closeMobileBuy,
          id,
        })}

        {paginationState.hasMore && (
          <div ref={loadingAnimation}>
            <LoadingAnimation />
          </div>
        )}
      </div>

      <div
        className={clsx({
          [styles.mobile_backdrop]: true,
          [styles.opened_backdrop]: showFiltersMobile,
          [styles.closed_backdrop]: !showFiltersMobile,
        })}
        ref={backdropMobile}
      ></div>
      <div
        className={clsx({
          [styles.filters_mobile_menu]: true,
          [styles.open]: showFiltersMobile,
        })}
      >
        {ProductsMobileFilters({
          tempFilters,
          addAppliedFilter,
          applyFilters,
          clearFilters,
          toggleFiltersMobile,
        })}
      </div>
    </>
  );
};

export default Products;

export const getCollectionData = async ({ params }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id: string = params.id!;
  const snapshot = await fetchCollection<Product>(id, null, null);
  const productsData = snapshot.docs.map((doc) => doc.data());
  return productsData as Product[];
};
