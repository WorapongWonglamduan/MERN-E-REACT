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
export const userCart = async (authToken, cart) => {
  return await axios.post(path + "user/cart", cart, {
    headers: {
      authToken,
    },
  });
};
export const getUserCart = async (authToken) => {
  return await axios.get(path + "user/cart", {
    headers: {
      authToken,
    },
  });
};
export const saveAddress = async (authToken, address) => {
  return await axios.post(
    path + "user/address",
    { address },
    {
      headers: {
        authToken,
      },
    }
  );
};
export const saveOrder = async (authToken) => {
  return await axios.post(
    path + "user/order",
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
export const emptyCart = async (authToken) => {
  return await axios.delete(path + "user/cart", {
    headers: {
      authToken,
    },
  });
};
