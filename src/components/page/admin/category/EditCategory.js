import React, { useEffect, useMemo, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { editCategory, updateCategory } from "../../../function/apiCategory";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const EditCategory = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);
  const navigate = useNavigate();
  const param = useParams();
  const [name, setName] = useState("");

  const loadData = (authToken, id) => {
    editCategory(authToken, id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(memoizedUser.token, param.id, { name })
      .then((res) => {
        navigate("/admin/create-category");
        toast.success("Update " + res.data.name + " Success !!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData(memoizedUser.token, param.id);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>Edit Category</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Update Category</label>
              <input
                className="form-control"
                type="text"
                value={name}
                name="name"
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-outline-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
