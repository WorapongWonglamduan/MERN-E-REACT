import React, { useState } from "react";
import { login } from "../../../function/apiAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    console.log("role =>", role);
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };

  const onHandleChange = (e) => {
    const keyStr = e.target.name;
    const value = e.target.value;

    setValue((prev) => ({ ...prev, [keyStr]: value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    login(value)
      .then((res) => {
        console.log("res-===>", res.data);

        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            role: res.data.payload.user.role,
            username: res.data.payload.user.username,
          },
        });
        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Login</h1>
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
              <label>password</label>
              <input
                className="form-control"
                type="text"
                name="password"
                placeholder="password"
                onChange={onHandleChange}
              />
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
