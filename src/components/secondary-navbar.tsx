import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import bag from '../assets/shopping-bag.svg';
import person from '../assets/person.svg';
import styles from './secondary-navbar.module.scss';

const SenondaryNavigation = () => {
  const [personNavigation, setPersonNavigation] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const activePersonNavigation = () => {
    setPersonNavigation(true);
  };
  const deactivePersonNavigation = () => {
    setPersonNavigation(false);
  };
  return (
    <div className={styles.secondry_nav}>
      <Link to="/" className={styles.logo}>
        <span>RIXO</span>
      </Link>

      <ul className={styles.header_icons}>
        <li
          className={styles.header_icon}
          onMouseEnter={activePersonNavigation}
          onMouseLeave={deactivePersonNavigation}
        >
          <img src={person} alt="person logo" />
          {personNavigation && (
            <ul>
              {currentUser ? (
                <li>
                  <Link to="/login" onClick={logout}>
                    Log Out
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
              <li>
                <Link to="/Register">Sign Up</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={styles.header_icon}>
          <img src={bag} alt="bag logo" />
        </li>
      </ul>
    </div>
  );
};

export default SenondaryNavigation;
