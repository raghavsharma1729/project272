import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
class RetailItem extends Component {
  render() {
    return (
      <Card
        style={{ width: "10px" }}
        border="primary"
        hidden={this.props.hiddenval}
      >
        <Card.Body>
          <Card.Title>{this.props.item.title}</Card.Title>
          <Card.Text>
            This is very good item, this is top selling item.
          </Card.Text>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.isCart
                ? this.props.removeItem(this.props.item)
                : this.props.addItem(this.props.item);
            }}
            disabled={this.props.disabled}
          >
            ${this.props.item.price}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default RetailItem;
