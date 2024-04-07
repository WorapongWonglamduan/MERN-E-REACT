import React, { useState } from "react";
import {
  LogoutOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
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
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/login"}>Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: <Link to={"/register"}>Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
    {
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
