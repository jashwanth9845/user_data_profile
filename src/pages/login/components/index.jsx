import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import { AppContext } from "../../../utils/contextApi/AppContext";
import Loading from "../../../utils/components/Loading";
import ShowError from "../../../utils/components/ShowError";
import styles from "../css/index.module.css";

export default function Login() {
  const { usersData, usersFailed, handleSelectedAccount, currentAccount } =
    useContext(AppContext); // Use useContext to access the AppContext and get the necessary data

  return currentAccount && currentAccount !== "undefined" ? (
    <Navigate to={"/profile"} />
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.accountsContainer}>
          <header>{"Select an account"}</header>
          <div className={styles.accountLists}>
            {usersData ? (
              <AccountsList
                usersData={usersData}
                handleSelectedAccount={handleSelectedAccount}
              />
            ) : usersFailed ? (
              <ShowError message={usersFailed} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const AccountsList = ({ usersData, handleSelectedAccount }) => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleAccountClick = (id) => {
    // Call handleSelectedAccount function from parent component
    handleSelectedAccount({ AccountUserId: id });
    // Use navigate function to navigate to "/home" after selecting an account
    navigate("/profile");
  };

  return usersData?.map(({ id, name, profilepicture }) => {
    return (
      <div
        key={id}
        className={styles.account}
        onClick={() => handleAccountClick(id)}
      >
        <div className={styles.accountProfile}>
          <img src={profilepicture} />
        </div>
        <p className={styles.accountUserName}>{name}</p>
      </div>
    );
  });
};
