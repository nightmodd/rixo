import { useEffect, useState } from 'react';
import { Product } from '../types/listing';
import ProductEmail from './product-email';
import { getCardQuantityLabel } from './size-selector';

import styles from './product-sizes.module.scss';
import classes from './product-details.module.scss';
import clsx from 'clsx';

interface productSizesProps {
  product: Product;
}

const ProductSizes = ({ product }: productSizesProps) => {
  const [activeSize, setActiveSize] = useState<string>('');
  const [activeQuantity, setActiveQuantity] = useState<number>(1);

  useEffect(() => {
    setActiveSize('');
    setActiveQuantity(1);
  }, [product]);

  const sizes = product.sizes;

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const size = e.currentTarget.dataset.size;
    const quantity = e.currentTarget.dataset.quantity;
    setActiveSize(size!);
    setActiveQuantity(Number(quantity!));
  };
  return (
    <div className={styles.product_sizes_section}>
      <span className={classes.product_sub_header}>
        Select Size : {activeSize}
      </span>
      <div className={styles.product_sizes}>
        {sizes.map((size, index) => (
          <button
            key={index}
            data-size={size.value}
            data-quantity={size.quantity}
            onClick={handleSelect}
            className={clsx({
              [styles.avilable]: size.quantity >= 3,
              [styles.low_stock]:
                Number(size.quantity) < 3 && size.quantity !== 0,
              [styles.unavilable]: size.quantity === 0,

              [styles.active_avilable_button]:
                activeSize == size.value && Number(size.quantity) >= 3,
              [styles.active_low_stock_button]:
                activeSize == size.value &&
                Number(size.quantity) < 3 &&
                Number(size.quantity) !== 0,
              [styles.active_unavilable_button]:
                activeSize == size.value && Number(size.quantity) === 0,
            })}
          >
            {size.value}
          </button>
        ))}
      </div>
      {activeSize !== '' && (
        <p
          className={clsx({
            [styles.variant_stock]: true,
            [styles.instock_option]: activeQuantity >= 3,
            [styles.lowstock_option]:
              activeQuantity < 3 && activeQuantity !== 0,
            [styles.outofstock_option]: activeQuantity === 0,
          })}
        >
          <span
            className={clsx({
              [styles.variant_stock_circle]: true,
              [styles.variant_stock_circle_available]: activeQuantity >= 3,
              [styles.variant_stock_circle_lowstock]:
                activeQuantity < 3 && activeQuantity !== 0,
              [styles.variant_stock_circle_outofstock]: activeQuantity === 0,
            })}
          ></span>
          {getCardQuantityLabel(activeQuantity)}
        </p>
      )}
      <button
        className={clsx({
          [styles.cart_button]: true,
          [styles.disabled]:
            activeSize === '' || activeQuantity === 0 ? true : false,
        })}
      >
        {activeQuantity === 0 ? 'Out of stock' : 'Add to cart'}
      </button>
      {activeQuantity === 0 && <ProductEmail />}
    </div>
  );
};

export default ProductSizes;
