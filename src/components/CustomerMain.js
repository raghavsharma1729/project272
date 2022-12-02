import React, { Component } from "react";
import { Route } from "react-router-dom";
import ProfileAndActivity from "./customer/ProfileAndActivity";
import Demographics from "./customer/Demographics";
import MyOrders from "./customer/MyOrders";
import ItemSearch from "./customer/JobSearch";

class CustomerMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">
            ReSellit
          </a>
          <a className="nav-link text-light" href="#/buyer/search">
            Search Packages
          </a>
          <a className="nav-link text-light" href="#/buyer/orders">
            My orders
          </a>
          <a className="nav-link text-light" href="#/buyer/profileAndActivity">
            My profile
          </a>
          <a className="nav-link text-light" href="#/buyer/address">
            Address
          </a>
          <a className="nav-link" href="#/logout">
            Logout
          </a>
        </nav>
        <div className="container mt-3">
          <Route path="/buyer/search" exact>
            <ItemSearch />
          </Route>
          <Route path="/buyer/orders" exact>
            <MyOrders />
          </Route>
          <Route path="/buyer/profileAndActivity" exact>
            <ProfileAndActivity />
          </Route>
          <Route path="/buyer/address" exact>
            <Demographics />
          </Route>
        </div>
      </>
    );
  }
}

export default CustomerMain;
