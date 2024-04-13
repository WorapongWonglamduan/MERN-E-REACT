import React, { useEffect, useMemo, useState } from "react";
import { listProduct, searchFilters } from "../../function/apiProduct";
import ProductCard from "../../card/ProductCard";
import { useSelector } from "react-redux";
import { Slider } from "antd";

const Shop = () => {
  const search = useSelector((state) => state.search);
  const memoizedSearch = useMemo(() => search, [search]);

  const { text } = memoizedSearch;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState([1, 10000]);
  const [isPrice, setIsPrice] = useState(false);

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

  const fetchDataFilter = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!text) {
        loadData();
      } else {
        fetchDataFilter({ query: text });
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  const handlePrice = (e) => {
    setPrice(e);

    setTimeout(() => {
      setIsPrice(!isPrice);
    }, 300);
  };

  useEffect(() => {
    fetchDataFilter({ price });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPrice]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            Filter / Search
            <hr />
            <h4>
              ค้นหาสินค้า
              <Slider
                onChange={handlePrice}
                range
                value={[price[0], price[1]]}
                max={100000}
              />
            </h4>
          </div>
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
