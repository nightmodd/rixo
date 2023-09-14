import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SORT_LABELS, SORT_OPTIONS } from '../constants/sort';

import styles from './sort.module.scss';

const SortMenu: React.FC = () => {
  const [sort, setSort] = useState<keyof typeof SORT_OPTIONS>('default');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get('sort') as keyof typeof SORT_OPTIONS;

    setSort(sortParam || 'default');
  }, [location.search]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target?.value as
      | keyof typeof SORT_OPTIONS
      | null
      | undefined;

    if (value) {
      setSort(value);
      const params = new URLSearchParams(location.search);
      params.set('sort', value);
      navigate({
        search: params.toString(),
      });
    }
  };

  return (
    <select
      className={styles.select_menu}
      onChange={onChangeHandler}
      value={sort}
    >
      {Object.keys(SORT_OPTIONS).map((key) => (
        <option key={key} value={key}>
          {SORT_LABELS[key as keyof typeof SORT_LABELS]}
        </option>
      ))}
    </select>
  );
};

export default SortMenu;
