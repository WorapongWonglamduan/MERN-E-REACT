import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { title, description, images, _id } = product;

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...product, count: 1 });
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({ type: "ADD_TO_CART", payload: unique });
    dispatch({ type: "DRAWER_VISIBLE", payload: true });
  };
  return (
    <Card
      key={_id}
      hoverable
      style={{ objectFit: "contain" }}
      cover={
        <img
          className="p-1"
          style={{ height: "150px", objectFit: "contain" }}
          alt="example"
          src={images && images.length ? images[0].url : ""}
        />
      }
      actions={[
        <Link to={"/product/" + _id}>
          <EyeOutlined className="text-warning" />
        </Link>,
        <ShoppingCartOutlined
          onClick={handleAddToCart}
          className="text-danger"
        />,
      ]}
    >
      {
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </div>
      }

      {
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </div>
      }
    </Card>
  );
};

export default ProductCard;
