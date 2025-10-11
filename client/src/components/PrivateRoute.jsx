import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import useSyncLocalStorageWithRedux from "../customHooks/useSyncLocalStorageWithRedux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  useSyncLocalStorageWithRedux();
  return userInfo ? (
    <main className="" style={{ flexGrow: 1, padding: 20 }}>
      <Outlet />
    </main>
  ) : (
    <Navigate to="/admin-panel" replace />
  );
};

export default PrivateRoute;
