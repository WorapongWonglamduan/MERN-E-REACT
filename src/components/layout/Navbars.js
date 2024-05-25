import React, { /* useMemo, */ useState } from "react";
// import {
//   LogoutOutlined,
//   HomeOutlined,
//   LoginOutlined,
//   UserAddOutlined,
//   ShoppingCartOutlined,
//   ShoppingOutlined,
// } from "@ant-design/icons";
import { /* Menu, */ Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import { useSelector, shallowEqual } from "react-redux";
// import Search from "../card/Search";
import "./custom.css";
const Navbar = () => {
  const { user, cart } = useSelector(
    (state) => ({
      user: state.user,
      cart: state.cart,
    }),
    shallowEqual
  );

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [current, setCurrent] = useState("home");

  // const onClick = (e) => {
  //   setCurrent(e.key);
  //   if (e.key === "logout") {
  //     logout();
  //   }
  // };

  // const logout = () => {
  //   dispatch({ type: "LOGOUT", payload: null });
  //   setCurrent("login");
  //   navigate("/login");
  //   toast.success("Logout");
  // };
  const isLogin =
    user && user.role === "admin" ? "/admin/index" : "/user/index";

  // const items = [
  //   {
  //     label: <Link to={"/"}>Home</Link>,
  //     key: "home",
  //     icon: <HomeOutlined />,
  //   },
  //   {
  //     label: <Link to={"/shop"}>Shop</Link>,
  //     key: "shop",
  //     icon: <ShoppingOutlined />,
  //   },
  //   {
  //     label: (
  //       <Link to={"/cart"}>
  //         <Badge count={cart.length} offset={[9, 0]}>
  //           Cart
  //         </Badge>
  //       </Link>
  //     ),
  //     key: "cart",
  //     icon: <ShoppingCartOutlined />,
  //   },
  //   !user && {
  //     label: <Link to={"/login"}>Login</Link>,
  //     key: "login",
  //     icon: <LoginOutlined />,
  //   },
  //   !user && {
  //     label: <Link to={"/register"}>Register</Link>,
  //     key: "register",
  //     icon: <UserAddOutlined />,
  //   },
  //   user && {
  //     key: "logout",
  //     icon: <LogoutOutlined />,
  //     label: "Logout",
  //     title: "Logout",
  //   },
  //   user && {
  //     key: "dashboard",
  //     // icon: <LogoutOutlined />,
  //     label: <Link to={isLogin}>Dashboard</Link>,
  //     title: "Dashboard",
  //   },
  //   { label: <Search />, key: "search" },
  // ];

  const NavBarContent = () => {
    return (
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>{" "}
                <span className="text-white">123 Street, New York</span>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary"></i>
                <span className="text-white">Email@Example.com</span>
              </small>
            </div>
            <div className="top-link pe-2">
              <span className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </span>
              <span className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </span>
              <span className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </span>
            </div>
          </div>
        </div>
        {/* Nav item */}
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <span className="navbar-brand">
              <h1 className="text-primary display-6">
                <Link to={"/"}>WorapongShop</Link>
              </h1>
            </span>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                {/* <a href="#" className="nav-item nav-link active"> */}
                <Link className="nav-item nav-link active" to={"/"}>
                  Home
                </Link>
                {/* </a> */}
                {/* <a href="#" className="nav-item nav-link"> */}
                <Link className="nav-item nav-link" to={"/shop"}>
                  Shop
                </Link>
                {/* </a> */}
              </div>
              <div className="d-flex m-3 me-0">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary"></i>
                </button>

                <Link
                  className={`position-relative  my-auto ${
                    cart.length <= 0 ? "me-4" : ""
                  }`}
                  to={"/cart"}
                >
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <Badge count={cart.length} offset={[-10, -30]}></Badge>
                </Link>

                <Link to={isLogin} className="my-auto">
                  <i className="fas fa-user fa-2x"></i>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  };
  const ModalSearch = () => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
      setText(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/shop?" + text, { state: { text: text } });
      document.getElementById("closeButton").click();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="searchModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Search by keyword
                </h5>
                <button
                  type="button"
                  id="closeButton"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control p-3"
                    placeholder="keywords"
                    aria-describedby="search-icon-1"
                    onChange={handleChange}
                  />
                  <span
                    onClick={handleSubmit}
                    style={{ cursor: "pointer" }}
                    id="search-icon-1"
                    className="input-group-text p-3"
                  >
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };
  return (
    <>
      {/* <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      /> */}
      <NavBarContent />
      <ModalSearch />
    </>
  );
};

export default Navbar;
