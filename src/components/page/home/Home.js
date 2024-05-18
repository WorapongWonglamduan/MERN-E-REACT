import React from "react";
import BestSeller from "./BestSeller";
import NewProduct from "./NewProduct";

import Preview from "./Preview";
import Feature from "./Feature";
import FreshProduct from "./FreshProduct";
import Promotion from "./Promotion";
import BestSellerProduct from "./BestSellerProduct";

const Home = () => {
  return (
    <div>
      {/* preview  */}
      <Preview />

      {/* feature */}
      <Feature />
      {/* new product */}
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        สินค้ามาใหม่
      </h4>
      <NewProduct />
      <FreshProduct />
      <Promotion />

      {/* best seller */}
      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        สินค้าขายอย่างดี
      </h4> */}

      {/* <BestSeller /> */}
      <BestSellerProduct />
    </div>
  );
};

export default Home;
