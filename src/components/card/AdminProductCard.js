import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;
const AdminProductCard = ({ product }) => {
  const { title, description, images, _id } = product;
  return (
    <Card
      key={_id}
      hoverable
      style={{ objectFit: "contain" }}
      cover={
        <img
          style={{ height: "150px", objectFit: "contain" }}
          alt="example"
          src={images && images.length ? images[0].url : ""}
        />
      }
      actions={[
        <EditOutlined key="edit" className="text-warning" />,
        <DeleteOutlined key="delete" className="text-danger" />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
