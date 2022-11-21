import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../../config/config";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${config.URL}/api/v1/user/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setOrders(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div
      className="container-lg  text-center mt-2"
      style={{ border: "1px solid black" }}
    >
      {orders.map((order) => {
        return (
          <div
            className="row my-3 mx-3 px-4 py-4"
            style={{ border: "1px solid black" }}
          >
            <div className="col">
              <img
                src={order.order.image}
                style={{ maxHeight: "15vh", maxWidth: "15vw" }}
                alt="order phone, laptop, tv"
              />
            </div>
            <div className="col mx-5">
              <div className="mb-3 mt-2 h5">{order.order.name}</div>
              <div>Rs. {order.order.price}</div>
            </div>
            <div className="col d-flex flex-column mx-5">
              <div className="mx-4 mt-3 lead">Order Id</div>
              <div className="mx-5">#{order.orderId}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;
