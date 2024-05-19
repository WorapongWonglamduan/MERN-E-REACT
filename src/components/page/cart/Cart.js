import React, { /* memo, */ useMemo } from "react";
import { /* useDispatch, */ useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductTableInCart from "./ProductTableInCart";
import { userCart } from "../../function/apiUsers";

const Cart = () => {
  const navigate = useNavigate();
  const { user, cart: cartReduce } = useSelector(
    (state) => ({
      cart: state.cart,
      user: state.user,
    }),
    shallowEqual
  );
  const cart = useMemo(() => cartReduce, [cartReduce]);

  const getTotal = () => {
    return cart.reduce((sumValue, currentValue) => {
      return (sumValue += currentValue.count * currentValue.price);
    }, 0);
  };
  const handleSaveOrder = () => {
    userCart(user.token, { cart: cart })
      .then((res) => {
        console.log("res ==>", res);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Memoized CartItemTable component
  const CartItemTable = useMemo(() => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <td>Image</td>
            <td>Title</td>
            <td>Price</td>
            <td>Count</td>
            <td>Remove</td>
          </tr>
        </thead>

        {cart.map((item) => {
          return <ProductTableInCart item={item} key={item._id} />;
        })}
      </table>
    );
  }, [cart]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} product</h4>
          {!cart.length ? <p>No product in cart</p> : CartItemTable}
        </div>
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
