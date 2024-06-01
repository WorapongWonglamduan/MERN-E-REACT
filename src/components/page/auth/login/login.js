import React, { useState } from "react";
import { login } from "../../../function/apiAuth";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    let intended = state;

    if (intended) {
      navigate("../" + intended);
    } else {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/user/index");
      }
    }
  };

  const onHandleChange = (e) => {
    const keyStr = e.target.name;
    const value = e.target.value;

    setValue((prev) => ({ ...prev, [keyStr]: value }));
  };

  const onHandleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    login(value)
      .then((res) => {
        toast.success("Login Success");
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            role: res.data.payload.user.role,
            username: res.data.payload.user.username,
            // id: res.data.payload.user._id,
          },
        });
        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data);
        setLoading(false);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h1>
              Loading ... <Spin />
            </h1>
          ) : (
            <h1>Login</h1>
          )}

          <form action="" onSubmit={onHandleSubmit}>
            <div className="form-group">
              <label>username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="username"
                onChange={onHandleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={value.password}
                onChange={onHandleChange}
              />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPasswordCheckbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <label
                  className="form-check-label"
                  htmlFor="showPasswordCheckbox"
                >
                  Show Password
                </label>
              </div>
            </div>

            <br />
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
