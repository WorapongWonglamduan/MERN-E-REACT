import axios from "axios";
import { path } from "./utils";

export const createCategory = async (values) => {
  return await axios.post(path + "category", values);
};
export const listCategory = async () => {
  return await axios.get(path + "category");
};
export const deleteCategory = async (id) => {
  return await axios.delete(path + "category/" + id);
};
export const editCategory = async (id) => {
  return await axios.get(path + "category/" + id);
};
export const updateCategory = async (id, values) => {
  return await axios.put(path + "category/" + id, values);
};
