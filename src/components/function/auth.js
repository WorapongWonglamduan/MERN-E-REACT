import axios from "axios";
export const register = async (value) => {
  const path = process.env.REACT_APP_API;
  return await axios.post(path + "register", value);
};
export const login = async (value) => {
  console.log("value-===>", value);
  const path = process.env.REACT_APP_API;
  return await axios.post(path + "login", value);
};
