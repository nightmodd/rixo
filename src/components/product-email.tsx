import email from '../assets/sendEmail.svg';
import styles from './product-email.module.scss';

const ProductEmail = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submmited")
  };
  return (
    <div className={styles.product_email_section}>
      <div className={styles.email_header}>
        <img src={email} alt="send email icon" />
        <p className={styles.product_email_title}>Email me when available</p>
      </div>

      <span className={styles.product_email_description}>
        Get notified via email when this style is back in stock
      </span>
      <form className={styles.email_product_form} onSubmit={submitHandler}>
        <input
          className="product-email__input"
          type="email"
          placeholder="Enter your email"
        />
        <button className="product-email__button">Subscribe</button>
      </form>

      <span className={styles.product_email_description}>
        You can unsubscribe at any time.
      </span>
    </div>
  );
};

export default ProductEmail;
