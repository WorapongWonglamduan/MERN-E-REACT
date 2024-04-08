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
// export const deleteCategory = async (authToken, id) => {
//   return await axios.delete(path + "category/" + id, {
//     headers: {
//       authToken,
//     },
//   });
// };
// export const editCategory = async (authToken, id) => {
//   return await axios.get(path + "category/" + id, {
//     headers: {
//       authToken,
//     },
//   });
// };
// export const updateCategory = async (authToken, id, values) => {
//   return await axios.put(path + "category/" + id, values, {
//     headers: {
//       authToken,
//     },
//   });
// };
