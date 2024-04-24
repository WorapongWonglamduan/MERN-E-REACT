import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const ProductTableInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      toast.error("Max available Quantity");
    } else {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.map((product) =>
        product._id === item._id ? { ...product, count } : product
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch({ type: "ADD_TO_CART", payload: updatedCart });
    }
  };

  const handleRemove = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((product) => product._id !== item._id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({ type: "ADD_TO_CART", payload: updatedCart });
  };

  return (
    <tbody>
      <tr>
        <td>
          <img src={item.images[0].url} width={"100"} alt="" />
        </td>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>
          <input
            onChange={handleChangeCount}
            className="form-control"
            value={item.count}
            type="number"
          />
        </td>
        <td>
          <DeleteOutlined onClick={handleRemove} className="text-danger" />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductTableInCart;
