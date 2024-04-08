import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;
const AdminProductCard = ({ product, handleDelete }) => {
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
        <Link to={"/admin/edit-product/" + _id}>
          <EditOutlined key="edit" className="text-warning" />
        </Link>,
        <DeleteOutlined
          key="delete"
          className="text-danger"
          onClick={() => {
            handleDelete(_id);
          }}
        />,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
