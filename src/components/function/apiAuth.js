import axios from "axios";
import { path } from "./utils";

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
export const currentAdmin = async (authtoken) => {
  return await axios.post(
    path + "current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
