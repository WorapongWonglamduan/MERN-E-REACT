import { useDispatch } from "react-redux";
import _ from "lodash";
const useAddCartHook = () => {
  const dispatch = useDispatch();
  const addCart = ({ product }) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...product, count: 1 });
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({ type: "ADD_TO_CART", payload: unique });
    dispatch({ type: "DRAWER_VISIBLE", payload: true });
  };
  return { addCart };
};
export default useAddCartHook;
