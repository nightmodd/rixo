import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/listing';

import { Selection } from '../routes/products';

import styles from './size-selector.module.scss';
import classes from '../routes/products.module.scss';
import clsx from 'clsx';

export const getCardQuantityLabel = (quantity: number) => {
  if (quantity === 0) {
    return 'Out of stock';
  } else if (quantity < 3) {
    return `only ${quantity} left in stock`;
  } else {
    return 'In Stock';
  }
};
interface SizesSelectorProps {
  id: string;
  product: Product;
  selection: Selection | null;
  handleSelect: MouseEventHandler<HTMLButtonElement>;
}

const SizesSelector = (props: SizesSelectorProps) => {
  const { id, product, selection, handleSelect } = props;
  return (
    <div className={classes.hover_animation} data-id={product.id}>
      <div className={classes.product_sizes}>
        {product.sizes.map((size, index) => {
          return (
            <button
              onClick={handleSelect}
              key={`${product.id}-${size.value}-${index}`}
              className={clsx({
                [styles.size]: true,
                [styles.unavilable]: Number(size.quantity) === 0,
                [styles.low_stock]:
                  Number(size.quantity) < 3 && Number(size.quantity) !== 0,
                [styles.available]: Number(size.quantity) >= 3,
                [styles.selected]: selection?.value === size.value,
              })}
              data-size={size.value}
            >
              {size.value}
              <span
                className={clsx({
                  [styles.low_stock]:
                    Number(size.quantity) < 3 && Number(size.quantity) !== 0,
                  [styles.available]: Number(size.quantity) >= 3,
                  [styles.unavilable]: Number(size.quantity) === 0,
                })}
              ></span>
            </button>
          );
        })}
      </div>

      {selection && (
        <div className={styles.add_to_cart}>
          <div
            className={clsx({
              [styles.cart_upper_section]: true,
              [styles.in_stock]: selection?.quantity >= 3,
              [styles.out_of_stock]: selection?.quantity === 0,
              [styles.low_stock]:
                selection?.quantity < 3 && selection?.quantity !== 0,
            })}
          >
            <span
              className={clsx({
                [styles.circle]: true,
                [styles.circle_low_stock]:
                  selection.quantity < 3 && selection.quantity !== 0,
                [styles.circle_out_of_stock]: selection.quantity === 0,
                [styles.circle_available]: selection.quantity >= 3,
              })}
            ></span>
            <Link
              to={`/collections/${id}/${product.id}`}
              className={clsx({
                [styles.low_stock]:
                  selection?.quantity < 3 && selection?.quantity !== 0,
                [styles.out_of_stock]: selection?.quantity === 0,
                [styles.in_stock]: selection?.quantity >= 3,
              })}
            >
              {getCardQuantityLabel(selection?.quantity)}
            </Link>
          </div>
          <button className={styles.add_to_cart_btn}>
            {selection?.quantity === 0 ? 'Join Waitlist' : 'Add to Bag'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SizesSelector;
