import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { listUsers, changeStatus } from "../../../function/apiUsers";
import { useSelector } from "react-redux";
import { Switch } from "antd";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [data, setData] = useState([]);
  useEffect(() => {
    loadData(user.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadData = (authtoken) => {
    listUsers(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("data ->", data);

  const handleOnchange = (e, id) => {
    const value = { id: id, enabled: e };

    changeStatus(user.token, value)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
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
                <th scope="col">username</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">created</th>
                <th scope="col">updated</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  const count = index + 1;
                  const username = item.username;
                  const role = item.role;
                  const status = item.enabled;
                  const createdAt = item.createdAt;
                  const updatedAt = item.updatedAt;
                  return (
                    <tr key={count}>
                      <th scope="row">{count}</th>
                      <td>{username}</td>
                      <td>{role}</td>
                      <td>
                        <Switch
                          checked={status}
                          onChange={(e) => {
                            handleOnchange(e, item._id);
                          }}
                        />
                        {status}
                      </td>
                      <td>{createdAt}</td>
                      <td>{updatedAt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
