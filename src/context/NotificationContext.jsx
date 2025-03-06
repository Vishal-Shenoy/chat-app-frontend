import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/toast";
import { ApiCall } from "../constants/axios";
import { getMyRequestEndPoint } from "../constants/endpoint";
import { AppContext } from "./AppContext";

const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const { user, setUser } = useContext(AppContext);
  const [notificationCount, setNotficationCount] = useState(0);
  const [notification, setNotification] = useState([]);

 
  
  

  return (
    <NotificationContext.Provider value={{ notificationCount, notification }}>
      {children}
    </NotificationContext.Provider>
  );
}
export { NotificationContext };
