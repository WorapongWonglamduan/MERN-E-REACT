import axios from "axios";
import { path } from "./utils";

export const register = async (value) => {
  return await axios.post(path + "register", value);
};
export const login = async (value) => {
  return await axios.post(path + "login", value);
};
export const currentUser = async (authToken) => {
  return await axios.post(
    path + "current-user",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
export const currentAdmin = async (authToken) => {
  return await axios.post(
    path + "current-admin",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
