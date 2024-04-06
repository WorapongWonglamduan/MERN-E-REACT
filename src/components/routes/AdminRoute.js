import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../function/apiAuth";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (memoizedUser && memoizedUser.token) {
      currentAdmin(memoizedUser.token)
        .then(() => {
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAdmin(false);
        });
    }
  }, [memoizedUser]);

  return isAdmin ? children : <LoadingToRedirect />;
};

export default AdminRoute;
