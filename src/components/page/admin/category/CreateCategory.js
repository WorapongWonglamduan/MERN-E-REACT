import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../function/apiCategory";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [values, setValues] = useState({ name: "" });
  const [category, setCategory] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(values)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = () => {
    listCategory()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deleteCategory(id)
      .then((res) => {
        loadData();
        console.log("res=>", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>CreateCategory</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่</label>
              <input
                type="text"
                name={"name"}
                className="form-control"
                onChange={handleChange}
              />
              <button className="btn btn-outline-primary">เพิ่ม</button>
            </div>
          </form>
          <hr />
          <ul className="list-group">
            {category &&
              category.map((item, index) => {
                const name = item.name;
                return (
                  <li key={index} className="list-group-item ">
                    {name}
                    <span
                      style={{ float: "right" }}
                      className="badge bg-primary rounded-pill pointer-cursor"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      x
                    </span>
                    <span
                      style={{ float: "right" }}
                      className="badge bg-primary rounded-pill pointer-cursor"
                    >
                      <Link to={`/admin/edit-category/${item._id}`}> Edit</Link>
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
