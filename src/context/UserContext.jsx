import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiCall } from "../constants/axios";
import { getMyFriendsEndPoint } from "../constants/endpoint";
import { AppContext } from "./AppContext";
import { SocketContext } from "./SocketContext";
import { showToast } from "../utils/toast";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const { user, setUser } = useContext(AppContext);
  const { socket } = useContext(SocketContext);
  const [userList, setUserList] = useState();

  const handleGetMyUserList = async () => {
    const { data, message, status } = await ApiCall(
      "GET",
      getMyFriendsEndPoint(user?._id)
    );
    if (status == 200) {
      setUserList(data?.friends);
    } else {
      showToast(message, "error");
    }
  };

  useEffect(() => {
    handleGetMyUserList();
  }, [user]);

  useEffect(() => {
    socket.on("trigger-user-list", (data) => {
      const { message } = data;
      if (message == "Fetch Notification") {
        handleGetMyUserList();
      }
    });
  });

  return (
    <UserContext.Provider value={{ handleGetMyUserList, userList }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext };
