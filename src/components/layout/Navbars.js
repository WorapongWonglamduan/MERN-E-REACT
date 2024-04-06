import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const itemsLeft = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
  },
];

const itemsRight = [
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
    label: "Logout",
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
    navigate("/login"); // Redirect to the login page after logout
  };

  // Filter out disabled items
  const filteredItemsLeft = itemsLeft.map((item) =>
    item.disabled ? { ...item, label: `${item.title}` } : item
  );

  const filteredItemsRight = itemsRight.map((item) =>
    item.disabled ? { ...item, label: `${item.title}` } : item
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={filteredItemsLeft}
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={filteredItemsRight}
      />
    </div>
  );
};

export default Navbar;
