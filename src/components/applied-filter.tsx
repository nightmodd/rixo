import React, { MouseEventHandler } from 'react';
import styles from './applied-filter.module.scss';

export interface AppliedFilter {
  filterType: string;
  value: string | Array<string>;
}
interface interfaceProps {
  filters: Array<AppliedFilter> | null;
  removeFilter: (value: string | Array<string>, filterType: string) => void;
  clearAll: () => void;
}

const AppliedFilters: React.FC<interfaceProps> = ({
  filters,
  removeFilter,
  clearAll,
}) => {
  const deletFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
    const button = e.currentTarget;
    const value = button.dataset.value;
    const filterType = button.dataset.filterType;

    if (value && filterType) {
      removeFilter(value, filterType);
    }
  };

  const deleteAllFilters = () => {
    clearAll();
  };
  return (
    <div className={styles.applied_filters_container}>
      <div className={styles.applied_filters_top}>
        <span>Refine By</span>
        <button onClick={deleteAllFilters}>Clear All</button>
      </div>
      <ul className={styles.applied_filters_bottom}>
        {filters &&
          filters.map((filter, index) => (
            <li key={index} className={styles.filter}>
              {filter.filterType === 'price'
                ? `$${filter.value[0]} - $${filter.value[1]}`
                : filter.value}

              <button
                onClick={deletFilter}
                data-value={filter.value}
                data-filter-type={filter.filterType}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AppliedFilters;
