import React, { useEffect, useMemo, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../../function/apiProduct";
import { listCategory } from "../../../function/apiCategory";
import FileUpload from "./FileUpload";
import { Spin } from "antd";

const initialState = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};
const CreateProduct = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(memoizedUser.token, values)
      .then((res) => {
        toast.success("Insert Data " + res.data.title + " Success !!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  const loadData = (authToken) => {
    listCategory(authToken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("values ->", values);
  useEffect(() => {
    loadData(memoizedUser.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          {loading ? (
            <h1>
              Loading ... <Spin />
            </h1>
          ) : (
            <h1>Create Product</h1>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={values.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={values.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
            <button className="btn btn-outline-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
