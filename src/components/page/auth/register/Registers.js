import React, { useState } from "react";
import { register } from "../../../function/apiAuth";
import { toast } from "react-toastify";
const Register = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const onHandleChange = (e) => {
    const keyStr = e.target.name;
    const value = e.target.value;

    setValue((prev) => ({ ...prev, [keyStr]: value }));
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.confirm_password) {
      toast.error("Password not match");
    } else {
      register(value)
        .then((res) => {
          toast.success(res.data);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Register</h1>
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
            <div className="form-group">
              <label>confirm password</label>
              <input
                className="form-control"
                type="text"
                name="confirm_password"
                placeholder="confirm password"
                onChange={onHandleChange}
              />
            </div>
            <br />
            <button
              className="btn btn-success"
              disabled={value.password.length < 6}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
