import React, { useEffect, useState } from "react";
import { listProduct, searchFilters } from "../../function/apiProduct";
import ProductCard from "../../card/ProductCard";
// import { useSelector } from "react-redux";
import { Checkbox, Slider } from "antd";
import { listCategory } from "../../function/apiCategory";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();

  const text = location?.state?.text ?? "";

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState([1, 10000]);
  const [isPrice, setIsPrice] = useState(false);
  const [categorySelect, setCategorySelect] = useState([]);
  const [categories, setCategories] = useState([]);

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
    listCategory()
      .then((res) => {
        setCategories(res.data);
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
  const handleCheckBox = (e) => {
    let inCheck = e.target.value;

    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDataFilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!text) {
        loadData();
      } else {
        fetchDataFilter({ text: text });
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
            <hr />
            <h4>
              ค้นหาตามหมวดหมู่สินค้า
              {categories.map((item, index) => {
                return (
                  <Checkbox
                    key={index}
                    checked={categorySelect.find((f) => f === item._id)}
                    value={item._id}
                    onChange={handleCheckBox}
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
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
                    <div className="col-md-4 mt-3" key={item._id}>
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
