import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

import bagImage from '../assets/shopping_bag.svg';
import styles from './products.module.scss';
import { set } from 'react-hook-form';

//dummy data
const products = [
  {
    id: 'p1',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p2',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p3',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p4',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p5',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p6',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p7',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p8',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p9',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',

    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p10',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',
    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p11',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',
    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
  {
    id: 'p12',
    name: 'Red Scarf',
    price: 19.99,
    currency: 'USD',
    sizes: [
      {
        value: '10',
        quantity: 12,
      },
      {
        value: '12',
        quantity: 2,
      },
      {
        value: '14',
        quantity: 0,
      },
      {
        value: '16',
        quantity: 10,
      },
      {
        value: '18',
        quantity: 1,
      },
      {
        value: '20',
        quantity: 0,
      },
      {
        value: '22',
        quantity: 6,
      },
    ],
    images: [
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/Jan26th-Marchdrop1116313_f8c1ec60-7ce5-4709-a467-c5c5e8a12a7a.jpg?',
      'https://cdn.shopify.com/s/files/1/0327/1609/5533/products/April-Editorial---RIXO133559.jpg?',
    ],
  },
];
const relatedProducts = [
  { title: 'Clothing', path: '/collections/clothing' },
  { title: 'Dresses', path: '/collections/dresses' },
  { title: 'Skirts', path: '/collections/skirts' },
  { title: 'Tops', path: '/collections/tops' },
  { title: 'Bridal', path: '/collections/bridal' },
];

//interfaces
interface ProductBase {
  id: string;
  name: string;
  type: string;
  price: string;
  sizes: Size[];
  images: string[];
}

interface Product extends ProductBase {
  description: string;
  currency: string;
  category: string;
  details: Details;
  related: Product[];
  style_with: Product[];
  variants: Variant[];
}

interface Size {
  value: string;
  quantity: number;
}

interface Details {
  fit: string;
  fabric: string;
  inspiration: string;
}

interface Variant {
  name: string;
  id: string;
}

interface mobileData {
  sizes: Size[];
  price: string;
  currency: string;
  name: string;
}

const Products: React.FC = () => {
  const { id } = useParams();

  const [renderedProducts, setProducts] = useState(products);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mobileData, setMobileData] = useState<mobileData>();

  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, id!);
      const data = await getDocs(productsCollection);
      setIsLoading(true);
      if (!data.empty) {
        setProducts(data.docs.map((doc) => doc.data()));
      } else {
        setProducts(products);
      }
      setIsLoading(false);
    };
    getProducts();
  }, [id]);

  
  const resetSizeButtons = () => {
    const sizeButtons = document.querySelectorAll(`.${styles.size}`) as any;
    sizeButtons.forEach((button: HTMLButtonElement) => {
      button.style.border = 'none';
      button.style.backgroundColor = 'transparent';
    });
  };

  //for desktop
  const mouseLeave = (event: any) => {
    const productSizes = event.target.parentElement
      .firstChild as HTMLDivElement;
    const sizeButtons = document.querySelectorAll(`.${styles.size}`) as any;
    const addToCartSection = productSizes.nextElementSibling as HTMLDivElement;
    const addToCartSectionHeight = addToCartSection.clientHeight;

    if (productSizes.style.bottom === `${addToCartSectionHeight}px`) {
      productSizes.style.bottom = '0';

      addToCartSection.style.transform = 'translateY(200%)';
      sizeButtons.forEach((button: HTMLButtonElement) => {
        button.style.border = 'none';
        button.style.backgroundColor = 'transparent';
      });
    }
  };

  const showAddToCart = (event: any, quantity: number) => {
    const productSizes = event.target.parentElement as HTMLDivElement;
    const addToCartSection = event.target.parentElement.nextElementSibling;
    const addToCartSectionHeight = addToCartSection.clientHeight;

    productSizes.style.bottom = `${addToCartSectionHeight}px`;
    addToCartSection.style.transform = 'translateY(0)';

    resetSizeButtons();
    event.target.style.backgroundColor = '#f0daeccd';

    if (quantity < 3 && quantity !== 0) {
      event.target.style.border = '1px solid #ebba3c';
      addToCartSection.firstChild.textContent = `only ${quantity} left in stock`;
      addToCartSection.firstChild.style.textDecorationColor = '#ebba3c';
      addToCartSection.lastChild.textContent = 'Add to Bag';
    } else if (quantity === 0) {
      event.target.style.border = '1px solid #ff0000';
      addToCartSection.firstChild.textContent = 'Out of stock';
      addToCartSection.firstChild.style.textDecorationColor = '#ff0000';
      addToCartSection.lastChild.textContent = 'Join Waitlist';
    } else {
      event.target.style.border = '1px solid green';
      addToCartSection.firstChild.textContent = 'In Stock';
      addToCartSection.firstChild.style.textDecorationColor = 'green';
      addToCartSection.lastChild.textContent = 'Add to Bag';
    }
  };

  //for mobile
  const showMobileSizes = (event: any) => {
    const mobileSizesSection = document.querySelector(
      `.${styles.mobile_buy}`
    ) as HTMLDivElement;
    const mobileCartSection = document.querySelector(
      `.${styles.mobile_cart}`
    ) as HTMLDivElement;
    const ID = event.target.parentElement.getAttribute('data-id');
    const productWholeData = renderedProducts.find(
      (product) => product.id === ID
    );

    const mobileProductData = {
      sizes: productWholeData?.sizes,
      price: productWholeData?.price,
      currency: productWholeData?.currency,
      name: productWholeData?.name,
    };

    if (mobileSizesSection.classList.contains(`${styles.show_mobile_buy}`)) {
      mobileSizesSection.classList.remove(`${styles.show_mobile_buy}`);
      resetSizeButtons();
      setMobileData(undefined);
      mobileCartSection.style.display = 'none';
      setTimeout(() => {
        setMobileData(mobileProductData);
        mobileSizesSection.classList.add(`${styles.show_mobile_buy}`);
      }, 300);
    } else {
      setMobileData(mobileProductData);
      mobileSizesSection.classList.add(`${styles.show_mobile_buy}`);
    }
  };

  const closeMobileBuy = () => {
    const mobileSizesSection = document.querySelector(
      `.${styles.mobile_buy}`
    ) as HTMLDivElement;
    const mobileCartSection = document.querySelector(
      `.${styles.mobile_cart}`
    ) as HTMLDivElement;

    mobileSizesSection.classList.remove(`${styles.show_mobile_buy}`);
    mobileCartSection.style.display = 'none';
    resetSizeButtons();
    setMobileData(undefined);
  };

  const showMobileCart = (event: any) => {
    const quantity = event.target.getAttribute('data-quantity');
    console.log(quantity);
    resetSizeButtons();
    const mobileCartSection = document.querySelector(
      `.${styles.mobile_cart}`
    ) as HTMLDivElement;
    mobileCartSection.style.display = 'flex';
    const Span = mobileCartSection.firstChild as HTMLSpanElement;
    const mobileAddToCartButton =
      mobileCartSection.lastChild as HTMLButtonElement;

    if (quantity === 0) {
      event.target.style.border = '1px solid #ff0000';
      event.target.parentElement.lastChild.style.textDecorationColor =
        '#ff0000';
      Span.textContent = `Out of stock`;
      Span.style.textDecorationColor = '#ff0000';
      mobileAddToCartButton.textContent = 'Join Waitlist';
    } else if (quantity < 3 && quantity !== 0) {
      event.target.style.border = '1px solid #ebba3c';
      event.target.parentElement.lastChild.style.textDecorationColor =
        '#ebba3c';
      Span.textContent = `only ${quantity} left in stock`;
      Span.style.textDecorationColor = '#ebba3c';
      mobileAddToCartButton.textContent = 'Add to Bag';
    } else if (quantity > 3) {
      event.target.style.border = '1px solid green';
      event.target.parentElement.lastChild.style.textDecorationColor = 'green';
      Span.textContent = `In Stock`;
      Span.style.textDecorationColor = 'green';
      mobileAddToCartButton.textContent = 'Add to Bag';
    }
  };

  return (
    <div className={styles.main_content}>
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
          This is the best store in the whole world
        </p>
        <ul className={styles.related_products}>
          {relatedProducts.map((product) => (
            <li key={product.title}>
              <Link to={product.path}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      {!isLoading && (
        <div className={styles.lower_section}>
          <div className={styles.filter_section}></div>
          <div className={`${styles.products_section} ${styles.grid_4} `}>
            {renderedProducts.map((product) => (
              <div className={styles.product_card} key={product.id}>
                <div className={styles.product_upper_container}>
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
                  <div
                    className={styles.hover_animation}
                    onMouseLeave={(e) => {
                      mouseLeave(e);
                    }}
                  >
                    <div className={styles.product_sizes}>
                      {product.sizes.map((size) => (
                        <button
                          onClick={(event) =>
                            showAddToCart(event, size.quantity)
                          }
                          key={size.value}
                          className={`${styles.size}
                    ${size.quantity === 0 ? styles.unavilable : ''}`}
                        >
                          {size.value}
                          <span
                            className={
                              size.quantity < 3 && size.quantity !== 0
                                ? styles.low_stock
                                : styles.avilable
                            }
                          ></span>
                        </button>
                      ))}
                    </div>
                    <div className={styles.add_to_cart}>
                      <Link to={'/'}>In Stock</Link>
                      <button className={styles.add_to_cart_btn}>
                        Add to Bag
                      </button>
                    </div>
                  </div>
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
      )}

      <div className={styles.mobile_buy}>
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
          <div className={styles.product_sizes_mobile}>
            {mobileData?.sizes.map((size) => (
              <button
                onClick={showMobileCart}
                key={size.value}
                className={`${styles.size}
      ${size.quantity === 0 ? styles.unavilable : ''}`}
                data-quantity={size.quantity}
              >
                {size.value}
                <span
                  className={
                    size.quantity < 3 && size.quantity !== 0
                      ? styles.low_stock
                      : styles.avilable
                  }
                ></span>
              </button>
            ))}
          </div>
          <div className={styles.mobile_cart}>
            <span>In Stock</span>
            <button className={styles.add_to_cart_btn}>Add to Bag</button>
          </div>
        </div>
      </div>

      <div className={styles.loading}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
    </div>
  );
};

export default Products;
