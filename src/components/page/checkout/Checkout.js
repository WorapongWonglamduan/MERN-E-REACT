import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getUserCart, saveAddress } from "../../function/apiUsers";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Checkout = () => {
  const { user } = useSelector(
    (state) => ({
      user: state.user,
    }),
    shallowEqual
  );

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const loadData = () => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPrice(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSavedAddress = () => {
    saveAddress(user.token, address)
      .then((res) => {
        console.log("res==>", res);
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
        <div className="col">
          <h4>Address</h4>
          <br />
          text area
          <ReactQuill value={address} onChange={setAddress} />
          <button className="btn btn-primary m-2" onClick={handleSavedAddress}>
            Save Address
          </button>
        </div>
        <div className="col">
          Order Summary
          <hr />
          <b>Product : {products.length}</b>
          <hr />
          <p>List of product</p>
          {products.map((item) => {
            return (
              <div key={item.product._id}>
                <p>
                  {item.product.title} x {item.count} = {item.price}
                </p>
              </div>
            );
          })}
          <hr />
          Total : <b>{totalPrice}</b>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
