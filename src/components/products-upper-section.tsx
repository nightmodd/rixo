import { Link } from 'react-router-dom';
import styles from '../routes/products.module.scss';

const relatedProducts = [
  {
    title: 'Clothing',
    path: '/collections/clothing',
  },
  {
    title: 'Skirts',
    path: '/collections/skirts',
  },
  {
    title: 'Tops',
    path: '/collections/tops',
  },
  {
    title: 'Bridal',
    path: '/collections/bridal',
  },
];
const ProductUpperSection = (id: string) => {
  return (
    <div className={styles.upper_section}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <Link to="/">Home</Link>
          <i className="fa-solid fa-angle-right"></i>
          <span>{id}</span>
        </div>
      </div>

      <span className={styles.title}>{id}</span>
      <p className={styles.description}>
        These are the only Unique data that we have.
      </p>
      {
        <ul className={styles.related_products}>
          {relatedProducts.map((product) => (
            <li key={product.title}>
              <Link to={product.path}>{product.title}</Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default ProductUpperSection;
