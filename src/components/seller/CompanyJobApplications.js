import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  getSellerOrders,
  getItems,
  setOrderStatus,
  assignDriverToOrder,
  getLocations,
  postMessage,
  getMessages,
} from "../../util/fetch/api";
import { formatDate } from "../../util";
import MapContainer from "../customer/MapContainer";
import { Divider, Grid, CircularProgress, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";

const SellerOrders = () => {
  const [orders, setOrders] = useState({});
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const [areMessagesVisible, setAreMessagesVisible] = useState(false);
  const [currentOrderIdForMessaging, setCurrentOrderIdForMessaging] = useState(
    null
  );
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);

  const [isMapEnabled, setIsMapEnabled] = useState(false);

  const statusRef = useRef({});

  useEffect(() => {
    (async () => {
      const sellerItems = await getItems();
      const sellerOrders = await getSellerOrders();
      setItems(sellerItems);
      setOrders(_.groupBy(sellerOrders, "item._id"));
    })();
  }, []);

  const sendMessage = async () => {
    await postMessage({
      orderId: currentOrderIdForMessaging,
      newMessage: currentMessage,
    });
    setCurrentMessage("");
  };

  const fetchMessages = async (jobId) => {
    const messages = await getMessages(jobId);
    console.log(messages);
    setCurrentMessages(messages.messages);
  };

  const handleOnChangeStatus = async (id) => {
    const status = statusRef.current[id].value;
    await setOrderStatus(id, { status });
    window.alert("Status updated.");
  };

  const assignDriver = async (id) => {
    await assignDriverToOrder(id);
  };

  const enableMap = (jobId) => {
    setIsMapEnabled(true);
    const interval = setInterval(async () => {
      const locations = await getLocations();
      setLocation(locations.location[locations.location.length - 1]);
    }, 10000);
    return () => clearInterval(interval);
  };

  const enableMessages = (order) => {
    setAreMessagesVisible(true);
    setCurrentOrderIdForMessaging(order._id);
    setCurrentOrder(order);
    const interval = setInterval(async () => {
      fetchMessages(order._id);
    }, 5000);
    return () => clearInterval(interval);
  };
  const userId = localStorage.getItem("userId");

  const renderCurrentMessage = (message, userId) => {
    console.log(message, userId);
    return (
      <div style={{ padding: "10px", width: "100%", marginBottom: "20px" }}>
        <div
          style={
            message.sender === userId ? { float: "left" } : { float: "right" }
          }
        >
          {" "}
          {message.sender !== userId
            ? new Date(message.timestamp).getHours() +
            ":" +
            new Date(message.timestamp).getMinutes() +
            "  "
            : null}{" "}
          {message.message}{" "}
          {message.sender === userId
            ? "   " +
            new Date(message.timestamp).getHours() +
            ":" +
            new Date(message.timestamp).getMinutes()
            : null}
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Product orders</h6>
        {items.length === 0 && <div>You have not got any orders yet</div>}
        {items.map((jp) => {
          return (
            <div key={jp._id} className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <span>
                    <span className="inputLabel">Product name</span>
                    {jp.title}
                  </span>
                  <span>
                    {" "}
                    (has{" "}
                    {orders[jp._id]
                      ? orders[jp._id].length
                      : "no"}{" "}
                    orders)
                  </span>
                </div>
                {orders[jp._id] ? (
                  <div>
                    {orders[jp._id].map((order) => {
                      return (
                        <div key={order._id} className="card mb-3">
                          <div className="card-body">
                            <div>
                              <span>
                                <span className="inputLabel">
                                  Order placed by
                                </span>
                                <a
                                  target="_blank"
                                  href={`#/customerHome/${order.customer._id}`}
                                >
                                  {order.customer.name}
                                </a>
                              </span>
                            </div>
                            <div>
                              <span className="inputLabel">
                                Change order status
                              </span>
                              <select
                                ref={(el) =>
                                  (statusRef.current[order._id] = el)
                                }
                                defaultValue={order.status}
                              >
                                <option value="Order placed">
                                  Order placed
                                </option>
                                <option value="Picked Up">Picked Up</option>
                                <option value="Packing">Packing</option>
                                <option value="Out for delivery">
                                  Out for delivery
                                </option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                            <div>
                              <span className="inputLabel small">
                                Order placed on{" "}
                                {formatDate(order.createdAt)}
                              </span>
                            </div>
                            <div className="mt-2">
                              <button
                                className="btn-primary"
                                onClick={() =>
                                  handleOnChangeStatus(order._id)
                                }
                              >
                                Change status
                              </button>
                            </div>
                            {order.driver ? (
                              "Driver Name" + " " + order.driver.name
                            ) : (
                              <div className="mt-2">
                                <button
                                  className="btn-primary"
                                  onClick={() =>
                                    assignDriver(order._id)
                                  }
                                >
                                  Assign driver
                                </button>
                              </div>
                            )}

                            <div className="mt-3">
                              <button
                                className="btn-danger"
                                onClick={() => enableMap(order._id)}
                              >
                                Track Order
                              </button>
                            </div>
                            <div className="mt-3">
                              <button
                                className="btn-danger"
                                onClick={() => enableMessages(order)}
                              >
                                Start Messaging
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>No orders yet</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isMapEnabled ? (
        <div className="maparea">
          <MapContainer latlng={location} />
        </div>
      ) : null}
      {areMessagesVisible ? (
        <div
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            position: "fixed",
            width: "400px",
            height: "450px",
            backgroundColor: "#ededed",
            right: "50px",
            bottom: "50px",
            overflowY: "scroll",
          }}
        >
          <div style={{ width: "100%", padding: "5px", marginLeft: "10px" }}>
            {currentOrder != null ? currentOrder.customer.name : null}
            <div style={{ float: "right", marginRight: "20px" }}>
              <IconButton
                style={{ fontSize: "10px" }}
                size="small"
                onClick={() => fetchMessages(currentOrderIdForMessaging)}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </div>
          <Divider />
          <div>
            {currentMessages.length > 0
              ? currentMessages.map((message) => {
                return renderCurrentMessage(message, userId);
              })
              : null}
          </div>
        </div>
      ) : null}
      {areMessagesVisible ? (
        <div
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            position: "fixed",
            width: "400px",
            height: "50px",
            backgroundColor: "#ededed",
            right: "50px",
            bottom: "0px",
            padding: "10px",
          }}
        >
          <Divider />
          <input
            style={{ height: "90%", width: "75%", marginRight: "20px" }}
            type="text"
            name="message"
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            disabled={currentMessage === "" ? true : false}
            onClick={() => sendMessage()}
          >
            Send
          </Button>
        </div>
      ) : null}
    </div>
  );
};

SellerOrders.propTypes = {};

export default SellerOrders;
