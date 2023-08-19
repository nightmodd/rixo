import React, { useEffect, useRef } from 'react';
import styles from './sort.module.scss';

const sortInterface = {
  lowToHigh: ['price', 'asc'],
  highToLow: ['price', 'desc'],
  'A-Z': ['name', 'asc'],
  'Z-A': ['name', 'desc'],
  default: ['id', 'asc'],
};

interface sortProps {
  change: (sortOption: [string, string]) => void;
  sortOption: string | null;
}

const SortMenu: React.FC<sortProps> = ({ change, sortOption }) => {
  const selectInput = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    //I am sure that the selectInput is not null
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const select = selectInput.current!;
    if (sortOption) {
      select.value = sortOption;
    }
  }, [sortOption]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const sortOption = sortInterface[value as keyof typeof sortInterface];
    change(sortOption as [string, string]);
  };

  return (
    <select
      className={styles.select_menu}
      onChange={onChangeHandler}
      ref={selectInput}
    >
      <option value="default">Sort By</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
      <option value="A-Z">Name: A-Z</option>
      <option value="Z-A">Name: Z-A</option>
    </select>
  );
};

export default SortMenu;
