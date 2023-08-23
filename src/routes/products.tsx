import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEventHandler,
} from 'react';
import {
  Link,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import SizesSelector from '../components/size-selector';
import LoadingAnimation from '../components/loading-animation';
import SortMenu from '../components/sort';
import FiltersForm from '../components/filters-form';
import AppliedFilters, { AppliedFilter } from '../components/applied-filter';
import { PaginationState, Product, Size } from '../types/listing';
import { fetchCollection } from '../utils/firestore';

import bagImage from '../assets/shopping_bag.svg';
import styles from './products.module.scss';
import clsx from 'clsx';

export interface Selection extends Size {
  productId: string;
}

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

const Products = () => {
  const params = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = params.id!;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const prevId = useRef<string>('');
  const backdropMobile = useRef<HTMLDivElement>(null);
  const loadingAnimation = useRef<HTMLDivElement>(null);

  const [mobileData, setMobileData] = useState<Product | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [sortBy, setSortBy] = useState<Array<string> | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
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

  //getting data from firestore
  const fetchData = useCallback(
    async (
      id: string,
      cursor: PaginationState<Product>['cursor'],
      order: Array<any> | null
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
    fetchData(id, null, sortBy);
  }, [fetchData, id, sortBy]);

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sort = searchParams.get('sort');
    const filters = searchParams.get('filters');
    console.log(sort, filters);
    if (sort) {
      if (sort === 'price-asc') {
        setSortOption('lowToHigh');
        setSortBy(['price', 'asc']);
      }
      if (sort === 'price-desc') {
        setSortOption('highToLow');
        setSortBy(['price', 'desc']);
      }
      if (sort === 'name-asc') {
        setSortOption('A-Z');
        setSortBy(['name', 'asc']);
      }
      if (sort === 'name-desc') {
        setSortOption('Z-A');
        setSortBy(['name', 'desc']);
      }
      if (sort === '') {
        setSortOption('default');
        setSortBy(['id', 'asc']);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (sortBy !== null) {
      searchParams.set('sort', sortBy.join('-'));
      setSearchParams(searchParams);
    }
    if (activeFilters !== null && activeFilters.length > 0) {
      searchParams.set(
        'filters',
        activeFilters
          .map((filter) => {
            return `${filter.filterType}_${filter.value}`;
          })
          .join(`--`)
      );
      setSearchParams(searchParams);
    }
    if (activeFilters?.length === 0 || activeFilters === null) {
      searchParams.delete('filters');
      setSearchParams(searchParams);
    }
    if (sortBy === null) {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    }
  }, [sortBy, activeFilters, searchParams, setSearchParams]);

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

  //general handlers
  const sortChangeHandler = (sortBy: string[]) => {
    setSortBy(sortBy);
    setPaginationState({
      data: [],
      hasMore: true,
      cursor: null,
    });
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
  };

  const removeFilter = (value: string | Array<string>, filterType: string) => {
    const newFilters = activeFilters?.filter((filter) => {
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
    console.log(filters);
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
        <SortMenu change={sortChangeHandler} sortOption={sortOption} />
        <button className={styles.filterButton} onClick={toggleFiltersMobile}>
          Filter
          <i className="fa-solid fa-angle-down"></i>
        </button>
      </div>

      <div className={styles.main_content} key={id}>
        <div className={styles.upper_section}>
          <div className={styles.header}>
            <div className={styles.header_left}>
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right"></i>
              <span>{id}</span>
            </div>
            <div className={styles.header_right}>
              <SortMenu change={sortChangeHandler} sortOption={sortOption} />
            </div>
          </div>

          <span className={styles.title}>{id}</span>
          <p className={styles.description}>
            This is the best store in the whole world
          </p>
          {
            <ul className={styles.related_products}>
              {relatedProducts.map((product) => (
                <li key={product.title}>
                  <Link to={product.path}>{product.title}</Link>
                </li>
              ))}
            </ul>
          }
        </div>

        <div className={styles.lower_section}>
          <div className={styles.filter_section}>
            {activeFilters !== null && activeFilters.length > 0 && (
              <AppliedFilters
                filters={activeFilters}
                removeFilter={removeFilter}
                clearAll={clearFilters}
              />
            )}

            <FiltersForm
              appliedFilters={tempFilters}
              addAppliedFilter={addAppliedFilter}
            />
            <button className={styles.apply_btn} onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
          <div className={`${styles.products_section} ${styles.grid_4} `}>
            {paginationState.data.map((product) => (
              <div
                className={styles.product_card}
                key={product.id}
                data-id={product.id}
                onMouseLeave={mouseLeave}
              >
                <div className={styles.action_container}>
                  <Link
                    to={`/collections/${id}/${product.id}`}
                    className={styles.product_images}
                  >
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
        <div className={styles.mobile_filters_header}>
          <span>Filters</span>
          <button onClick={toggleFiltersMobile}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={styles.filter_form_mobile}>
          <FiltersForm
            appliedFilters={tempFilters}
            addAppliedFilter={addAppliedFilter}
          />
        </div>
        <div className={styles.mobile_filters_bottom}>
          <button className={styles.mobile_apply_btn} onClick={applyFilters}>
            Apply Filters
          </button>
          <button className={styles.mobile_clear_btn} onClick={clearFilters}>
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
