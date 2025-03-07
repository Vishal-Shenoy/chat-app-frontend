import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiCall } from "../constants/axios";
import { getMyRequestEndPoint } from "../constants/endpoint";
import { AppContext } from "./AppContext";
import { SocketContext } from "./SocketContext";

const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const { user, setUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);
  const [notificationCount, setNotficationCount] = useState(0);
  const [notification, setNotification] = useState([]);

  const handleNotification = async () => {
    const { data, status, message } = await ApiCall(
      "GET",
      getMyRequestEndPoint(user?._id)
    );
    if (status === 200) {
      setNotification(data?.myRequests);
      setNotficationCount(data?.myRequests?.length);
    }
  };

  const handleRemoveNotification = (_id) => {
    console.log(_id, notification);
    let result = notification?.filter((item) => {
      if (item?._id.toString() !== _id?.toString()) {
        return item;
      }
    });
    setNotification(result);
    setNotficationCount(result?.length);
  };

  useEffect(() => {
    handleNotification();
  }, [user]);

  useEffect(() => {
    socket.on("trigger-notification-user", (data) => {
      const { message } = data;
      console.log(message == "Fetch Notification", data);
      if (message == "Fetch Notification") {
        handleNotification();
      }
    });
  });

  return (
    <NotificationContext.Provider
      value={{ notificationCount, notification, handleRemoveNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
export { NotificationContext };
