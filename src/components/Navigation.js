import React from "react";
import "../css/navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <ul className="navi">
        <li className="navi-button">
          <NavLink to="/myphotos">My photos</NavLink>
        </li>
        <li className="navi-button">
          <NavLink to="/upload">Upload a photo</NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
