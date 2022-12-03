import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Overview from './seller/Overview';
import Item from './seller/SellerItem';
import SellerOrders from './seller/SellerOrders';

class SellerMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <a className="navbar-brand text-light" href="#/">re$ellit</a>
          <a className="nav-link text-light" href="#/seller/overview">Overview</a>
          <a className="nav-link text-light" href="#/seller/items">Items</a>
          <a className="nav-link text-light" href="#/seller/orders">Orders</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/seller/overview" exact>
            <Overview />
          </Route>
          <Route path="/seller/items" exact>
            <Item />
          </Route>
          <Route path="/seller/orders" exact>
            <SellerOrders />
          </Route>
        </div>
      </>
    );
  }
}

export default SellerMain;
