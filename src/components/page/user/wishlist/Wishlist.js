import React, { useEffect, useState } from "react";
import MenubarUser from "../../../layout/MenubarUser";
import { getWishlist, removeWishlist } from "../../../function/apiUsers";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);
  const loadData = () => {
    getWishlist(user.token)
      .then((res) => {
        console.log("res=>", res);
        setWishlist(res.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (productId) => {
    removeWishlist(user.token, productId)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>
        <div className="col">
          <div className="row">
            <h4>Wishlist Page</h4>
            {wishlist.length &&
              wishlist.map((item, index) => {
                return (
                  <div className="alert alert-secondary" key={index}>
                    <Link to={"/product/" + item._id}>{item.title}</Link>

                    <span
                      onClick={() => handleRemove(item._id)}
                      style={{ float: "right" }}
                    >
                      ลบ
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
