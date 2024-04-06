import axios from "axios";
import { path } from "./utils";

export const listUsers = async (authToken) => {
  return await axios.get(path + "users", {
    headers: {
      authToken,
    },
  });
};
export const changeStatus = async (authToken, value) => {
  return await axios.post(path + "change-status", value, {
    headers: {
      authToken,
    },
  });
};
export const changeRole = async (authToken, value) => {
  return await axios.post(path + "change-role", value, {
    headers: {
      authToken,
    },
  });
};
export const deleteUser = async (authToken, id) => {
  return await axios.delete(path + "users/" + id, {
    headers: {
      authToken,
    },
  });
};
export const resetPassword = async (authToken, id, values) => {
  return await axios.put(path + "users/" + id, values, {
    headers: {
      authToken,
    },
  });
};
