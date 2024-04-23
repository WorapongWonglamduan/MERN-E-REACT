import React, { useEffect, useMemo, useState } from "react";

import { Spin } from "antd";
import AdminProductCard from "../../../card/AdminProductCard";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MenubarUser from "../../../layout/MenubarUser";
import { getOrders } from "../../../function/apiUsers";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../../order/invoice/Invoice";

const History = () => {
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        console.log("res=>", res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>
        <div className="co text-center">
          <div className="row">
            {loading ? (
              <h1>
                Loading ... <Spin />
              </h1>
            ) : (
              <h1>History Page</h1>
            )}
            {orders.map((item, index) => {
              return (
                <div key={index} className="card m-3">
                  Order{"    " + item.order_status}
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Count</td>
                      </tr>
                    </thead>

                    <tbody>
                      {item &&
                        item.products.map((p, idx) => {
                          const productName =
                            p?.product && p?.product?.title
                              ? p?.product?.title
                              : "Unknown Product";
                          return (
                            <tr key={idx}>
                              <td>{productName}</td>
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
                  {/* PDF */}
                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        key={index}
                        className="btn btn-primary m-1"
                        document={<Invoice order={item} />}
                        fileName="invoice.pdf"
                      >
                        PDF Download
                      </PDFDownloadLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
