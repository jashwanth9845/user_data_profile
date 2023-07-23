import React, { createContext, useState } from "react";
import { getDataFromServer } from "../helpers/ApiCalls";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("currentAccount"));
  // Retrieve selected account from localStorage on app start
  const storedAccount =
    loggedInUser ?? JSON.parse(localStorage.getItem("currentAccount"));
  const [currentAccount, setCurrentAccount] = useState(storedAccount || null);
  const [usersData, setUsersData] = useState();
  const [usersFailed, setUsersFailed] = useState(false);

  const getUsersData = () => {
    getDataFromServer({ apiUrl: "https://panorbit.in/api/users.json" })
      .then((res) => {
        const { users } = res || {};
        if (users) {
          setUsersData(users);
        } else {
          setUsersFailed("no user account found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setUsersFailed("failed to fetch users account data");
      });
  };

  const handleSelectedAccount = ({ AccountUserId, logout }) => {
    if (logout === true) {
      setCurrentAccount(null);
      localStorage.removeItem("currentAccount");
      localStorage.clear();
    } else {
      const userAccount = usersData.find(({ id }) => id == AccountUserId);
      setCurrentAccount(userAccount);
      // Store the selected account in localStorage for persistence
      localStorage.setItem("currentAccount", JSON.stringify(userAccount));
    }
  };

  return (
    <AppContext.Provider
      value={{
        usersData,
        usersFailed,
        getUsersData,
        currentAccount,
        handleSelectedAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
