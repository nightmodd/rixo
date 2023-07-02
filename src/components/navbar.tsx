import { useState } from 'react';
import { Link } from 'react-router-dom';
//import Dropdown from './dropdown';
//import Context from '../context/context';

import styles from './navbar.module.scss';

interface DropdownLinks {
    [key: string]: {
        path: string;
        sublinks?: {
            [key: string]: {
                title: string;
                path: string;
            }[];
        };
    };
}

const MainNavigation = () => {
    const dropdownLinks: DropdownLinks = {
        'New In': {
            path: '/',
        },
        Clothing: {
            path: '/',
            sublinks: {
                'All Clothing': [
                    { title: 'Dresses', path: '/' },
                    { title: 'Exclusives', path: '/' },
                    { title: 'Extended Sizing', path: '/' },
                    { title: 'Occasion', path: '/' },
                    { title: 'Wardrobe Staples', path: '/' },
                    { title: 'Silk', path: '/' },
                    { title: 'Holiday', path: '/' },
                    { title: 'Last Chance', path: '/' },
                ],
                Dresses: [
                    { title: 'Occasion Dresses', path: '/' },
                    { title: 'Gowns', path: '/' },
                    { title: 'Silk Dresses', path: '/' },
                    { title: 'Shirtdresses', path: '/' },
                    { title: 'Mini Dresses', path: '/' },
                    { title: 'Midi Dresses', path: '/' },
                    { title: 'Maxi Dresses', path: '/' },
                ],
                Tops: [
                    { title: 'Occasion Tops', path: '/' },
                    { title: 'Silk Tops', path: '/' },
                    { title: 'Co-ords', path: '/' },
                ],
                Skirts: [
                    { title: 'Midi Skirts', path: '/' },
                    { title: 'Silk Skirts', path: '/' },
                    { title: 'Co-ords', path: '/' },
                ],
                Loungewear: [
                    { title: 'Sets', path: '/' },
                    { title: 'Day to Night', path: '/' },
                    { title: 'Accessories', path: '/' },
                ],
            },
        },
        Dresses: {
            path: '/',
            sublinks: {
                'All Dresses': [
                    { title: 'Occasion Dresses', path: '/' },
                    { title: 'Gowns', path: '/' },
                    { title: 'Silk Dresses', path: '/' },
                    { title: 'Shirtdresses', path: '/' },
                    { title: 'Mini Dresses', path: '/' },
                    { title: 'Midi Dresses', path: '/' },
                    { title: 'Maxi Dresses', path: '/' },
                    { title: 'Day to Night Dresses', path: '/' },
                ],
                Featured: [
                    { title: 'Holiday', path: '/' },
                    { title: 'Exclusive Dresses', path: '/' },
                    { title: 'Extended Sizing', path: '/' },
                    { title: 'Wardrobe Staples', path: '/' },
                    { title: 'Breastfeeding Friendly', path: '/' },
                    { title: 'Last Chance Dresses', path: '/' },
                ],
            },
        },
        Occasion: {
            path: '/',
            sublinks: {
                Occasion: [
                    { title: 'Wedding Guest', path: '/' },
                    { title: 'Race Day', path: '/' },
                    { title: 'Festival', path: '/' },
                    { title: 'Gowns', path: '/' },
                ],
            },
        },
        Exclusive: {
            path: '/',
        },
        Accessories: {
            path: '/',
            sublinks: {
                Accessories: [
                    { title: 'Bags', path: '/' },
                    { title: 'Belts', path: '/' },
                    { title: 'Jewellery', path: '/' },
                    { title: 'Shoes & Boots', path: '/' },
                    { title: 'Scarves', path: '/' },
                    { title: 'Hair', path: '/' },
                    { title: 'Gifts', path: '/' },
                    { title: 'Homeware', path: '/' },
                ],
            },
        },
        Bridal: {
            path: '/',
            sublinks: {
                Bridal: [
                    { title: 'New Bridal', path: '/' },
                    { title: 'Bridal Dresses', path: '/' },
                    { title: 'Bridal Party', path: '/' },
                    { title: 'Bridal Register', path: '/' },
                    { title: 'Bridal Ceremony', path: '/' },
                    { title: 'Honeymoon', path: '/' },
                    { title: 'Bridal Lookbook', path: '/' },
                ],
                'Bridal Party': [
                    { title: 'Bridesmaids', path: '/' },
                    { title: 'Wedding Guest', path: '/' },
                    { title: 'Mother of the Bride', path: '/' },
                ],
                Appointments: [
                    { title: 'Book an Appointment', path: '/' },
                    { title: 'Bridal Lookbook', path: '/' },
                ],
            },
        },
        'Our Story': {
            path: '/',
        },
        Rental: {
            path: '/',
        },
    };

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    //variables
    const menu = document.querySelector(`.${styles.mobile_links}`);
    const backdrop = document.querySelector(`.${styles.mobile_backdrop}`);
    const submenus = document.querySelectorAll(`.${styles.submenus_container}`);
    const backdropMobile = document.querySelector(`.${styles.mobile_backdrop}`);
    const subMenuLinks = document.querySelectorAll(' .submenu_link');

    console.log(subMenuLinks);

    //handling on Click events
    const CloseAll = () => {
        setShowMobileMenu(false);
        menu?.classList.remove(styles.opened);
        menu?.classList.add(styles.closed);
        backdrop?.classList.remove(styles.opened);
        backdrop?.classList.add(styles.closed);
        submenus.forEach((submenu) => {
            submenu.classList.add(styles.mobile_hidden);
        });
    };
    backdropMobile?.addEventListener('click', CloseAll);

    subMenuLinks.forEach((link) => {
        link.addEventListener('click', CloseAll);
    });

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);

        if (showMobileMenu === false) {
            menu?.classList.add(styles.opened);
            menu?.classList.remove(styles.closed);
            backdrop?.classList.add(styles.opened);
            backdrop?.classList.remove(styles.closed);
        } else {
            menu?.classList.remove(styles.opened);
            menu?.classList.add(styles.closed);
            backdrop?.classList.remove(styles.opened);
            backdrop?.classList.add(styles.closed);
            submenus.forEach((submenu) => {
                submenu.classList.add(styles.mobile_hidden);
            });
        }
    };

    const toggleSubmenu = (e: any) => {
        const submenu = e.target.nextElementSibling;
        submenu?.classList.toggle(styles.mobile_hidden);
    };

    const closeSubmenu = (e: any) => {
        const submenu = e.target.parentElement;
        submenu?.classList.add(styles.mobile_hidden);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.desktop_nav}>
                <ul className={styles.links}>
                    {Object.keys(dropdownLinks).map((key) => {
                        return (
                            <li key={key}>
                                <Link to={dropdownLinks[key].path}>{key}</Link>
                                {dropdownLinks[key].sublinks && (
                                    <>
                                        <div
                                            className={`${styles.backdrop} ${styles.hidden} `}
                                        ></div>
                                        <div
                                            className={` ${styles.dropdown} ${styles.hidden}`}
                                        >
                                            {Object.keys(
                                                dropdownLinks[key].sublinks
                                            ).map((subkey) => (
                                                <ul className={styles.sub_menu}>
                                                    <h3>{subkey}</h3>
                                                    {dropdownLinks[key]
                                                        .sublinks &&
                                                        dropdownLinks[
                                                            key
                                                        ].sublinks[subkey].map(
                                                            (subsubkey) => (
                                                                <li
                                                                    key={
                                                                        subsubkey.title
                                                                    }
                                                                >
                                                                    <Link
                                                                        to={
                                                                            subsubkey.path
                                                                        }
                                                                    >
                                                                        {
                                                                            subsubkey.title
                                                                        }
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <nav className={styles.mobile_nav}>
                <button className={styles.hamburger} onClick={toggleMobileMenu}>
                    {showMobileMenu === true ? (
                        <i className="fa-solid fa-xmark"></i>
                    ) : (
                        <i className="fa-solid fa-bars"></i>
                    )}
                </button>

                <div
                    className={`${styles.mobile_backdrop} ${styles.closed}`}
                ></div>
                <ul className={`${styles.mobile_links}  ${styles.closed}`}>
                    {Object.keys(dropdownLinks).map((key) => {
                        return (
                            <li
                                key={key}
                                className={
                                    dropdownLinks[key].sublinks
                                        ? 'has-children'
                                        : ''
                                }
                            >
                                <button
                                    className={styles.main_links}
                                    onClick={toggleSubmenu}
                                >
                                    {key}
                                </button>
                                {dropdownLinks[key].sublinks && (
                                    <div
                                        className={`${styles.submenus_container} ${styles.mobile_hidden}`}
                                    >
                                        <button
                                            className={styles.back_button}
                                            onClick={closeSubmenu}
                                        >
                                            <i className="fa-solid fa-arrow-left-long"></i>
                                            {'  '}
                                            Back to main menu
                                        </button>
                                        {Object.keys(
                                            dropdownLinks[key].sublinks
                                        ).map((subkey) => (
                                            <ul
                                                className={`${styles.submenu_mobile} `}
                                            >
                                                <h5>{subkey}</h5>
                                                {dropdownLinks[key].sublinks[
                                                    subkey
                                                ].map((subsubkey) => (
                                                    <li key={subsubkey.title}>
                                                        <Link
                                                            to={subsubkey.path}
                                                            className="submenu_link"
                                                        >
                                                            {subsubkey.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ))}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
