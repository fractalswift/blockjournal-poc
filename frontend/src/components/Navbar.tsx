import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles['navbar-container']}>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles['current'] : styles['not-current']
        }
        to="/new-output"
      >
        Create new output
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles['current'] : styles['not-current']
        }
        to="/my-outputs"
      >
        My outputs
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles['current'] : styles['not-current']
        }
        to="/my-reviews"
      >
        My reviews
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles['current'] : styles['not-current']
        }
        to="/read-public-outputs"
      >
        Read public outputs
      </NavLink>
    </nav>
  );
};

export default Navbar;
