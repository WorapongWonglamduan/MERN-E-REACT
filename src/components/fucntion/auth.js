import axios from "axios";
export const register = async (value) => {
  const path = process.env.REACT_APP_API;
  const res = await axios.post(path + "register", value);

  console.log("res ==>", res);
};
