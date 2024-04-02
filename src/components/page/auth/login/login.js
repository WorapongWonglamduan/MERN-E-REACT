import React, { useState } from "react";
import { login } from "../../../function/auth";

const Login = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

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
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={onHandleSubmit}>
        <label>username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={onHandleChange}
        />
        <label>password</label>
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={onHandleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
