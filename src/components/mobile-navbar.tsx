import { useContext, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { DropdownLink } from './navbar';
import bag from '../assets/shopping-bag.svg';

import styles from './navbar.module.scss';
import clsx from 'clsx';

interface MobileNavbarProps {
  dropdownLinks: DropdownLink[];
  showMobileMenu: boolean;
  toggleMobileMenu: () => void;
  backdropMobile: React.RefObject<HTMLDivElement>;
  toggleSubmenu: MouseEventHandler<HTMLButtonElement>;
  closeSubmenu: MouseEventHandler<HTMLButtonElement>;
  closeAll: () => void;
}

const MobileNavbar = (props: MobileNavbarProps) => {
  const {
    dropdownLinks,
    showMobileMenu,
    toggleMobileMenu,
    backdropMobile,
    toggleSubmenu,
    closeSubmenu,
    closeAll,
  } = props;

  const { currentUser, logout } = useContext(AuthContext);

  const logOut = () => {
    closeAll();
    setTimeout(() => {
      logout();
    }, 500);
  };

  return (
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
          [styles.mobile_links_container]: true,
          [styles.opened]: showMobileMenu,
          [styles.closed]: !showMobileMenu,
        })}
      >
        <div className={styles.mobile_links}>
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
        </div>
        <ul className={styles.user_navigation_list}>
          {currentUser ? (
            <li>
              <Link to={'/login'} onClick={logOut}>
                Log Out
              </Link>
            </li>
          ) : (
            <li>
              <Link to={'/login'} onClick={closeAll}>
                Log In
              </Link>
            </li>
          )}
          <li>
            <Link to={'/Register'} onClick={closeAll}>
              Sign Up
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
