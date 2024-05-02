import React from "react";
import BestSeller from "./BestSeller";
import NewProduct from "./NewProduct";
import { shallowEqual, useSelector } from "react-redux";
import Preview from "./Preview";

const Home = () => {
  return (
    <div>
      {/* preview  */}
      <Preview />
      {/* new product */}
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        สินค้ามาใหม่
      </h4>
      <NewProduct />

      {/* best seller */}
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        สินค้าขายอย่างดี
      </h4>

      <BestSeller />
    </div>
  );
};

export default Home;
