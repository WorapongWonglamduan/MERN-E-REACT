import React, { useEffect, /*  useMemo, */ useState } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";

import { Spin } from "antd";
import { useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { Tabs, Table } from "antd";
import { getOrdersAdmin, updateStatusOrder } from "../../../function/apiAdmin";
const Order = () => {
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);
  const [orders, setOrders] = useState([]);
  const [loading /* setLoading */] = useState(false);

  const loadData = () => {
    getOrdersAdmin(user.token)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeStatus = (orderId, orderStatus) => {
    updateStatusOrder(user.token, orderId, orderStatus)
      .then((res) => {
        toast.info("Updated " + res.data.order_status + "Success !!");
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusOrder = [
    { value: "Not Process", label: "Not Process" },
    { value: "Processing", label: "Processing" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Complete", label: "Complete" },
  ];

  const OrderCard = () => {
    return (
      <>
        {orders &&
          orders.map((item, index) => {
            return (
              <div key={index} className="card m-3">
                <p>
                  Order by : <b>{item.orderBy.username}</b>
                </p>
                Order{"    " + item.order_status}
                <select
                  style={{ width: "200px", alignSelf: "center" }}
                  className="form-control"
                  value={item.order_status}
                  onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                >
                  {statusOrder.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Price</td>
                      <td>Count</td>
                    </tr>
                  </thead>

                  <tbody>
                    {item.products &&
                      item.products.map((p, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{p?.product?.title}</td>
                            <td>{p.price}</td>
                            <td>{p.count}</td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td colSpan={3}>
                        ราคาสุทธิ :{" "}
                        <b>
                          <u>{item.cartTotal}</u>
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
      </>
    );
  };

  const columns = [
    {
      title: "ชื่อผู้ใช้",
      render: (item, index) => <div key={index}>{item.orderBy.username}</div>,
    },

    {
      title: "รายการสินค้า",
      render: (item, index) => (
        <ol key={index}>
          {item.products.map((p, idx) => (
            <li key={idx}>
              {p?.product?.title}{" "}
              <b>
                {p.count} x {p.price}
              </b>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "ราคารวมสุทธิ",
      dataIndex: "cartTotal",
      key: "cartTotal",
    },
    {
      title: "สถานะ",
      render: (item) => (
        <select
          style={{ width: "200px", alignSelf: "center" }}
          className="form-control"
          value={item.order_status}
          onChange={(e) => handleChangeStatus(item._id, e.target.value)}
        >
          {statusOrder.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      ),
    },
  ];

  const TableBS = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ชื่อผู้ใช้</th>
            <th scope="col">รายการสินค้า</th>
            <th scope="col">ราคารวมสุทธิ</th>
            <th scope="col">สถานะ</th>
            <th scope="col">อัพเดทสถานะ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{item.orderBy.username}</th>
                <td>
                  <ol>
                    {item.products.map((p, idx) => {
                      return (
                        <li key={idx}>
                          {p?.product?.title ?? "unknown product"}
                          {" : "}
                          <b>
                            {p.price} x {p.count}
                          </b>
                        </li>
                      );
                    })}
                  </ol>
                </td>
                <td>{item.cartTotal}</td>
                <td>{item.order_status}</td>
                <td>
                  <select
                    style={{ width: "200px", alignSelf: "center" }}
                    className="form-control"
                    value={item.order_status}
                    onChange={(e) =>
                      handleChangeStatus(item._id, e.target.value)
                    }
                  >
                    {statusOrder.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const itemsTabs = [
    {
      key: "1",
      label: "Tab 1",
      children: <OrderCard />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: <Table dataSource={orders} columns={columns} />,
    },
    {
      key: "3",
      label: "Tab 3",
      children: <TableBS />,
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col text-center">
          <div className="row">
            {loading ? (
              <h1>
                Loading ... <Spin />
              </h1>
            ) : (
              <h1>Order Admin</h1>
            )}
            <Tabs defaultActiveKey="1" items={itemsTabs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
