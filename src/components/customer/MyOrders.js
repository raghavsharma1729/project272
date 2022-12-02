import React, { useEffect, useState } from "react";
import {
  currentUser,
  getCustomerOrders,
  cancleOrder,
  getOrderLocation,
  getMessages,
  postMessage,
} from "../../util/fetch/api";
import { formatDate } from "../../util";
import MapContainer from "./MapContainer";
import { Divider, Grid, CircularProgress, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Card, Row } from "react-bootstrap";

const MyOrders = () => {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  const [isMapEnabled, setIsMapEnabled] = useState(false);
  const [areMessagesVisible, setAreMessagesVisible] = useState(false);

  const [currentOrderIdForMessaging, setCurrentOrderIdForMessaging] = useState(
    null
  );
  const [currentOrder, setCurrentOrder] = useState(null);

  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const reloadOrders = async () => {
    const orderIems = await getCustomerOrders();
    setOrders(orderIems);
  };

  useEffect(() => {
    (async () => {
      const { user: employee } = await currentUser();
      setCustomer(employee);
      await reloadOrders();
    })();
  }, []);

  const withdrawJob = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await cancleOrder(id);
      await reloadOrders();
    }
  };

  const enableMap = (orderId) => {
    setIsMapEnabled(true);
    const interval = setInterval(async () => {
      const locations = await getOrderLocation(orderId);
      console.log(locations);
      setLocation(locations.location[locations.location.length - 1]);
    }, 10000);
    return () => clearInterval(interval);
  };

  const sendMessage = async () => {
    await postMessage({
      orderId: currentOrderIdForMessaging,
      newMessage: currentMessage,
    });
    setCurrentMessage("");
  };

  const fetchMessages = async (orderId) => {
    const messages = await getMessages(orderId);
    setCurrentMessages(messages.messages);
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
      <div>
        {customer && (
          <>
            <h6>My orders</h6>
            <Card bg="light" text="dark">
              <Card.Header as="h5">
                <Row
                  className="display-4 m-2"
                >
                  My Orders
                </Row>
              </Card.Header>
            </Card>
            {orders.length === 0 && (
              <div>You have not ordered for any products yet.</div>
            )}
            {orders.map((order) => {
              return (
                <div>
                  <div key={order._id} className="card mb-3">
                    <div className="card-body">
                      <div>
                        <span className="inputLabel">Item Name</span>
                        {order.item.title}
                      </div>
                      <div>
                        <span className="inputLabel">Seller name</span>
                        {order.item.seller.name}
                      </div>
                      <div>
                        <span className="inputLabel">Status</span>
                        {order.status}
                      </div>
                      <div>
                        <span className="inputLabel small">
                          Ordered on{" "}
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      {order.status === 'Delivered' ? <></> : <>
                        <div className="mt-3">
                          <button
                            className="btn-danger"
                            onClick={() => withdrawJob(order._id)}
                          >
                            Cancel order
                          </button>
                        </div>
                        <div className="mt-3">
                          <button
                            className="btn-danger"
                            onClick={() => enableMap(order._id)}
                          >
                            Track Order
                          </button>
                        </div>
                      </>}
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
                </div>
              );
            })}
          </>
        )}
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
            {currentOrder != null ? currentOrder.item.seller.name : null}
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

MyOrders.propTypes = {};

export default MyOrders;
