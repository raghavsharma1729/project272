import React from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import EmployeeMain from "./components/EmployeeMain";
import CompanyMain from "./components/CompanyMain";
import Logout from "./components/Logout";
import JobHomeMain from "./components/JobHomeMain";
import CompanyHomeMain from "./components/CompanyHomeMain";
import AdminCompanyHome from "./components/AdminCompanyHome";
import EmployeeHomeMain from "./components/EmployeeHomeMain";
import DriverMain from "./components/DriverMain";
import ShopperMain from "./components/ShopperMain";
import RetailShopMain from "./components/RetailShopMain";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/companyHome/:id">
          <CompanyHomeMain />
        </Route>
        <Route path="/companyHomePage/:id" component={AdminCompanyHome} />
        <Route path="/jobHome/:id">
          <JobHomeMain />
        </Route>
        <Route path="/employeeHome/:id">
          <EmployeeHomeMain />
        </Route>
        <Route path="/company">
          <CompanyMain />
        </Route>
        <Route path="/buyer">
          <EmployeeMain />
        </Route>
        <Route path="/driver">
          <DriverMain />
        </Route>
        <Route path="/shopper">
          <ShopperMain />
        </Route>
        <Route path="/retailShop">
          <RetailShopMain />
        </Route>
        <Route path="/companySignup" exact>
          <Signup type="company" />
        </Route>
        <Route path="/buyerSignup" exact>
          <Signup type="employee" />
        </Route>
        <Route path="/driverSignup" exact>
          <Signup type="driver" />
        </Route>
        <Route path="/shopperSignup" exact>
          <Signup type="shopper" />
        </Route>
        <Route path="/retailShopSignup" exact>
          <Signup type="retailShop" />
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
