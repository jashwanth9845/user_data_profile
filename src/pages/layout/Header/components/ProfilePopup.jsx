import React, { useContext } from "react";
import styles from "../css/profilePopup.module.css";
import { AppContext } from "../../../../utils/contextApi/AppContext";
export default function ProfilePopup({ userName, userEmail, profilepicture }) {
  const { usersData, handleSelectedAccount } = useContext(AppContext);
  // Filter out the user whose name matches the userName prop
  const filteredUsers = usersData?.filter((user) => user.name !== userName);

  // Create a new array containing the 2nd and 3rd elements from the filtered array
  const accountsList = filteredUsers?.slice(1, 3) || [];

  return (
    <>
      <div className={styles.conatiner}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <img src={profilepicture} />
            </div>
            <div className={styles.userData}>
              <p className={styles.username}>{userName}</p>
              <p className={styles.useremail}>{userEmail}</p>
            </div>
          </div>
          <div className={styles.accountList}>
            {accountsList?.map(({ profilepicture, name, id }) => {
              return (
                <div
                  key={id}
                  className={styles.accountDiv}
                  onClick={() => handleSelectedAccount({ AccountUserId: id })}
                >
                  <div className={styles.profileImg}>
                    <img src={profilepicture} />
                  </div>
                  <p className={styles.username}>{name}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.logout}>
            <button onClick={() => handleSelectedAccount({ logout: true })}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
