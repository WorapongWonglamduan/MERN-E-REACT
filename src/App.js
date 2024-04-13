import { Route, Routes } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
//api
import { currentUser } from "./components/function/apiAuth";
//page Error
import Error500 from "./components/page/error/Error500";
//page Auth
import Register from "./components/page/auth/register/Registers";
import Login from "./components/page/auth/login/Login";
import Home from "./components/page/home/Home";
import Navbar from "./components/layout/Navbars";
//page admin
import AdminRoute from "./components/routes/AdminRoute";
import HomeAdmin from "./components/page/admin/home/Home";
import ManageAdmin from "./components/page/admin/manage/ManageAdmin";
//page user
import UserRoute from "./components/routes/UserRoute";
import HomeUser from "./components/page/user/home/Home";
//page category
import CreateCategory from "./components/page/admin/category/CreateCategory";
import EditCategory from "./components/page/admin/category/EditCategory";
//page product
import CreateProduct from "./components/page/admin/product/CreateProduct";
import EditProduct from "./components/page/admin/product/EditProduct";
import Product from "./components/page/product/Product";

//page shop
import Shop from "./components/page/shop/Shop";

const App = () => {
  const dispatch = useDispatch();

  const idToken = localStorage.token;
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
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
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
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
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Error500 />} />
      </Routes>
    </div>
  );
};

export default App;
