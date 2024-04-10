import React, { useEffect, useState } from "react";
import { listProductBy } from "../../function/apiProduct";
import ProductCard from "../../card/ProductCard";
import LoadingCard from "../../card/LoadingCard";
const BestSeller = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const sort = "sold";
  const order = "desc";
  const limit = 100;
  const loadData = () => {
    setLoading(true);
    listProductBy(sort, order, limit)
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
      <div className="container">
        <div className="row">
          {loading ? (
            <LoadingCard count={3} />
          ) : (
            <>
              {product &&
                product.map((item, index) => {
                  return (
                    <div className="col-md-4 mb-4" key={index}>
                      <ProductCard product={item} />
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
