import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  getCompanyJobApplications,
  getJobPosting,
  setJobApplicationStatus,
  assignDriverToOrder,
  getLocations,
  postMessage,
  getMessages,
} from "../../util/fetch/api";
import { formatDate } from "../../util";
import MapContainer from "../employee/MapContainer";
import { Divider, Grid, CircularProgress, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";

const CompanyJobApplications = () => {
  const [jobApplications, setJobApplications] = useState({});
  const [jobPosting, setJobPosting] = useState([]);
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
      const jobPosting = await getJobPosting();
      const jobApplications = await getCompanyJobApplications();
      setJobPosting(jobPosting);
      setJobApplications(_.groupBy(jobApplications, "job._id"));
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
    await setJobApplicationStatus(id, { status });
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
        {jobPosting.length === 0 && <div>You have not got any orders yet</div>}
        {jobPosting.map((jp) => {
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
                    {jobApplications[jp._id]
                      ? jobApplications[jp._id].length
                      : "no"}{" "}
                    orders)
                  </span>
                </div>
                {jobApplications[jp._id] ? (
                  <div>
                    {jobApplications[jp._id].map((jobApplication) => {
                      return (
                        <div key={jobApplication._id} className="card mb-3">
                          <div className="card-body">
                            <div>
                              <span>
                                <span className="inputLabel">
                                  Order placed by
                                </span>
                                <a
                                  target="_blank"
                                  href={`#/employeeHome/${jobApplication.employee._id}`}
                                >
                                  {jobApplication.employee.name}
                                </a>
                              </span>
                            </div>
                            <div>
                              <span className="inputLabel">
                                Change order status
                              </span>
                              <select
                                ref={(el) =>
                                  (statusRef.current[jobApplication._id] = el)
                                }
                                defaultValue={jobApplication.status}
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
                                {formatDate(jobApplication.createdAt)}
                              </span>
                            </div>
                            <div className="mt-2">
                              <button
                                className="btn-primary"
                                onClick={() =>
                                  handleOnChangeStatus(jobApplication._id)
                                }
                              >
                                Change status
                              </button>
                            </div>
                            {jobApplication.driver ? (
                              "Driver Name" + " " + jobApplication.driver.name
                            ) : (
                              <div className="mt-2">
                                <button
                                  className="btn-primary"
                                  onClick={() =>
                                    assignDriver(jobApplication._id)
                                  }
                                >
                                  Assign driver
                                </button>
                              </div>
                            )}

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
            {currentOrder != null ? currentOrder.employee.name : null}
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

CompanyJobApplications.propTypes = {};

export default CompanyJobApplications;
