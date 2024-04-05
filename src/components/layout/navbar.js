import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  // SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const items = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    // icon: <MailOutlined />,
  },
  {
    label: <Link to={"/login"}>login</Link>,
    key: "login",
    icon: <MailOutlined />,
  },
  {
    label: <Link to={"/register"}>Register</Link>,
    key: "register",
    icon: <AppstoreOutlined />,
    disabled: false,
    labelUnlink: "Register",
  },
  {
    key: "logout",
    icon: <AppstoreOutlined />,
    disabled: false,
    label: <Link to={"/logout"}>Logout</Link>,
    labelUnlink: "Logout",
  },
];
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    if (e.key === "logout") {
      logout();
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/");
    console.log("LOGOUT");
  };

  // Filter out disabled items
  const checkDisable = items.map((item) =>
    item.disabled ? { ...item, label: item.labelUnlink } : item
  );
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={checkDisable}
    />
  );
};

export default Navbar;
