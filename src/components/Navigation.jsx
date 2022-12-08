import React from "react";
import styles from "../css/navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.nav_btn}>
        <NavLink to="/myphotos">My photos</NavLink>
      </li>
      <li className={styles.nav_btn}>
        <NavLink to="/upload">Upload a photo</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
