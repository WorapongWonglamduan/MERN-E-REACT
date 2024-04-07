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
import Error500 from "./components/page/error/Error500";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/page/auth/login/login";
import CreateCategory from "./components/page/admin/category/CreateCategory";
import EditCategory from "./components/page/admin/category/EditCategory";
import "./App.css";

const App = () => {
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
            // id: res.data._id,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <ToastContainer />
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
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-category/:id"
          element={
            <AdminRoute>
              <EditCategory />
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
        <Route path="*" element={<Error500 />} />
      </Routes>
    </div>
  );
};

export default App;
