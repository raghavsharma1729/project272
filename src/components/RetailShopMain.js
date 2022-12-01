import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import { getRetailShopOrders } from "../util/fetch/api";
import Dashboard from "./retailShop/Dashboard";
import RetailShopItems from "./retailShop/RetailShopItems";
import RetailShopOrders from "./retailShop/RetailShopOrders";
import RetailShopOrdersHome from "./retailShop/RetailShopOrdersHome";

class RetailShopMain extends Component {
  state = {
    orders: [],
  };
  userId = localStorage.getItem("userId");
  componentDidMount = async () => {
    const orders = await getRetailShopOrders();
    this.setState({ orders });
    console.log(this.state.orders);
  };
  render() {
    let dashBoard = (
      <Row className="display-4 m-2">WELCOME TO RETAIL SHOP DASHBOARD</Row>
    );
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">
            Cargo Shippers
          </a>
          <a className="nav-link text-light" href="#/retailShop/dashboard">
            Dashboard
          </a>
          <a className="nav-link text-light" href="#/retailShop/orders">
            My orders
          </a>
          <a className="nav-link text-light" href="#/retailShop/items">
            My Items
          </a>
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
          <Route path="/retailShop/dashboard" exact>
            <Dashboard />
          </Route>

          <Route path="/retailShop/orders" exact>
            <RetailShopOrdersHome orders={this.state.orders} />
          </Route>
          <Route path="/retailShop/items" exact>
            <RetailShopItems />
          </Route>
        </div>
      </>
    );
  }
}

export default RetailShopMain;
