import React from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import CustomerMain from "./components/CustomerMain";
import SellerMain from "./components/CompanyMain";
import Logout from "./components/Logout";
import ItemHomeMain from "./components/ItemHomeMain";
import CustomerHomeMain from "./components/CustomerHomeMain";
import DriverMain from "./components/DriverMain";


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/item/:id">
          <ItemHomeMain />
        </Route>
        <Route path="/customerHome/:id">
          <CustomerHomeMain />
        </Route>
        <Route path="/seller">
          <SellerMain />
        </Route>
        <Route path="/buyer">
          <CustomerMain />
        </Route>
        <Route path="/driver">
          <DriverMain />
        </Route>
        <Route path="/sellerSignup" exact>
          <Signup type="seller" />
        </Route>
        <Route path="/buyerSignup" exact>
          <Signup type="customer" />
        </Route>
        <Route path="/driverSignup" exact>
          <Signup type="driver" />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

App.propTypes = {};
export default App;
