import { useState, useRef, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import SenondaryNavigation from './secondary-navbar';
import bag from '../assets/shopping-bag.svg';

import styles from './navbar.module.scss';
import clsx from 'clsx';

interface Featured {
  title: string;
  path: string;
  image: string;
}
interface DropdownLink {
  title: string;
  path: string;
  sublinks?: DropdownLink[];
  featured?: Featured[];
}

const dropdownLinks: DropdownLink[] = [
  {
    title: 'New In',
    path: '/collections/new-in',
    featured: [
      {
        title: 'Shope New In',
        path: '/collections/new-in',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/New_Collection_2_1.jpg?',
      },
      {
        title: 'Shop Exclusives',
        path: '/collections/exclusives',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Exclusives_1.jpg?',
      },
    ],
    sublinks: [
      {
        title: 'All New In',
        path: '/collections/new-in',
        sublinks: [
          {
            title: 'New In Clothing',
            path: '/collections/new-in-clothing',
          },
          {
            title: 'New Dresses',
            path: '/collections/new-dresses',
          },
          {
            title: 'New Tops',
            path: '/collections/new-tops',
          },
          {
            title: 'New Skirts',
            path: '/collections/new-skirts',
          },
          {
            title: 'New Shoes & Boots',
            path: '/collections/new-shoes-and-boots',
          },
        ],
      },
    ],
  },
  {
    title: 'Clothing',
    path: '/collections/clothing',
    featured: [
      {
        title: 'Shop Dresses',
        path: '/collections/shop-dresses',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Dresses_c1ef51b1-3cd1-4e1b-b24c-7a745b352e35.png?',
      },
    ],
    sublinks: [
      {
        title: 'All Clothing',
        path: '/collections/clothing',
        sublinks: [
          {
            title: 'Dresses',
            path: '/collections/dresses',
          },
          {
            title: 'Exclusives',
            path: '/collections/exclusives',
          },
          {
            title: 'Extended Sizing',
            path: '/collections/extended-sizing',
          },
          {
            title: 'Occasion',
            path: '/collections/occasion',
          },
          {
            title: 'Wardrobe Staples',
            path: '/collections/wardrobe-staples',
          },
          {
            title: 'Silk',
            path: '/collections/silk',
          },
          {
            title: 'Holiday',
            path: '/collections/holiday',
          },
          {
            title: 'Last Chance',
            path: '/collections/last-chance',
          },
        ],
      },
      {
        title: 'Dresses',
        path: '/collections/dresses',
        sublinks: [
          {
            title: 'Occasion Dresses',
            path: '/collections/occasion-dresses',
          },
          {
            title: 'Gowns',
            path: '/collections/gowns',
          },
          {
            title: 'Silk Dresses',
            path: '/collections/silk-dresses',
          },
          {
            title: 'Shirtdresses',
            path: '/collections/shirtdresses',
          },
          {
            title: 'Mini Dresses',
            path: '/collections/mini-dresses',
          },
          {
            title: 'Midi Dresses',
            path: '/collections/midi-dresses',
          },
          {
            title: 'Maxi Dresses',
            path: '/collections/maxi-dresses',
          },
        ],
      },
      {
        title: 'Tops',
        path: '/collections/tops',
        sublinks: [
          {
            title: 'Occasion Tops',
            path: '/collections/occasion-tops',
          },
          {
            title: 'Silk Tops',

            path: '/collections/silk-tops',
          },
          {
            title: 'Co-ords',
            path: '/collections/co-ords',
          },
        ],
      },
      {
        title: 'Skirts',
        path: '/collections/skirts',
        sublinks: [
          {
            title: 'Midi Skirts',
            path: '/collections/midi-skirts',
          },
          {
            title: 'Silk Skirts',
            path: '/collections/silk-skirts',
          },
        ],
      },
      {
        title: 'Loungewear',
        path: '/collections/loungewear',
        sublinks: [
          {
            title: 'Sets',
            path: '/collections/sets',
          },
          {
            title: 'Day to Night',
            path: '/collections/day-to-night',
          },
          {
            title: 'Accessories',
            path: '/collections/accessories',
          },
        ],
      },
      {
        title: 'outerwear',
        path: '/collections/outerwear',
        sublinks: [
          {
            title: 'all outerwear',
            path: '/collections/all-outerwear',
          },
          {
            title: 'Jackets',
            path: '/collections/jackets',
          },
          {
            title: 'Blazers',
            path: '/collections/blazers',
          },
        ],
      },
    ],
  },
  {
    title: 'Dresses',
    path: '/collections/dresses',
    featured: [
      {
        title: 'Shop Occasion',
        path: '/collections/shop-occasion',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Dresses_2_1d20abce-2039-49cf-b116-934426b5942a.jpg?',
      },
      {
        title: 'Rixo Rental',
        path: '/collections/rexio-rental',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Rent_a_dress_2.png?',
      },
    ],
    sublinks: [
      {
        title: 'All Dresses',
        path: '/collections/dresses',
        sublinks: [
          {
            title: 'Occasion Dresses',
            path: '/collections/occasion-dresses',
          },
          {
            title: 'Gowns',
            path: '/collections/gowns',
          },
          {
            title: 'Silk Dresses',
            path: '/collections/silk-dresses',
          },
          {
            title: 'Shirtdresses',
            path: '/collections/shirtdresses',
          },
          {
            title: 'Mini Dresses',
            path: '/collections/mini-dresses',
          },
          {
            title: 'Midi Dresses',
            path: '/collections/midi-dresses',
          },
          {
            title: 'Maxi Dresses',
            path: '/collections/maxi-dresses',
          },
          {
            title: 'Day to Night Dresses',
            path: '/collections/day-to-night-dresses',
          },
        ],
      },
      {
        title: 'Featured',
        path: '/collections/featured',
        sublinks: [
          {
            title: 'Holiday',
            path: '/collections/holiday',
          },
          {
            title: 'Exclusive Dresses',
            path: '/collections/exclusive-dresses',
          },
          {
            title: 'Extended Sizing',
            path: '/collections/extended-sizing',
          },
          {
            title: 'Wardrobe Staples',
            path: '/collections/wardrobe-staples',
          },
          {
            title: 'Breastfeeding Friendly',
            path: '/collections/breastfeeding-friendly',
          },
          {
            title: 'Last Chance Dresses',
            path: '/collections/last-chance-dresses',
          },
        ],
      },
    ],
  },
  {
    title: 'Occasion',
    path: '/collections/occasion',
    featured: [
      {
        title: 'New In',
        path: '/collections/new-in',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Dresses_5_1.jpg?',
      },
      {
        title: 'Rixo Rental',
        path: '/collections/rixo-rental',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Rent_a_Dress_1.jpg?',
      },
    ],
    sublinks: [
      {
        title: 'Occasion',
        path: '/collections/occasion',
        sublinks: [
          {
            title: 'All Occasion',
            path: '/collections/all-occasion',
          },

          {
            title: 'Wedding Guest',
            path: '/collections/wedding-guest',
          },
          { title: 'Race Day', path: '/collections/race-day' },
          { title: 'Festival', path: '/collections/festival' },
          { title: 'Gowns', path: '/collections/gowns' },
        ],
      },
    ],
  },
  {
    title: 'Exclusive',
    path: '/collections/exclusive',
    featured: [
      {
        title: 'Shop Dresses',
        path: '/collections/shop-dresses',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Dresses_4.jpg?',
      },
      {
        title: 'Shop Exclusives',
        path: '/collections/shop-exclusives',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Exclusives_2.jpg?',
      },
    ],
    sublinks: [
      {
        title: 'Exclusive',
        path: '/collections/exclusive',
        sublinks: [
          {
            title: 'Exclusive Dresses',
            path: '/collections/exclusive-dresses',
          },
          {
            title: 'Exclusive Tops',
            path: '/collections/exclusive-tops',
          },
        ],
      },
    ],
  },
  {
    title: 'Accessories',
    path: '/collections/accessories',
    featured: [
      {
        title: 'Shop Bags',
        path: '/collections/shop-bags',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Bags.jpg?',
      },
      {
        title: 'Shop Jewellery',
        path: '/collections/shop-jewellery',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Jewellery.jpg?',
      },
    ],
    sublinks: [
      {
        title: 'Accessories',
        path: '/collections/accessories',
        sublinks: [
          {
            title: 'Bags',
            path: '/collections/bags',
          },
          {
            title: 'Belts',
            path: '/collections/belts',
          },
          {
            title: 'Jewellery',
            path: '/collections/jewellery',
          },
          {
            title: 'Shoes & Boots',
            path: '/collections/shoes-and-boots',
          },
          {
            title: 'Scarves',
            path: '/collections/scarves',
          },
          {
            title: 'Hair',
            path: '/collections/hair',
          },
          {
            title: 'Gifts',
            path: '/collections/gifts',
          },
          {
            title: 'Homeware',
            path: '/collections/homeware',
          },
        ],
      },
    ],
  },
  {
    title: 'Bridal',
    path: '/collections/bridal',
    featured: [
      {
        title: 'Shop Bridal',
        path: '/collections/shop-bridal',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Bridal_2_d96b6f68-2649-4049-ac3b-a365ac4c0e91.jpg?',
      },
      {
        title: 'Shop Bridesmaids',
        path: '/collections/shop-bridesmaids',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Bridesmaids_1.jpg?',
      },
      {
        title: 'Bridal Appointment',
        path: '/collections/bridal-appointment',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Bridal_Appts.png?',
      },
      {
        title: 'Bridal Appointment',
        path: '/collections/bridal-appointment',
        image:
          'https://cdn.shopify.com/s/files/1/0327/1609/5533/files/Bridal_Appts.png?',
      },
    ],
    sublinks: [
      {
        title: 'Bridal',
        path: '/collections/bridal',
        sublinks: [
          {
            title: 'New Bridal',
            path: '/collections/new-bridal',
          },
          {
            title: 'Bridal Dresses',
            path: '/collections/bridal-dresses',
          },
          {
            title: 'Bridal Party',
            path: '/collections/bridal-party',
          },
          {
            title: 'Bridal Register',
            path: '/collections/bridal-register',
          },
          {
            title: 'Bridal Ceremony',
            path: '/collections/bridal-ceremony',
          },
          {
            title: 'Honeymoon',
            path: '/collections/honeymoon',
          },
          {
            title: 'Bridal Lookbook',
            path: '/collections/bridal-lookbook',
          },
        ],
      },
      {
        title: 'Bridal Party',
        path: '/collections/bridal-party',
        sublinks: [
          {
            title: 'Bridesmaids',
            path: '/collections/bridesmaids',
          },
          {
            title: 'Wedding Guest',
            path: '/collections/wedding-guest',
          },
          {
            title: 'Mother of the Bride',
            path: '/collections/mother-of-the-bride',
          },
        ],
      },
      {
        title: 'Appointments',
        path: '/collections/appointments',
        sublinks: [
          {
            title: 'Book an Appointment',
            path: '/collections/book-an-appointment',
          },
          {
            title: 'Bridal Lookbook',
            path: '/collections/bridal-lookbook',
          },
        ],
      },
    ],
  },
  {
    title: 'Our Story',
    path: '/pages/our-story',
  },
  {
    title: 'Rental',
    path: '/pages/rental',
  },
];

const MainNavigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const backdropMobile = useRef<HTMLDivElement>(null);

  const openMenuForDesktop = () => {
    setShowSubmenu(true);
  };

  const closeMenuForDesktop = () => {
    setShowSubmenu(false);
  };

  const closeAll = () => {
    setShowMobileMenu(false);
    setShowSubmenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleSubmenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    const submenu = e.currentTarget.nextElementSibling;
    submenu?.classList.toggle(styles.mobile_hidden);
  };

  const closeSubmenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    const submenu = e.currentTarget.parentElement;
    submenu?.classList.add(styles.mobile_hidden);
  };

  backdropMobile.current?.addEventListener('click', () => {
    closeAll();
  });

  return (
    <header className={styles.header}>
      <nav className={styles.desktop_nav}>
        <SenondaryNavigation />
        <ul className={styles.links}>
          {dropdownLinks.map((item) => {
            return (
              <li
                key={item.title}
                onMouseEnter={item.sublinks ? openMenuForDesktop : undefined}
                onMouseLeave={closeMenuForDesktop}
              >
                <Link
                  to={item.path}
                  className={styles.desktop_mainlinks}
                  onClick={closeMenuForDesktop}
                >
                  {item.title}
                </Link>
                {item.sublinks && showSubmenu && (
                  <div className={` ${styles.dropdown} ${styles.hidden}`}>
                    <div className={styles.desk_submenus_container}>
                      {item.sublinks.map((subitem) => (
                        <ul className={styles.sub_menu}>
                          <Link to={subitem.path} onClick={closeMenuForDesktop}>
                            <h3>{subitem.title}</h3>
                          </Link>
                          {subitem.sublinks &&
                            subitem.sublinks.map((subsubitem) => (
                              <li key={subsubitem.title}>
                                <Link
                                  to={subsubitem.path}
                                  onClick={closeMenuForDesktop}
                                >
                                  {subsubitem.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      ))}
                    </div>
                    {item.featured && (
                      <div className={styles.featured}>
                        {item.featured.slice(0, 3).map((featureditem) => {
                          return (
                            <Link
                              to={featureditem.path}
                              className={styles.featured_item}
                              onClick={closeMenuForDesktop}
                            >
                              <div className={styles.featured_item_upper}>
                                <img
                                  src={featureditem.image}
                                  alt={featureditem.title}
                                />
                                <i className="fa-solid fa-arrow-right-long"></i>
                              </div>

                              <span>{featureditem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div
          className={clsx({
            [styles.backdrop]: true,
            [styles.hidden]: !showSubmenu,
          })}
        ></div>
      </nav>

      <nav className={styles.mobile_nav}>
        <Link to="/" className={styles.logo}>
          <span>RIXO</span>
        </Link>
        <div className={styles.mobile_navbar_rightside}>
          <button
            onClick={() => {
              console.log('bag');
            }}
          >
            <img src={bag} alt="shopping bag" />
          </button>
          <button className={styles.hamburger} onClick={toggleMobileMenu}>
            {showMobileMenu === true ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
        </div>

        <div
          className={clsx({
            [styles.mobile_backdrop]: true,
            [styles.opened_backdrop]: showMobileMenu,
            [styles.closed_backdrop]: !showMobileMenu,
          })}
          ref={backdropMobile}
        ></div>

        <ul
          className={clsx({
            [styles.mobile_links]: true,
            [styles.opened]: showMobileMenu,
            [styles.closed]: !showMobileMenu,
          })}
        >
          {dropdownLinks.map((item) => {
            return (
              <li
                key={item.title}
                className={item.sublinks ? 'has-children' : ''}
              >
                <button className={styles.main_links} onClick={toggleSubmenu}>
                  {item.title}
                </button>
                {item.sublinks && (
                  <div
                    className={clsx({
                      [styles.submenus_container]: true,
                      [styles.mobile_hidden]: true,
                    })}
                  >
                    <button
                      className={styles.back_button}
                      onClick={closeSubmenu}
                    >
                      <i className="fa-solid fa-arrow-left-long"></i>
                      Back to main menu
                    </button>
                    {item.sublinks.map((subitem) => (
                      <ul className={`${styles.submenu_mobile} `}>
                        <h5>
                          <Link to={subitem.path} onClick={closeAll}>
                            {subitem.title}
                          </Link>
                        </h5>

                        {subitem.sublinks &&
                          subitem.sublinks.map((subsubitem) => (
                            <li key={subsubitem.title}>
                              <Link
                                to={subsubitem.path}
                                className="submenu_link"
                                onClick={closeAll}
                              >
                                {subsubitem.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    ))}
                    {item.featured && (
                      <div className={styles.featured}>
                        {item.featured.slice(0, 3).map((featureditem) => {
                          return (
                            <Link
                              to={featureditem.path}
                              className={styles.featured_item}
                              onClick={closeAll}
                            >
                              <div className={styles.featured_item_upper}>
                                <img
                                  src={featureditem.image}
                                  alt={featureditem.title}
                                />
                                <i className="fa-solid fa-arrow-right-long"></i>
                              </div>

                              <span>{featureditem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
          <ul className={styles.user_navigation_list}>
            <li>
              <Link to={'/login'} onClick={closeAll}>
                Log In
              </Link>
            </li>
            <li>
              <Link to={'/Register'} onClick={closeAll}>
                Sign Up
              </Link>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
