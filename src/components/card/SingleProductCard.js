import React from "react";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const { Meta } = Card;
const SingleProductCard = ({ product }) => {
  const { _id, title, description, images, price, quantity, sold } = product;

  console.log("images ->", images);
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
      </div>
      <div className="col-md-5">
        <Card
          key={_id}
          actions={[
            <Link to={"/"}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </Link>,
            <>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              Add to cart,
            </>,
          ]}
        >
          <Meta title={title} description={description} />
          <p>detail,price</p>
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
