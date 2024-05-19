import React, { useEffect, useState } from "react";
// import { Img } from "../../../assets/img/hook-img";
import { listProductBy } from "../../function/apiProduct";
import useAddCartHook from "../../function/useAddCartHook";
import { Link } from "react-router-dom";
import { selectRandomObject } from "../../function/utils";

const BestSellerProduct = () => {
  const { addCart } = useAddCartHook();
  const [, /* loading */ setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const sort = "sold";
  const order = "desc";
  const limit = 6;
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

  const getRandomElements = (arr, count) => {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const ListRandomProduct = () => {
    const productRandom = getRandomElements(product, 4);

    return (
      productRandom &&
      productRandom.map((item, index) => {
        const randomObject = selectRandomObject(item?.images);

        return (
          <div key={index} className="col-md-6 col-lg-6 col-xl-3">
            <div className="text-center">
              <img
                src={randomObject?.secure_url}
                className="img-fluid rounded"
                alt=""
              />
              <div className="py-4">
                <Link to={"/product/" + item?._id} className="h5">
                  {item?.title}
                </Link>
                <div className="d-flex my-3 justify-content-center">
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="mb-3">{item?.price} $</h4>
                <button
                  className="btn border border-secondary rounded-pill px-3 text-primary"
                  onClick={() => {
                    addCart({ product: item });
                  }}
                >
                  <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                  to cart
                </button>
              </div>
            </div>
          </div>
        );
      })
    );
  };
  const ListBestProduct = () => {
    return (
      <>
        {product &&
          product.map((item, index) => {
            const randomObject = selectRandomObject(item?.images);
            return (
              <div key={index} className="col-lg-6 col-xl-4">
                <div className="p-4 rounded bg-light">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <img
                        src={randomObject?.secure_url}
                        className="img-fluid rounded-circle w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-6">
                      <Link to={"/product/" + item?._id} className="h5">
                        {item?.title}
                      </Link>
                      <div className="d-flex my-3">
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star text-primary"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <h4 className="mb-3">{item?.price} $</h4>
                      <button
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                        onClick={() => {
                          addCart({ product: item });
                        }}
                      >
                        <i className="fa fa-shopping-bag me-2 text-primary"></i>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <h1 className="display-4">Bestseller Products</h1>
          <p>
            Latin words, combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>
        </div>
        <div className="row g-4">
          <ListBestProduct />
          <ListRandomProduct />
        </div>
      </div>
    </div>
  );
};

export default BestSellerProduct;
