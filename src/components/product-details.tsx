import { Link } from 'react-router-dom';
import { Variant, Product } from '../types/listing';

import ProductSizes from './product-sizes';
import ProductSpecificDetails from './product-specific-details';
//images
import delivery from '../assets/delivery.svg';
import location from '../assets/location.svg';
import time from '../assets/time.svg';
import working from '../assets/working.svg';

import clsx from 'clsx';
import styles from './product-details.module.scss';

const ProductDetailsHeader = ({ product }: { product: Product }) => {
  return (
    <div className={styles.product_details_header}>
      <div className={styles.header_container}>
        <div className={styles.product_details_header_wrapper}>
          <span className={styles.product_title}> {product.name} </span>
          <span className={styles.product_price}>
            {product.currency} {product.price}
          </span>
        </div>
        <p className={styles.product_subheading}>{product.type}</p>
      </div>
    </div>
  );
};

interface productProps {
  product: Product;
  id: string;
}
const ProductVariants = ({ product, id }: productProps) => {
  return (
    <div className={styles.product_variants_section}>
      <span className={styles.product_sub_header}>Variants :</span>
      <div className={styles.product_variants_list}>
        {
          <Link
            to={`/collections/${id}/${product.id}`}
            className={clsx(styles.product_variant_item, styles.active)}
          >
            <img src={product.images[0]} alt="img" />
          </Link>
        }
        {product.variants.map((variant: Variant, index: number) => (
          <Link
            //let it like that for now, we will change it later
            to={`/collections/clothing/${variant.id}`}
            className={styles.product_variant_item}
            key={index}
          >
            <img src={variant.image} alt={`img number ${index}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};
const ProductShipDetails = () => {
  return (
    <ul className={styles.product_sub_details}>
      <li className={styles.sub_details_item}>
        <img src={working} alt="working logo" />
        <p> UK Next working day delivery - order by 3pm</p>
      </li>
      <li className={styles.sub_details_item}>
        <img src={location} alt="gps logo" />
        <p>Avilable in Store </p>
      </li>
      <li className={styles.sub_details_item}>
        <img src={time} alt="time logo" />
        <p> Try on at home with our concierge service</p>
      </li>
      <li className={styles.sub_details_item}>
        <img src={delivery} alt="delivery logo" />
        <p> UK Delivery - 1 to 3 working days</p>
      </li>
    </ul>
  );
};

const ProductDetails = ({ product, id }: productProps) => {
  return (
    <div className={styles.product_details}>
      <ProductDetailsHeader product={product} />
      <ProductVariants product={product} id={id} />
      <ProductSizes product={product} />
      <ProductShipDetails />
      <ProductSpecificDetails details={product.details} />
    </div>
  );
};

export default ProductDetails;
