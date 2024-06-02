import React, { /* useMemo, */ useEffect, useState } from "react";
import { Img } from "../../../assets/img/hook-img";
import { useNavigate } from "react-router-dom";
import { listProductBy } from "../../function/apiProduct";
import { selectRandomObject } from "../../function/utils";
// import { useDispatch, useSelector } from "react-redux";

const Preview = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  console.log("====================================");
  console.log("product->", product.length);
  console.log("====================================");

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

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop?" + text, { state: { text: text } });
  };

  const getRandomElements = (arr, count) => {
    return arr.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const ListRandomProduct = () => {
    const productRandom = getRandomElements(product, 4);

    console.log("====================================");
    console.log(productRandom);
    console.log("====================================");
    return (
      <div className="col-md-12 col-lg-5">
        <div
          id="carouselId"
          className="carousel slide position-relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" role="listbox">
            {productRandom &&
              productRandom.map((item, index) => {
                const randomObject = selectRandomObject(item?.images);

                return (
                  <div
                    key={index}
                    className={`carousel-item  ${
                      index === 0 ? "active" : ""
                    } rounded`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={randomObject?.secure_url}
                        className="img-fluid w-70 h-70 bg-secondary rounded"
                        alt="First slide"
                      />
                    </div>
                    <span className="btn px-4 py-2 text-white rounded">
                      Fruites
                    </span>
                  </div>
                );
              })}
            {/* <div className="carousel-item active rounded">
              <img
                src={Img.imgHero1}
                className="img-fluid w-100 h-100 bg-secondary rounded"
                alt="First slide"
              />
              <span className="btn px-4 py-2 text-white rounded ">Fruites</span>
            </div>
            <div className="carousel-item rounded">
              <img
                src={Img.imgHero2}
                className="img-fluid w-100 h-100 rounded"
                alt="Second slide"
              />
              <span className="btn px-4 py-2 text-white rounded">
                Vesitables
              </span>
            </div> */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-12 col-lg-7">
            <h4 className="mb-3 text-secondary">technology</h4>
            <h1 className="mb-5 display-3 text-primary">Computers & Gadgets</h1>
            <div className="position-relative mx-auto">
              <input
                className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                type="text"
                placeholder="Search"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                style={{ top: 0, right: "25%" }}
                onClick={handleSubmit}
              >
                Submit Now
              </button>
            </div>
          </div>
          <ListRandomProduct />
        </div>
      </div>
    </div>
  );
};

export default Preview;
