import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import Dashboard from "./shopper/Dashboard";
import ShopperOrders from "./shopper/ShopperOrders";

class ShopperMain extends Component {
  render() {
    let dashBoard = (
      <h1 className="display-5 m-2">WELCOME TO SHOPPER DASHBOARD</h1>
    );
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">
            Cargo Shippers
          </a>
          <a className="nav-link text-light" href="#/shopper/dashboard">
            Dashboard
          </a>
          <a className="nav-link text-light" href="#/shopper/orders">
            My orders
          </a>

          {/* <a className="nav-link text-light" href="#/buyer/search">
            Search products
          </a>
         
          <a className="nav-link text-light" href="#/buyer/profileAndActivity">
            My profile
          </a>
          <a className="nav-link text-light" href="#/buyer/address">
            Address
          </a> */}
          <a className="nav-link" href="#/logout">
            Logout
          </a>
        </nav>
        <Container className="w-75">
          <React.Fragment>
            <Row>{dashBoard}</Row>
          </React.Fragment>
        </Container>
        <div className="container mt-3">
          <Route path="/shopper/dashboard" exact>
            <Dashboard />
          </Route>
          {
            <Route path="/shopper/orders" exact>
              <ShopperOrders />
            </Route>
          }
        </div>
      </>
    );
  }
}

export default ShopperMain;
