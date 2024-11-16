import React, { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
  const accessToken = useSelector((state) => state.user);
  console.log("hi");
  console.log(accessToken);
  if (!accessToken) {
    return <Navigate to="/404" replace />;
  }
  return <Outlet />;
};
export default AuthorizationProvider;
