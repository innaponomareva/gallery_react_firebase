import styles from '../css/navigation.module.css';
import { NavLink } from 'react-router';

const Navigation = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.nav_btn}>
        <NavLink
          to="/myphotos"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          My photos
        </NavLink>
      </li>
      <li className={styles.nav_btn}>
        <NavLink
          to="/upload"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Upload a photo
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
