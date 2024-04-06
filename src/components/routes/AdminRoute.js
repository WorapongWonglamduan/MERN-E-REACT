import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../function/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("res=>", res);
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAdmin(false);
        });
    }
  }, [user]);

  return isAdmin ? children : <LoadingToRedirect />;
};

export default AdminRoute;
