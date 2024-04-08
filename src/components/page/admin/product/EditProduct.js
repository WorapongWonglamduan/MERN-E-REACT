import React, { useEffect, useMemo, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { Spin } from "antd";
import { editProduct, updateProduct } from "../../../function/apiProduct";
import { useParams, useNavigate } from "react-router-dom";
import { listCategory } from "../../../function/apiCategory";
import { useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};
const EditProduct = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;

  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);

  const loadData = (authToken, id) => {
    editProduct(authToken, id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    listCategory(authToken)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(memoizedUser.token, id, values)
      .then((res) => {
        toast.success("Insert Data " + res.data.title + " Success !!");
        navigate("/admin/index");
        // loadData(memoizedUser.token, id);
      })
      .catch((err) => {
        toast.error("Update Fail !!");
        console.log(err);
      });
  };
  useEffect(() => {
    loadData(memoizedUser.token, id);
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
            <h1>Update Products</h1>
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
                value={values.category._id}
                required
              >
                <option>Please Select</option>
                {categories.length > 0 &&
                  categories.map((item, index) => (
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

export default EditProduct;
