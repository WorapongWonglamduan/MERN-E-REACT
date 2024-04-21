import axios from "axios";
import { path } from "./utils";

export const updateStatusOrder = async (authToken, orderId, orderStatus) => {
  return await axios.put(
    path + "admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getOrdersAdmin = async (authToken) => {
  return await axios.get(path + "admin/orders", {
    headers: {
      authToken,
    },
  });
};
