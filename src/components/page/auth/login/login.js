import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form action="">
        <label>username</label>
        <input type="text" name="username" placeholder="username" />
        <label>password</label>
        <input type="text" name="password" placeholder="password" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
