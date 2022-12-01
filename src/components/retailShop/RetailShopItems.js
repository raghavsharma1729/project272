import React, { Component, createRef } from "react";
import { Button, Card, CardGroup, Container, Form, Row } from "react-bootstrap";
import {
  addRetailItem,
  getMyRetailShopItems,
  getRetailShopItems,
} from "../../util/fetch/api";
import RetailItem from "./RetailItem";

class RetailShopItems extends Component {
  constructor() {
    super();
    this.price = createRef("");
    this.title = createRef(0);
  }
  state = {
    retailItems: [],
    add: true,
  };
  componentDidMount = () => {
    this.setState({ retailItems: this.getItems() });
  };
  getItems = async () => {
    const userId = localStorage.getItem("userId");
    const retailItems = await getMyRetailShopItems(userId);
    console.log(userId, this.state.retailItems);
    this.setState({ retailItems });
  };
  setAdd = (e) => {
    e.preventDefault();
    this.setState({ add: !this.state.add });
  };
  addItem = async () => {
    console.log(this.title.current.value, this.price.current.value);
    const item = await addRetailItem({
      title: this.title.current.value,
      price: this.price.current.value,
    });
    this.setState({ ...this.state.retailItems, item });
  };
  render() {
    return (
      <Container fluid>
        <Card bg="light" text="dark">
          <Card.Header
            // as="h5"
            onClick={(e) => {
              this.setAdd(e);
            }}
          >
            <Row className="display-4 m-2 font-weight-light">Add an Item</Row>
          </Card.Header>
          <Card.Body hidden={this.state.add}>
            <Form onSubmit={this.addItem}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter item name"
                  ref={this.title}
                />
                <Form.Text className="text-muted">
                  This will be displayed as Item name.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  ref={this.price}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Item
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card bg="light" text="dark">
          <Card.Header as="h5">
            <Row className="display-4 m-2">Items Sold By You</Row>
          </Card.Header>
          <Card.Body>
            {this.state.retailItems.length > 0
              ? this.state.retailItems.map((item) => (
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

export default RetailShopItems;
