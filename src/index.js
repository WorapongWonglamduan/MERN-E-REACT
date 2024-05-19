import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//css
// import "bootstrap/dist/css/bootstrap.min.css";
// import "antd/dist/antd.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducers from "./components/reducers";

//Route
import { BrowserRouter } from "react-router-dom";
const store = createStore(rootReducers);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
