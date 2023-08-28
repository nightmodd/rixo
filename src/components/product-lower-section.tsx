import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import SizesSelector from './size-selector';
import bagImage from '../assets/shopping_bag.svg';
import { PaginationState, Product } from '../types/listing';
import { Selection } from '../routes/products';

import styles from '../routes/products.module.scss';

interface ProductLowerSectionProps {
  paginationState: PaginationState<Product>;
  selection: Selection | null;
  handleSelect: MouseEventHandler<HTMLButtonElement>;
  showMobileSizes: MouseEventHandler<HTMLButtonElement>;
  mouseLeave: MouseEventHandler<HTMLDivElement>;
}

const ProductLowerSection = (props: ProductLowerSectionProps) => {
  const {
    paginationState,
    selection,
    handleSelect,
    showMobileSizes,
    mouseLeave,
  } = props;

  return (
    <div className={styles.lower_section}>
      <div className={styles.filter_section}></div>
      <div className={`${styles.products_section} ${styles.grid_4} `}>
        {paginationState.data.map((product) => (
          <div
            className={styles.product_card}
            key={product.id}
            data-id={product.id}
            onMouseLeave={mouseLeave}
          >
            <div className={styles.action_container}>
              <Link to={'/'} className={styles.product_images}>
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
  );
};

export default ProductLowerSection;
