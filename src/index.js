import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//css
import "bootstrap/dist/css/bootstrap.min.css";
// import "antd/dist/antd.css";

//Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./components/reducers";

//Route
import { BrowserRouter } from "react-router-dom";
const store = createStore(rootReducers, composeWithDevTools());
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
