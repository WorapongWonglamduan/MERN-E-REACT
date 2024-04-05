import Login from "./components/page/auth/login/login";
import Register from "./components/page/auth/register/register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/page/home/home/home";
import Navbar from "./components/layout/navbar";
import React, { useState, useEffect } from "react";
//page admin
import HomeAdmin from "./components/page/admin/home/home";
//page user
import HomeUser from "./components/page/user/home/home";
import { currentUser } from "./components/function/auth";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  const idToken = localStorage.token;
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        console.log("res auth =>", res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            role: res.data.role,
            username: res.data.username,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/index" element={<HomeAdmin />} />
        <Route path="/user/index" element={<HomeUser />} />
      </Routes>
    </div>
  );
}

export default App;
