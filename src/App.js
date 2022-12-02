import React from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import EmployeeMain from "./components/EmployeeMain";
import SellerMain from "./components/CompanyMain";
import Logout from "./components/Logout";
import ItemHomeMain from "./components/JobHomeMain";
import CompanyHomeMain from "./components/SellerHomeMain";
import AdminCompanyHome from "./components/AdminCompanyHome";
import CustomerHomeMain from "./components/EmployeeHomeMain";
import DriverMain from "./components/DriverMain";


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/sellerHome/:id">
          <CompanyHomeMain />
        </Route>
        {/* <Route path="/sellerHomePage/:id" component={AdminCompanyHome} /> */}
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
          <EmployeeMain />
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
