import axios from "axios";
import { path } from "./utils";

export const createProduct = async (authToken, values) => {
  return await axios.post(path + "product", values, {
    headers: {
      authToken,
    },
  });
};
export const listProduct = async (count) => {
  return await axios.get(path + "product/" + count);
};
export const deleteProduct = async (authToken, id) => {
  return await axios.delete(path + "product/" + id, {
    headers: {
      authToken,
    },
  });
};
export const editProduct = async (id) => {
  return await axios.get(path + "products/" + id);
};
export const updateProduct = async (authToken, id, values) => {
  return await axios.put(path + "product/" + id, values, {
    headers: {
      authToken,
    },
  });
};
export const listProductBy = async (sort, order, limit) => {
  const values = { sort, order, limit };
  return await axios.post(path + "product-by", values);
};
