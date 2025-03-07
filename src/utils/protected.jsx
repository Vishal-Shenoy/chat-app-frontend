import React, { useContext, useEffect, useState } from "react";
import { ApiCall } from "../constants/axios";
import { refreshEndPoint } from "../constants/endpoint";
import { decodeToken } from "./decode-jwt";
import { AppContext } from "../context/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useRefresh = () => {
  const {user,setUser} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState();
  const [isLogin, setIsLogin] = useState();
  const location = useLocation();

  useEffect(() => {
    setPath(location.href);
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    try{
    const { message, status, data } = await ApiCall("GET", refreshEndPoint());
    if (status === 200) {
      const { userName, email, profileUrl, _id } = decodeToken(data?.accessToken);
      setUser({
        _id: _id,
        userName: userName,
        email: email,
        profileUrl: profileUrl,
      });
      setIsLogin(true);
    }
  }catch(error){
      setIsLogin(false);
    }
    setIsLoading(false);
  };


  return isLoading ? <p>Loading ...</p> : isLogin ? <Outlet/> : <Navigate to="/"/>;
};

export default useRefresh;
