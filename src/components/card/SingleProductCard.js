import React from "react";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { addToWishlist } from "../function/apiUsers";
// const { Meta } = Card;
// const { TabPane } = Tabs;
const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);
  const { _id, title, description, images, price, quantity, sold, category } =
    product;

  const itemsTabs = [
    {
      key: "1",
      label: "Description",
      children: description,
    },
    {
      key: "2",
      label: " More ...",
      children: " More ...",
    },
  ];

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

  const handleAddToWishlist = (_id) => {
    if (user) {
      addToWishlist(user.token, _id)
        .then((res) => {
          toast.success("Add To Wishlist Success !!");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Go To Login !!");
      return;
    }
  };
  return (
    <>
      <div className="col-md-7">
        <Carousel autoPlay showArrows infiniteLoop>
          {images &&
            images.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.url} alt="" />
                </div>
              );
            })}
        </Carousel>

        <Tabs defaultActiveKey="1" items={itemsTabs} />
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          key={_id}
          actions={[
            <div onClick={() => handleAddToWishlist(_id)}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </div>,
            <>
              <ShoppingCartOutlined
                onClick={handleAddToCart}
                className="text-danger"
              />
              <br />
              Add to cart,
            </>,
          ]}
        >
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Price
              <span className="float-end">{price}</span>
            </li>
            <li className="list-group-item">
              Quantity
              <span className="float-end">{quantity}</span>
            </li>
            <li className="list-group-item">
              Sold
              <span className="float-end">{sold}</span>
            </li>
            {category && (
              <li className="list-group-item">
                Category
                <span className="float-end">{category.name}</span>
              </li>
            )}
          </ul>
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
