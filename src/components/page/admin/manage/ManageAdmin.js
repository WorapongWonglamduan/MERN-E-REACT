import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { listUsers } from "../../../function/apiUsers";
import { useSelector } from "react-redux";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  console.log("user ->", user);
  const [data, setData] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listUsers(user.token)
      .then((res) => {
        console.log("res ==>", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>Manage Admin</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
