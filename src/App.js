import Login from "./components/page/auth/login/Login";
import Register from "./components/page/auth/register/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/page/home/Home";
import Navbar from "./components/layout/Navbars";
import React from "react";
//page admin
import AdminRoute from "./components/routes/AdminRoute";
import HomeAdmin from "./components/page/admin/home/Home";
import ManageAdmin from "./components/page/admin/manage/ManageAdmin";
//page user
import UserRoute from "./components/routes/UserRoute";
import HomeUser from "./components/page/user/home/Home";
import { currentUser } from "./components/function/apiAuth";
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
        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
