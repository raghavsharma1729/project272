import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  getDriverJobApplications, getJobPosting, setJobApplicationStatus, assignDriverToOrder, setTripLocation
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const DriverOrders = () => {
  const [jobApplications, setJobApplications] = useState([]);

  const statusRef = useRef({});

  useEffect(() => {
    (async () => {
      const jobApplications = await getDriverJobApplications();
      console.log("hurray" + jobApplications);
      setJobApplications(jobApplications);
    })();
  }, []);

  const handleOnChangeStatus = async (id) => {
    const status = statusRef.current[id].value;
    await setJobApplicationStatus(id, { status });
    window.alert('Status updated.');
  };

  const changeLocation = async (orderId) => {
    const interval = setInterval(async () => {
      if (window.navigator.geolocation) {
        window.navigator.geolocation
          .getCurrentPosition(async (positions) => {
            const lat = positions.coords.latitude;
            const lon = positions.coords.longitude;
            const locationUpdate = {
              lat,
              lon
            }
            await setTripLocation(orderId, locationUpdate);

          }, (err) => console.log(err));
      }
    }, 5000);
    return () => clearInterval(interval);

  }

  return (
    <div className="row">
      <div className="col-6">
        <h6>Product orders</h6>
        {jobApplications.length === 0 && <div>You have not got any deliveries yet</div>}
        {jobApplications
          ? (
            <div>
              {jobApplications
                .map((jobApplication) => {
                  return (
                    <div key={jobApplication._id} className="card mb-3">
                      <div className="card-body">
                        <div>
                          <span><span className="inputLabel">Order placed by</span>
                            <a target="_blank" href={`#/employeeHome/${jobApplication.employee._id}`}>
                              {jobApplication.employee.name}
                            </a>
                          </span>
                        </div>
                        <div>
                          <span className="inputLabel">Change order status</span>
                          <select ref={(el) => statusRef.current[jobApplication._id] = el}
                            defaultValue={jobApplication.status}>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div><span
                          className="inputLabel small">Order placed on {formatDate(jobApplication.createdAt)}</span>
                        </div>
                        <div className="mt-2">
                          <button className="btn-primary"
                            onClick={() => handleOnChangeStatus(jobApplication._id)}>
                            Change status
                          </button>
                        </div>
                        <div className="mt-2">
                          <button className="btn-primary"
                            onClick={() => changeLocation(jobApplication._id)}>
                            Start Trip
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
            </div>
          )
          : <div>No orders yet</div>}

      </div>
    </div>
  );
};

DriverOrders.propTypes = {};

export default DriverOrders;
