import React, { Component } from "react";
import { Route } from "react-router-dom";
import ProfileAndActivity from "./employee/ProfileAndActivity";
import Demographics from "./employee/Demographics";
import MyJobApplications from "./employee/MyJobApplications";
import JobSearch from "./employee/JobSearch";
import RetailShops from "./retailShop/RetailsShops";

class EmployeeMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">
            Cargo Shippers
          </a>
          <a className="nav-link text-light" href="#/buyer/search">
            Search Packages
          </a>
          <a className="nav-link text-light" href="#/buyer/orders">
            My orders
          </a>
          <a className="nav-link text-light" href="#/buyer/retailShops">
            Retail Shops
          </a>
          <a className="nav-link text-light" href="#/buyer/profileAndActivity">
            My profile
          </a>
          <a className="nav-link text-light" href="#/buyer/address">
            Address
          </a>
          <a className="nav-link text-light" href="#/buyer/address">
            File{" "}
          </a>
          <a className="nav-link" href="#/logout">
            Logout
          </a>
        </nav>
        <div className="container mt-3">
          <Route path="/buyer/retailShops" exact>
            <RetailShops />
          </Route>
          <Route path="/buyer/search" exact>
            <JobSearch />
          </Route>
          <Route path="/buyer/orders" exact>
            <MyJobApplications />
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

export default EmployeeMain;
