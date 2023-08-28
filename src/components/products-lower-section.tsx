import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import SizesSelector from './size-selector';
import AppliedFilters, { AppliedFilter } from './applied-filter';
import FiltersForm from './filters-form';
import bagImage from '../assets/shopping_bag.svg';
import { PaginationState, Product } from '../types/listing';
import { Selection } from '../routes/products';

import styles from '../routes/products.module.scss';

interface FilterSectionProps {
  tempFilters: Array<AppliedFilter> | null;
  activeFilters: Array<AppliedFilter> | null;
  addAppliedFilter: (filter: Array<AppliedFilter>) => void;
  removeFilter: (value: string | Array<string>, filterType: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

const FilterSection = (props: FilterSectionProps) => {
  const {
    tempFilters,
    activeFilters,
    addAppliedFilter,
    removeFilter,
    clearFilters,
    applyFilters,
  } = props;
  return (
    <>
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
    </>
  );
};

interface ProductLowerSectionProps {
  id: string;
  paginationState: PaginationState<Product>;
  selection: Selection | null;
  handleSelect: MouseEventHandler<HTMLButtonElement>;
  showMobileSizes: MouseEventHandler<HTMLButtonElement>;
  mouseLeave: MouseEventHandler<HTMLDivElement>;
  activeFilters: Array<AppliedFilter> | null;
  tempFilters: Array<AppliedFilter> | null;
  addAppliedFilter: (filter: Array<AppliedFilter>) => void;
  removeFilter: (value: string | Array<string>, filterType: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

const ProductLowerSection = (props: ProductLowerSectionProps) => {
  const {
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
  } = props;

  return (
    <div className={styles.lower_section}>
      <div className={styles.filter_section}>
        <FilterSection
          activeFilters={activeFilters}
          tempFilters={tempFilters}
          addAppliedFilter={addAppliedFilter}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
          applyFilters={applyFilters}
        />
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
                <Link
                  to={`/collections/${id}/${product.id}`}
                  className={styles.product_name}
                >
                  {product.name}
                </Link>
              </div>
              <div className={styles.product_details_bottom}>
                <Link
                  to={`/collections/${id}/${product.id}`}
                  className={styles.product_price}
                >
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
  );
};

export default ProductLowerSection;
