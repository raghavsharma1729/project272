import React, { Component } from "react";
import { Container } from "react-bootstrap";
import RetailShopOrders from "./RetailShopOrders";

class RetailShopOrdersHome extends Component {
  render() {
    return (
      <Container>
        {this.props.orders.length > 0
          ? this.props.orders.map((order) => {
              return <RetailShopOrders order={order} retailShop={true} />;
            })
          : null}
      </Container>
    );
  }
}

export default RetailShopOrdersHome;
