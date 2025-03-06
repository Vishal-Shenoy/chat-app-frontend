import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
const SocketContext = createContext();
import { io } from "socket.io-client";
import { BASE_END_POINT } from "../constants/endpoint";
import { AppContext } from "./AppContext";
export function SocketContextProvider({ children }) {
  const { user, setUser } = useContext(AppContext);

  const socket = useMemo(() => io(BASE_END_POINT));

  useEffect(() => {
    console.log("came")
    socket.emit("user-joined", {userId : user?._id});
  },[])

 
  
  

  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  );
}
export { SocketContext };
