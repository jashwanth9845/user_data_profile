import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../css/index.module.css";

export const navLinks = ["Profile", "Posts", "Gallery", "ToDo"];

export default function SideNav() {
  const location = useLocation();

  const isActiveLink = (link) => {
    return location.pathname === `/${link.toLowerCase()}`;
  };

  return (
    <div className={styles.container}>
      {navLinks?.map((link, i) => (
        <NavLink
          key={i}
          className={
            isActiveLink(link)
              ? `${styles.activeLink} ${styles.links}`
              : styles.links
          }
          to={`/${link.toLowerCase()}`}
        >
          {link}
          {isActiveLink(link) && (
            <div className={styles.activeCut}>
              <div>
                <b className={styles.leftcut}></b>
                <span>
                  <img src="assets/svgs/arrow_right.svg" />
                </span>
                <b className={styles.rightcut}></b>
              </div>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
