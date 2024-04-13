import React, { useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector(
    (state) => ({
      cart: state.cart,
      user: state.user,
    }),
    shallowEqual
  );

  const getTotal = () => {
    return cart.reduce((sumValue, currentValue) => {
      return (sumValue += currentValue.count * currentValue.price);
    }, 0);
  };
  const handleSaveOrder = () => {};
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">Table Cart</div>
        <div className="col-md-4">
          <h4>Summary</h4>
          <hr />
          {cart.map((item, index) => {
            return (
              <p key={index}>
                {item.title} x {item.count} = {item.price * item.count}
              </p>
            );
          })}
          <hr />
          <h4>
            Total <b>{getTotal()}</b>
          </h4>
          <hr />
          {user ? (
            <button
              onClick={handleSaveOrder}
              disabled={!cart.length}
              className="btn btn-success"
            >
              Check Out
            </button>
          ) : (
            <button onClick={() => {}} className="btn btn-danger">
              <Link to={"/login"} state={"cart"}>
                Login To Check Out
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
