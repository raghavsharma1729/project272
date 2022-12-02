import React, { Component } from "react";
import { Route } from "react-router-dom";
import ProfileAndActivity from "./customer/ProfileAndActivity";
import Demographics from "./customer/Demographics";
import MyOrders from "./customer/MyOrders";
import ItemSearch from "./customer/JobSearch";
import Dashboard from "./driver/Dashboard";
import DriverOrders from "./driver/DriverOrders";

class DriverMain extends Component {
  render() {
    console.log("asdasdasd");
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">
            Cargo Shippers
          </a>
          <a className="nav-link text-light" href="#/driver/dashboard">
            Dashboard
          </a>
          <a className="nav-link text-light" href="#/driver/orders">
            My orders
          </a>
          <a className="nav-link" href="#/logout">
            Logout
          </a>
        </nav>
        <div className="container mt-3">
          <Route path="/driver/dashboard" exact>
            <Dashboard />
          </Route>
          {

            <Route path="/driver/orders" exact>
              < DriverOrders />
            </Route>
          }
        </div>
      </>
    );
  }
}

export default DriverMain;
