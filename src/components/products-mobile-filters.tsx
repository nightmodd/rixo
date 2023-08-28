import FiltersForm from './filters-form';
import { AppliedFilter } from './applied-filter';

import styles from '../routes/products.module.scss';

interface ProductsMobileFiltersProps {
  tempFilters: Array<AppliedFilter> | null;
  addAppliedFilter: (filter: Array<AppliedFilter>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  toggleFiltersMobile: () => void;
}
const ProductsMobileFilters = (props: ProductsMobileFiltersProps) => {
  const {
    tempFilters,
    addAppliedFilter,
    applyFilters,
    clearFilters,
    toggleFiltersMobile,
  } = props;

  return (
    <>
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
    </>
  );
};

export default ProductsMobileFilters;
