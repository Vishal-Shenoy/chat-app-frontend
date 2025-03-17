import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiCall } from "../constants/axios";
import { getMyMessageEndPoint } from "../constants/endpoint";
import { AppContext } from "./AppContext";
const ChatContext = createContext();
export function ChatContextProvider({ children }) {
  const { user } = useContext(AppContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const getMyMessages = async () => {
    console.log("came");
    const { data, status, message } = await ApiCall(
      "GET",
      getMyMessageEndPoint(user?._id, selectedUser?._id)
    );
    setUserMessages(data?.messages);
  };

  useEffect(() => {
    getMyMessages();
  }, [selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        selectedUserId,
        setSelectedUserId,
        setSelectedUser,
        userMessages,
        setUserMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
export { ChatContext };
