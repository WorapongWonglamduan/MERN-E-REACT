import React, { useEffect, useState } from "react";
import { listProduct } from "../../function/apiProduct";
import ProductCard from "../../card/ProductCard";

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const count = 100;
  const loadData = () => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">Filter / Search</div>
          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger">Loading ...</h4>
            ) : (
              <h4 className="text-info">Product</h4>
            )}

            {product.length < 1 && <p>No Product found</p>}
            <div className="row">
              {product &&
                product.map((item, index) => {
                  return (
                    <div className="col-md-4 mt-3" key={index}>
                      <ProductCard product={item} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
