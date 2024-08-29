import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Admin() {
  const [orderData, setorderData] = useState({});
  const fetchAllOrders = async () => {
    await fetch(`${BASE_URL}/api/allOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <div>
        <div>
          {localStorage.getItem("isAdmin") === "true" ? (
            <div>
              <div>
                <Navbar />
              </div>
              <div className="container row">
                <h1 className="text-center mt-4">All Orders</h1>
                {orderData.orderData &&
                Array.isArray(orderData.orderData) &&
                orderData.orderData.length > 0 ? (
                  orderData.orderData
                    .slice()
                    .reverse()
                    .map((order, index) => (
                      <div key={index} className="col-12">
                        <h4 className="mt-3">Email: {order.email}</h4>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <div className="order-details mb-4">
                          <h4>Order Data:</h4>
                          {order.order_data.map((dataItem, dataIndex) => (
                            <div key={dataIndex} className="mb-3">
                              {Array.isArray(dataItem) ? (
                                dataItem.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="card mt-2"
                                    style={{ width: "18rem" }}
                                  >
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {item.name}
                                      </h5>
                                      <p className="card-text">
                                        Quantity: {item.qty} <br />
                                        Size: {item.size} <br />
                                        Price: ₹{item.price}/-
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div
                                  className="card mt-2"
                                  style={{ width: "18rem" }}
                                >
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {dataItem.name}
                                    </h5>
                                    <p className="card-text">
                                      Quantity: {dataItem.qty} <br />
                                      Size: {dataItem.size} <br />
                                      Price: ₹{dataItem.price}/-
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80px",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      No Orders
                    </h1>
                  </div>
                )}
              </div>
              <div>
                <Footer />
              </div>
            </div>
          ) : (
            <p>Not an admin</p>
          )}
        </div>
      </div>
    </>
  );
}
