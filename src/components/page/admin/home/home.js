import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { listProduct } from "../../../function/apiProduct";
import { Spin } from "antd";
import AdminProductCard from "../../../card/AdminProductCard";
const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        console.log("res ==>", res);
        setProduct(res.data);
        setLoading(false);
      })
      .then((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData(5);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          {loading ? (
            <h1>
              Loading ... <Spin />
            </h1>
          ) : (
            <h1>Home Admin</h1>
          )}
          <div className="row">
            {product &&
              product.map((item) => {
                return (
                  <div className="col-md-4 mb-4" key={item._id}>
                    <AdminProductCard product={item} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
