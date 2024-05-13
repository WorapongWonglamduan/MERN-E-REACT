import React, { useEffect, useState } from "react";
import { Img } from "../../../assets/img/hook-img";
import { listProductBy } from "../../function/apiProduct";
import useAddCartHook from "../../function/useAddCartHook";

const BestSellerProduct = () => {
  const addCart = useAddCartHook();
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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const selectRandomObject = (array) => {
    const shuffledArray = shuffleArray(array);
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    return shuffledArray[randomIndex];
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div
          className="text-center mx-auto mb-5"
          /* style="max-width: 700px;" */ style={{ maxWidth: "700px" }}
        >
          <h1 className="display-4">Bestseller Products</h1>
          <p>
            Latin words, combined with a handful of model sentence structures,
            to generate Lorem Ipsum which looks reasonable.
          </p>
        </div>
        <div className="row g-4">
          {product &&
            product.map((item, index) => {
              const randomObject = selectRandomObject(item?.images);

              console.log("randomObject --->", randomObject);
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
                        <a href="#" className="h5">
                          {item?.title}
                        </a>
                        <div className="d-flex my-3">
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h4 className="mb-3">{item?.price} $</h4>
                        <a
                          href=""
                          className="btn border border-secondary rounded-pill px-3 text-primary"
                          onClick={() => {
                            addCart({ product: item });
                          }}
                        >
                          <i className="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* <div className="col-lg-6 col-xl-4">
            <div className="p-4 rounded bg-light">
              <div className="row align-items-center">
                <div className="col-6">
                  <img
                    src={Img.imageBestProduct2}
                    className="img-fluid rounded-circle w-100"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <a href="#" className="h5">
                    Organic Tomato
                  </a>
                  <div className="d-flex my-3">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4">
            <div className="p-4 rounded bg-light">
              <div className="row align-items-center">
                <div className="col-6">
                  <img
                    src={Img.imageBestProduct3}
                    className="img-fluid rounded-circle w-100"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <a href="#" className="h5">
                    Organic Tomato
                  </a>
                  <div className="d-flex my-3">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4">
            <div className="p-4 rounded bg-light">
              <div className="row align-items-center">
                <div className="col-6">
                  <img
                    src={Img.imageBestProduct4}
                    className="img-fluid rounded-circle w-100"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <a href="#" className="h5">
                    Organic Tomato
                  </a>
                  <div className="d-flex my-3">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4">
            <div className="p-4 rounded bg-light">
              <div className="row align-items-center">
                <div className="col-6">
                  <img
                    src={Img.imageBestProduct5}
                    className="img-fluid rounded-circle w-100"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <a href="#" className="h5">
                    Organic Tomato
                  </a>
                  <div className="d-flex my-3">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4">
            <div className="p-4 rounded bg-light">
              <div className="row align-items-center">
                <div className="col-6">
                  <img
                    src={Img.imageBestProduct6}
                    className="img-fluid rounded-circle w-100"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <a href="#" className="h5">
                    Organic Tomato
                  </a>
                  <div className="d-flex my-3">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="text-center">
              <img src={Img.imgFruite1} className="img-fluid rounded" alt="" />
              <div className="py-4">
                <a href="#" className="h5">
                  Organic Tomato
                </a>
                <div className="d-flex my-3 justify-content-center">
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="mb-3">3.12 $</h4>
                <a
                  href="#"
                  className="btn border border-secondary rounded-pill px-3 text-primary"
                >
                  <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                  to cart
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="text-center">
              <img src={Img.imgFruite2} className="img-fluid rounded" alt="" />
              <div className="py-4">
                <a href="#" className="h5">
                  Organic Tomato
                </a>
                <div className="d-flex my-3 justify-content-center">
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="mb-3">3.12 $</h4>
                <a
                  href="#"
                  className="btn border border-secondary rounded-pill px-3 text-primary"
                >
                  <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                  to cart
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="text-center">
              <img src={Img.imgFruite3} className="img-fluid rounded" alt="" />
              <div className="py-4">
                <a href="#" className="h5">
                  Organic Tomato
                </a>
                <div className="d-flex my-3 justify-content-center">
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="mb-3">3.12 $</h4>
                <a
                  href="#"
                  className="btn border border-secondary rounded-pill px-3 text-primary"
                >
                  <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                  to cart
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="text-center">
              <img src={Img.imgFruite4} className="img-fluid rounded" alt="" />
              <div className="py-4">
                <a href="#" className="h5">
                  Organic Tomato
                </a>
                <div className="d-flex my-3 justify-content-center">
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="mb-3">3.12 $</h4>
                <a
                  href="#"
                  className="btn border border-secondary rounded-pill px-3 text-primary"
                >
                  <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                  to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProduct;
