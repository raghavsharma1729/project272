import React, { useEffect, useState } from "react";
import {
  currentUser,
  getEmployeeJobApplications,
  withdrawJobApplication,
  getLocations,
  getMessages,
  postMessage,
  getCustomerRetailOrders,
} from "../../util/fetch/api";
import { formatDate } from "../../util";
// import MapContainer from "../mapContainer";
import MapContainer from "./MapContainer";
import { Divider, Grid, CircularProgress, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Card, Row } from "react-bootstrap";
import RetailShopOrders from "../retailShop/RetailShopOrders";

const MyJobApplications = () => {
  const [employee, setEmployee] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [retailOrders, setRetailOrders] = useState([]);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  const [isMapEnabled, setIsMapEnabled] = useState(false);
  const [showRetailOrders, setShowRetailOrder] = useState(true);
  const [areMessagesVisible, setAreMessagesVisible] = useState(false);

  const [currentOrderIdForMessaging, setCurrentOrderIdForMessaging] = useState(
    null
  );
  const [currentOrder, setCurrentOrder] = useState(null);

  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const reloadJobs = async () => {
    const jobApplications = await getEmployeeJobApplications();
    setJobApplications(jobApplications);
    const retailOrders = await getCustomerRetailOrders();
    setRetailOrders(retailOrders);
  };

  useEffect(() => {
    (async () => {
      const { user: employee } = await currentUser();
      setEmployee(employee);
      await reloadJobs();
    })();
  }, []);

  const withdrawJob = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await withdrawJobApplication(id);
      await reloadJobs();
    }
  };

  const enableMap = (jobId) => {
    setIsMapEnabled(true);
    const interval = setInterval(async () => {
      const locations = await getLocations();
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

  const fetchMessages = async (jobId) => {
    const messages = await getMessages(jobId);
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
  // let latlng = [
  //   {
  //     id: 1,
  //     lat: 37.336015,
  //     lng: -121.885912,
  //   },
  //   {
  //     id: 2,
  //     lat: 37.42216,
  //     lng: -122.08427,
  //   }

  // ]
  return (
    <div className="row">
      <div>
        {employee && (
          <>
            <h6>My orders</h6>
            <Card bg="light" text="dark">
              <Card.Header as="h5">
                <Row
                  className="display-4 m-2"
                  onClick={(e) => {
                    setShowRetailOrder(!showRetailOrders);
                    e.preventDefault();
                  }}
                >
                  Retail Shop Orders
                </Row>
              </Card.Header>
              <Card.Body hidden={showRetailOrders}>
                {retailOrders.length > 0
                  ? retailOrders.map((order) => {
                      return <RetailShopOrders order={order} />;
                    })
                  : null}
              </Card.Body>
            </Card>
            {jobApplications.length === 0 && (
              <div>You have not ordered for any products yet.</div>
            )}
            {jobApplications.map((jobApplication) => {
              return (
                <div>
                  <div key={jobApplication._id} className="card mb-3">
                    <div className="card-body">
                      <div>
                        <span className="inputLabel">Package name</span>
                        {jobApplication.job.title}
                      </div>
                      <div>
                        <span className="inputLabel">Company name</span>
                        {jobApplication.job.company.name}
                      </div>
                      <div>
                        <span className="inputLabel">Status</span>
                        {jobApplication.status}
                      </div>
                      <div>
                        <span className="inputLabel small">
                          Order created on{" "}
                          {formatDate(jobApplication.createdAt)}
                        </span>
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn-danger"
                          onClick={() => withdrawJob(jobApplication._id)}
                        >
                          Cancel order
                        </button>
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn-danger"
                          onClick={() => enableMap(jobApplication._id)}
                        >
                          Track Order
                        </button>
                      </div>
                      <div className="mt-3">
                        <button
                          className="btn-danger"
                          onClick={() => enableMessages(jobApplication)}
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
            {currentOrder != null ? currentOrder.job.company.name : null}
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

MyJobApplications.propTypes = {};

export default MyJobApplications;
