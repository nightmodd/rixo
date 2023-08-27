import { MouseEventHandler } from 'react';
import { Product } from '../types/listing';
import { Selection } from '../routes/products';
import SizesSelector from './size-selector';

import clsx from 'clsx';
import styles from '../routes/products.module.scss';

interface ProductsMobileBuyProps {
  mobileData: Product | null;
  selection: Selection | null;
  handleMobileSelect: MouseEventHandler<HTMLButtonElement>;
  closeMobileBuy: MouseEventHandler<HTMLButtonElement>;
}

const ProductsMobileBuy = (props: ProductsMobileBuyProps) => {
  const { mobileData, selection, handleMobileSelect, closeMobileBuy } = props;
  return (
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
  );
};

export default ProductsMobileBuy;
