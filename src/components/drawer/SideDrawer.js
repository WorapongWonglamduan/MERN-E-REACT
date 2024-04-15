import React from "react";
import { Drawer } from "antd";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector(
    (state) => ({
      cart: state.cart,
      drawer: state.drawer,
    }),
    shallowEqual
  );
  const onCloseDrawer = () => {
    dispatch({ type: "DRAWER_VISIBLE", payload: false });
  };
  return (
    <Drawer
      title={"Cart " + cart.length + " product"}
      onClose={onCloseDrawer}
      placement="right"
      open={drawer}
    >
      {cart.map((item, index) => {
        return (
          <div className="row" key={index}>
            <div className="col">
              <img
                src={item.images[0].url}
                style={{ width: "100%", height: "50%", objectFit: "cover" }}
                alt=""
              />
              <p className="text-center bg-secondary text-light">
                {item.title} x {item.count}
              </p>
            </div>
          </div>
        );
      })}
      <Link onClick={onCloseDrawer} to={"/cart"}>
        <button className="text-center btn btn-primary">Go To Cart</button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
