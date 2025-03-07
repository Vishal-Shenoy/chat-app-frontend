import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const SocketContext = createContext();
import { io } from "socket.io-client";
import { BASE_END_POINT } from "../constants/endpoint";
import { AppContext } from "./AppContext";
export function SocketContextProvider({ children }) {
  const { user, setUser } = useContext(AppContext);

  const socket = useMemo(() =>
    io(BASE_END_POINT, { withCredentials: true, timeout: 10000 })
  );

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
export { SocketContext };
