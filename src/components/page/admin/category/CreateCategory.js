import React, { useState, useEffect, useMemo } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../function/apiCategory";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const CreateCategory = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);
  const [values, setValues] = useState({ name: "" });
  const [category, setCategory] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(memoizedUser.token, values)
      .then((res) => {
        loadData(memoizedUser.token);
        toast.success("Insert Data " + res.data.name + " Success !!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadData = (authToken) => {
    listCategory(authToken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deleteCategory(memoizedUser.token, id)
      .then((res) => {
        loadData(memoizedUser.token);
        toast.success("Remove Data " + res.data.name + " Success !!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
