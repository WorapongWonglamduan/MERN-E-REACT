import React, { useEffect, useMemo, useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import {
  listUsers,
  changeStatus,
  changeRole,
  deleteUser,
  resetPassword,
} from "../../../function/apiUsers";
import { useSelector } from "react-redux";
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { lastUpdateTime, thaiTime } from "../../../function/utils";

const ManageAdmin = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };

  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(memoizedUser.token, values.id, { values })
      .then(() => {
        loadData(memoizedUser.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData(memoizedUser.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadData = (authToken) => {
    listUsers(authToken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnchangeStatus = (e, id) => {
    const value = { id: id, enabled: e };

    changeStatus(memoizedUser.token, value)
      .then((res) => {
        console.log("res ->", res);
        loadData(memoizedUser.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnchangeRole = (e, id) => {
    const value = { id: id, role: e };

    changeRole(memoizedUser.token, value)
      .then((res) => {
        console.log("res ->", res);
        loadData(memoizedUser.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      deleteUser(memoizedUser.token, id)
        .then((res) => {
          console.log("res ->", res);
          loadData(memoizedUser.token);
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
          <table className="table">
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
                      <td>{thaiTime(createdAt)}</td>
                      <td>{lastUpdateTime(updatedAt)}</td>
                      <td>
                        <DeleteOutlined
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        />
                        <EditOutlined
                          onClick={() => {
                            showModal(item._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password</p>
            <input
              type="text"
              name="password"
              onChange={handleChangePassword}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
