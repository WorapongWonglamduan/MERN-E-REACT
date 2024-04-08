import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, _id } = product;
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
        <ShoppingCartOutlined className="text-danger" />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default ProductCard;
