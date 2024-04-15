import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);

  return user && user.token ? children : <LoadingToRedirect />;
};

export default UserRoute;
