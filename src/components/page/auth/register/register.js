import React, { useState } from "react";
import { register } from "../../../fucntion/auth";

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
      alert("Password not match");
    } else {
      register(value)
        .then((res) => {
          console.log("res =>", res);
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data);
        });
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        <label>confirm password</label>
        <input
          type="text"
          name="confirm_password"
          placeholder="confirm password"
          onChange={onHandleChange}
        />
        <button disabled={value.password.length < 6}>Submit</button>
      </form>
    </div>
  );
};

export default Register;
