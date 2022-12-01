import React, { createRef, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import {
  currentUser,
  fileUrl,
  getShopperOrders,
  updateDriver,
  updateShopper,
} from "../../util/fetch/api";
import RetailShopOrders from "../retailShop/RetailShopOrders";

const ShopperOrders = () => {
  const [shopper, setShopper] = useState(null);
  const [orders, setOrders] = useState(null);

  const reloadProfile = async () => {
    const { user: shopper } = await currentUser();
    setShopper(shopper);
    const orders = await getShopperOrders();
    setOrders(orders);
  };
  useEffect(() => {
    (async () => {
      await reloadProfile();
    })();
  }, []);

  let ordersElement = orders ? (
    <React.Fragment>
      <Card bg="light" text="dark">
        <Card.Header as="h5">
          <Row>Shopper Orders</Row>
        </Card.Header>
        <Card.Body>
          {orders.length > 0
            ? orders.map((order) => {
                return (
                  <RetailShopOrders
                    order={order}
                    shopper={shopper ? true : false}
                  />
                );
              })
            : null}
        </Card.Body>
      </Card>
    </React.Fragment>
  ) : null;

  return (
    <div className="row">
      {shopper && (
        <>
          <Container>{ordersElement}</Container>
        </>
      )}
    </div>
  );
};

export default ShopperOrders;
