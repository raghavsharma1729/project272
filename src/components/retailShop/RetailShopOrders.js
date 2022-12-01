import React, { Component } from "react";
import { Container, Card, Row, Button, Col, CardGroup } from "react-bootstrap";
import {
  assignDriverToOrder,
  assignShopperToOrder,
} from "../../util/fetch/api";
import RetailItem from "./RetailItem";

class RetailShopOrders extends Component {
  state = {
    shopper: this.props.order.shopper,
    hidden: true,
  };
  assignShopper = async (id) => {
    const shopper = await assignShopperToOrder(id);
    this.setState({ shopper });
  };
  assignDriver = async (id) => {
    const driver = await assignDriverToOrder(id);
    console.log(driver);
  };
  render() {
    const order = this.props.order;
    return (
      <Container fluid>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row
              className="display-5 font-weight-light"
              onClick={(e) => this.setState({ hidden: !this.state.hidden })}
            >
              <Col sm={8}>
                {order.customer.name
                  ? "Order from " + order.customer.name + " "
                  : ""}
                {order.retailShop.name
                  ? order.retailShop.name + "'s Order "
                  : ""}
                <br />
                {this.state.shopper && !this.props.shopper
                  ? " Shopper Assigned " + this.state.shopper.name
                  : null}
              </Col>
              <Row>
                <Col>
                  <Button variant="outline-success">{order.status}</Button>
                </Col>
                {this.props.retailShop ? (
                  <Col>
                    <Button
                      variant="outline-success"
                      onClick={(e) => {
                        e.preventDefault();
                        this.assignShopper(order._id);
                      }}
                      disabled={this.state.shopper ? true : false}
                    >
                      AssignShopper
                    </Button>
                  </Col>
                ) : null}
                {this.props.shopper ? (
                  <Col>
                    <Button
                      variant="outline-success"
                      onClick={(e) => {
                        e.preventDefault();
                        this.assignDriver(order._id);
                      }}
                      disabled={this.state.shopper ? false : true}
                    >
                      Assign Driver
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Row>
          </Card.Header>
          <Card.Body hidden={this.state.hidden}>
            {order.orderItems.length > 0
              ? order.orderItems.map((item) => (
                  <CardGroup>
                    <RetailItem hiddenval={false} item={item} disabled={true} />
                  </CardGroup>
                ))
              : null}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default RetailShopOrders;
