import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    profileUrl: "",
    _id: "",
  });
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [notificationDrawer, setNotificationDrawer] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        searchDrawer,
        setSearchDrawer,
        notificationDrawer,
        setNotificationDrawer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
