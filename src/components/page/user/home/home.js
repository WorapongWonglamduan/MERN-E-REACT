import React, { useEffect, useMemo, useState } from "react";

import { Spin } from "antd";
import AdminProductCard from "../../../card/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MenubarUser from "../../../layout/MenubarUser";
const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>
        <div className="col">
          {loading ? (
            <h1>
              Loading ... <Spin />
            </h1>
          ) : (
            <h1>Home User</h1>
          )}
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
