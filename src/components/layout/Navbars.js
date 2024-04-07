import React, { useMemo, useState } from "react";
import {
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");

  console.log("memoizedUser =>", memoizedUser);

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

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
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
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        // style={{ justifyContent: "flex-start" }} // Align the entire menu to flex-end
      />
    </>
  );
};

export default Navbar;
