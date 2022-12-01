import React, { Component } from "react";
import {
  Card,
  CardGroup,
  Col,
  Container,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import { createRetailOrder, getRetailShops } from "../../util/fetch/api";
import RetailItem from "./RetailItem";

class RetailShops extends Component {
  state = {
    Shops: [],
    currentShop: null,
    orderItems: [],
  };

  componentDidMount = () => {
    const Shops = this.getAllShops();
    this.setState({ Shops });
  };

  getAllShops = async () => {
    const Shops = await getRetailShops();
    this.setState({ Shops });
  };
  setCurrentShop = async (currentShop) => {
    if (
      this.state.currentShop !== currentShop ||
      this.state.currentShop === null
    ) {
      await this.setState({ currentShop, orderItems: [] });
      console.log(this.state);
    }
  };
  addItem = async (item) => {
    if (item.retailShop === this.state.currentShop) {
      await this.setState({ orderItems: [...this.state.orderItems, item] });
    }
    console.log(this.state.orderItems);
  };
  removeItem = async (item) => {
    let orderItems = this.state.orderItems.filter(
      (citem) => citem._id !== item._id
    );
    await this.setState({ orderItems });
  };
  placeOrder = async () => {
    const d = {
      orderItems: this.state.orderItems,
    };
    console.log(d);
    await createRetailOrder(d, this.state.currentShop);
    this.setState({ orderItems: [] });
  };
  render() {
    let retailsShopsHeader = <h3 className="display-3">Retail Shops</h3>;
    let cartHeader = <h3 className="display-3">Your Cart</h3>;
    // let Shops = await getRetailShops();
    let retailShopTiles = this.state.Shops ? (
      <React.Fragment>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row>{retailsShopsHeader}</Row>
          </Card.Header>
          <Card.Body>
            {this.state.Shops.length > 0
              ? this.state.Shops.map((Shop) => (
                  <Card bg="light" text="dark">
                    <Card.Header as="h5">
                      <Row
                        className="display-4 font-weight-light"
                        onClick={(e) => {
                          this.setCurrentShop(Shop._id);
                          e.preventDefault();
                        }}
                      >
                        {Shop.name}
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      {Shop.retailItems.length > 0
                        ? Shop.retailItems.map((retailItem) => (
                            <CardGroup>
                              <RetailItem
                                hiddenval={
                                  this.state.currentShop != null &&
                                  this.state.currentShop === Shop._id
                                    ? false
                                    : true
                                }
                                item={retailItem}
                                addItem={this.addItem}
                              />
                            </CardGroup>
                          ))
                        : null}
                    </Card.Body>
                  </Card>
                ))
              : null}
          </Card.Body>
        </Card>
      </React.Fragment>
    ) : null;
    let cart = this.state.orderItems ? (
      <React.Fragment>
        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row>{cartHeader}</Row>
          </Card.Header>
          <Card.Body>
            <CardGroup>
              {this.state.orderItems.length > 0
                ? this.state.orderItems.map((item) => (
                    <RetailItem
                      isCart={true}
                      item={item}
                      removeItem={this.removeItem}
                    />
                  ))
                : null}
            </CardGroup>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                this.placeOrder();
              }}
              disabled={this.state.orderItems.length > 0 ? false : true}
            >
              Place Order
            </Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    ) : (
      <React.Fragment>{cartHeader}</React.Fragment>
    );
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Container>{retailShopTiles}</Container>
          </Col>
          <Col>
            <Container>{cart}</Container>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default RetailShops;
