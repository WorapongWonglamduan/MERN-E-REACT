import React, { useEffect, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import {
  listUsers,
  changeStatus,
  changeRole,
  deleteUser,
} from "../../../function/apiUsers";
import { useSelector } from "react-redux";
import { Switch, Select, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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

  const handleOnchangeStatus = (e, id) => {
    const value = { id: id, enabled: e };

    changeStatus(user.token, value)
      .then((res) => {
        console.log("res ->", res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnchangeRole = (e, id) => {
    const value = { id: id, role: e };

    changeRole(user.token, value)
      .then((res) => {
        console.log("res ->", res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      deleteUser(user.token, id)
        .then((res) => {
          console.log("res ->", res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const dataRole = ["admin", "user"];

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
                <th scope="col">action</th>
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
                      <th scope="row">{username}</th>
                      <td>
                        <Select
                          style={{ width: "100%" }}
                          value={role}
                          onChange={(e) => {
                            handleOnchangeRole(e, item._id);
                          }}
                        >
                          {dataRole &&
                            dataRole.map((item, index) => {
                              return (
                                <Select.Option value={item} key={index}>
                                  <Tag
                                    color={item === "admin" ? "red" : "yellow"}
                                  >
                                    {item}
                                  </Tag>
                                </Select.Option>
                              );
                            })}
                        </Select>
                      </td>
                      <td>
                        <Switch
                          checked={status}
                          onChange={(e) => {
                            handleOnchangeStatus(e, item._id);
                          }}
                        />
                        {status}
                      </td>
                      <td>{createdAt}</td>
                      <td>{updatedAt}</td>
                      <td>
                        <DeleteOutlined
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        />
                      </td>
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
