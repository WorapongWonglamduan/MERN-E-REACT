import React, { useEffect, useMemo, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { listProduct, deleteProduct } from "../../../function/apiProduct";
import { Spin } from "antd";
import AdminProductCard from "../../../card/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Home = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const countLoadProduct = 0;

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

  const handleDelete = (id) => {
    if (window.confirm("Delete Product ?")) {
      deleteProduct(memoizedUser.token, id)
        .then((res) => {
          loadData(countLoadProduct);
          toast.success("Deleted" + res.data.tile + "Success !!");
          console.log("red ==>", res);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Deleted Fail !!");
        });
    }
  };

  useEffect(() => {
    loadData(countLoadProduct);
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
                    <AdminProductCard
                      product={item}
                      handleDelete={handleDelete}
                    />
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
