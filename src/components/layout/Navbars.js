import React, { useMemo, useState } from "react";
import {
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Search from "../card/Search";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      logout();
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    setCurrent("login");
    navigate("/login");
    toast.success("Logout");
  };
  const isLogin = memoizedUser
    ? memoizedUser.role === "admin"
      ? "/admin/index"
      : "/user/index"
    : "/";

  const items = [
    {
      label: <Link to={isLogin}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/shop"}>Shop</Link>,
      key: "shop",
      icon: <ShoppingCartOutlined />,
    },
    !memoizedUser && {
      label: <Link to={"/login"}>Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    !memoizedUser && {
      label: <Link to={"/register"}>Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
    memoizedUser && {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      title: "Logout",
    },
    { label: <Search />, key: "search" },
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default Navbar;
