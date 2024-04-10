import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editProduct } from "../../function/apiProduct";
import SingleProductCard from "../../card/SingleProductCard";

const Product = () => {
  const param = useParams();
  const { id } = param;

  const [product, setProduct] = useState({});
  const loadData = (id) => {
    editProduct(id)
      .then((res) => {
        console.log("res==>", res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProductCard product={product} />
      </div>
      <div className="row"></div>
    </div>
  );
};

export default Product;
