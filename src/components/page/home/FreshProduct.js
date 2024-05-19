import React, { useEffect, useState } from "react";
// import { Img } from "../../../assets/img/hook-img";
import OwlCarousel from "react-owl-carousel";
import { listProductBy } from "../../function/apiProduct";
import { selectRandomObject } from "../../function/utils";
import useAddCartHook from "../../function/useAddCartHook";
import LoadingCard from "../../card/LoadingCard";

import "./custom.css";
const FreshProduct = () => {
  const { addCart } = useAddCartHook();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const sort = "createdAt";
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

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    // autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
  return (
    <>
      <div className="container-fluid vesitable py-5">
        <div className="container py-5">
          <h1 className="display-4 mb-5">New Products</h1>
          {loading ? (
            <div className="row">
              <LoadingCard count={3} />
            </div>
          ) : (
            <OwlCarousel
              className="owl-theme"
              navText={[
                '<div class="owl-prev btn border border-secondary rounded-pill px-3 text-primary"><i class="bi bi-arrow-left"/></div>',
                '<div class="owl-next btn border border-secondary rounded-pill px-3 text-primary"><i class="bi bi-arrow-right"/></div>',
              ]}
              {...options}
            >
              {product &&
                product.map((item, index) => {
                  const randomObject = selectRandomObject(item?.images);

                  const categoryName = item?.category?.name;
                  const productName = item?.title;
                  const productDescription = item?.description;
                  return (
                    <div
                      key={index}
                      className="border border-primary rounded position-relative vesitable-item item"
                    >
                      <div className="vesitable-img">
                        <img
                          src={randomObject?.secure_url}
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-primary px-3 py-1 rounded position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      >
                        {categoryName}
                      </div>
                      <div className="p-4 rounded-bottom">
                        <h4>{productName}</h4>
                        <p
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        >
                          {productDescription}
                        </p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-0 ">
                            $4.99 / kg
                          </p>
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
                  );
                })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </>
  );
};

export default FreshProduct;
