import styles from './product-footer-section.module.scss';
import diamond from '../assets/diamond.svg';

const productFooterArray = [
  'Exclusive Styles',
  'Monthly Collections',
  'Anyone Can Be a #HumansofRIXO',
  'Vintage Inspired',
];

const ProductFooterSection = () => {
  return (
    <ul className={styles.product_footer_section}>
      {productFooterArray.map((item, index) => (
        <li key={index} className={styles.footer_item}>
          <img src={diamond} alt="diamond logo" />
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ProductFooterSection;