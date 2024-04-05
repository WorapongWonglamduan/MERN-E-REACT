import axios from "axios";

export const path = process.env.REACT_APP_API;
export const register = async (value) => {
  return await axios.post(path + "register", value);
};
export const login = async (value) => {
  return await axios.post(path + "login", value);
};
export const currentUser = async (authtoken) => {
  return await axios.post(
    path + "current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
