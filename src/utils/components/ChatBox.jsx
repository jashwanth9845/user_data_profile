import React, { useContext, useEffect, useState } from "react";
import styles from "./css/chatbox.module.css";
import { AppContext } from "../contextApi/AppContext";
export default function ChatBox() {
  const { usersData } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={styles.container}
      style={{ height: toggle ? "300px" : "40px" }}
    >
      <div
        className={styles.header}
        onClick={() => setToggle((prev) => (!prev ? true : false))}
      >
        <div className={styles.text}>Chats</div>
        <div className={styles.icon}>
          <img src={"assets/svgs/arrow_right.svg"} alt="arrow icon" />
        </div>
      </div>
      <div className={styles.chatLists}>
        <div className={styles.chatList}>
          {usersData?.map(({ name, profilepicture }, index) => {
            const randomIndex = Math.floor(Math.random() * usersData?.length);

            return (
              <div key={name} className={styles.chatDiv}>
                <div className={styles.profile}>
                  <img src={profilepicture} alt="Profile" />
                </div>
                <div className={styles.username}>{name}</div>
                <div
                  className={`${styles.active} ${
                    index === randomIndex ? styles.showActive : ""
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
