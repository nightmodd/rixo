import React from 'react';
import styles from './sort.module.scss';

const SortOptions = {
  lowToHigh: ['price', 'asc'],
  highToLow: ['price', 'desc'],
  'A-Z': ['name', 'asc'],
  'Z-A': ['name', 'desc'],
  default: ['id', 'asc'],
};

interface sortProps {
  change: (sortOption: [string, string]) => void;
}

const SortMenu: React.FC<sortProps> = ({ change }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const sortOption = SortOptions[value as keyof typeof SortOptions];
    change(sortOption);
  };

  return (
    <select className={styles.select_menu} onChange={onChangeHandler}>
      <option value="default">Sort By</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
      <option value="A-Z">Name: A-Z</option>
      <option value="Z-A">Name: Z-A</option>
    </select>
  );
};

export default SortMenu;
