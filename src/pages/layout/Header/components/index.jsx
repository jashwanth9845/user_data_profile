import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../css/index.module.css";
import { navLinks } from "../../sidenav/components";
import { AppContext } from "../../../../utils/contextApi/AppContext";
import ProfilePopup from "./ProfilePopup";
export default function Header() {
  const { currentAccount } = useContext(AppContext);
  const [toggleProfilePopup, setToggleProfilePopup] = useState(false);

  const location = useLocation();

  const getPageName = () => {
    const pathname = location.pathname;
    const parts = pathname.split("/");
    const pageName = parts[parts.length - 1];

    // Find the corresponding name from the navLinks array
    const matchedLink = navLinks.find(
      (link) => link.toLowerCase() === pageName.toLowerCase()
    );

    // Return the matched name or the default pageName if not found
    return matchedLink || pageName;
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerName}>{getPageName()}</div>
      <div className={styles.profileDiv}>
        <div
          className={styles.profileContent}
          onClick={() =>
            setToggleProfilePopup((prev) => (!prev ? true : false))
          }
        >
          <div className={styles.profileImage}>
            <img src={currentAccount?.profilepicture} />
          </div>
          <div className={styles.profileName}>{currentAccount?.name}</div>
        </div>
        {toggleProfilePopup && (
          <ProfilePopup
            userEmail={currentAccount?.email}
            userName={currentAccount?.name}
            profilepicture={currentAccount?.profilepicture}
          />
        )}
      </div>
      {toggleProfilePopup && (
        <div
          className={styles.bg_click}
          onClick={() => setToggleProfilePopup(false)}
        ></div>
      )}
    </div>
  );
}
