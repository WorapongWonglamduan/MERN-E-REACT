import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const items = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
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
  },
  {
    key: "logout",
    icon: <AppstoreOutlined />,
    disabled: false,
    label: <Link to={"/logout"}>Logout</Link>,
    title: "Logout",
  },
];

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
    navigate("/");
  };

  // Filter out disabled items
  const filteredItems = items.map((item) =>
    item.disabled ? { ...item, label: `${item.title}` } : item
  );

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={filteredItems}
    />
  );
};

export default Navbar;
