import React from "react";
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
      let cart = [];
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, index) => {
        if (product._id === item._id) {
          return (cart[index].count = count);
        }
        return product;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };
  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product._id === item._id) {
        return cart.splice(index, 1);
      }
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: "ADD_TO_CART", payload: cart });
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
