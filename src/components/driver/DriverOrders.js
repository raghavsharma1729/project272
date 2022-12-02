import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  getDriverOrders, getItems, setOrderStatus, assignDriverToOrder, setTripLocation
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const DriverOrders = () => {
  const [orders, setOrders] = useState([]);

  const statusRef = useRef({});

  useEffect(() => {
    (async () => {
      const driverorders = await getDriverOrders();
      console.log("hurray" + driverorders);
      setOrders(driverorders);
    })();
  }, []);

  const handleOnChangeStatus = async (id) => {
    const status = statusRef.current[id].value;
    await setOrderStatus(id, { status });
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
        {orders.length === 0 && <div>You have not got any deliveries yet</div>}
        {orders
          ? (
            <div>
              {orders
                .map((order) => {
                  return (
                    <div key={order._id} className="card mb-3">
                      <div className="card-body">
                        <div>
                          <span><span className="inputLabel">Order placed by</span>
                            <a target="_blank" href={`#/customerHome/${order.customer._id}`}>
                              {order.customer.name}
                            </a>
                          </span>
                        </div>
                        <div>
                          <span><span className="inputLabel">Current Order Status</span>
                            <span>
                              {order.status}
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className="inputLabel">Change order status</span>
                          <select ref={(el) => statusRef.current[order._id] = el}
                            defaultValue={order.status}>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div><span
                          className="inputLabel small">Order placed on {formatDate(order.createdAt)}</span>
                        </div>
                        <div className="mt-2">
                          <button className="btn-primary"
                            onClick={() => handleOnChangeStatus(order._id)}>
                            Change status
                          </button>
                        </div>
                        <div className="mt-2">
                          <button className="btn-primary"
                            onClick={() => changeLocation(order._id)}>
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
