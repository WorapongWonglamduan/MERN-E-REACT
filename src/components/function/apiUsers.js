import axios from "axios";
import { path } from "./utils";

export const listUsers = async (authtoken) => {
  return await axios.get(path + "users", {
    headers: {
      authtoken,
    },
  });
};
