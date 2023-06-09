import { NavLink } from 'react-router-dom';
import styles from './mainNavigation.module.scss';

const MainNavigation = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink
              to={'/Login'}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/Register'}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
