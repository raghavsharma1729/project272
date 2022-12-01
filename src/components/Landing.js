import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Container, Form, Form as ReactForm } from "react-bootstrap";
import Login from "./Login";
import { currentUser } from "../util/fetch/api";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: "driver" };
  }

  landingPage = (scope) => {
    let landingPage = "/driver/dashboard";

    if (scope === "company") {
      landingPage = "/company/overview";
    } else if (scope === "employee") {
      landingPage = "/buyer/search";
    } else if (scope === "shopper") {
      landingPage = "/shopper/dashboard";
    } else if (scope === "driver") {
      landingPage = "/driver/dashboard";
    } else if (scope === "retailShop") {
      landingPage = "/retailShop/dashboard";
    }
    return landingPage;
  };
  async componentDidMount() {
    const { scope } = await currentUser();
    if (scope === null) return;
    this.props.history.push(this.landingPage(scope));
  }

  handleOnLogin = () => {
    this.props.history.push(this.landingPage(this.state.currTab));
  };

  toggleLogin = (entity) => {
    this.setState({ currTab: entity });
  };

  render() {
    // const { currTab } = this.state;
    const getSignInOptions = () => {
      if (this.state.currTab === "company") {
        return (
          <div>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "employee" });
              }}
            >
              No, login as customer
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "driver" });
              }}
            >
              No, login as a driver
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "shopper" });
              }}
            >
              No, login as a Shopper
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "retailShop" });
              }}
            >
              No, login as retailShop
            </button>
          </div>
        );
      } else if (this.state.currTab === "employee") {
        return (
          <div>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "company" });
              }}
            >
              No, login as company
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "driver" });
              }}
            >
              No, login as a driver
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "shopper" });
              }}
            >
              No, login as a Shopper
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "retailShop" });
              }}
            >
              No, login as retailShop
            </button>
          </div>
        );
      } else if (this.state.currTab === "retailShop") {
        return (
          <div>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "company" });
              }}
            >
              No, login as company
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "driver" });
              }}
            >
              No, login as a driver
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "shopper" });
              }}
            >
              No, login as a Shopper
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "employee" });
              }}
            >
              No, login as customer
            </button>
          </div>
        );
      } else if (this.state.currTab === "shopper") {
        return (
          <div>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "company" });
              }}
            >
              No, login as company
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "retailShop" });
              }}
            >
              No, login as retailShop
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "driver" });
              }}
            >
              No, login as a driver
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "employee" });
              }}
            >
              No, login as a Customer
            </button>
          </div>
        );
      } else if (this.state.currTab === "driver") {
        return (
          <div>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "company" });
              }}
            >
              No, login as company
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "employee" });
              }}
            >
              No, login as a customer
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "shopper" });
              }}
            >
              No, login as a Shopper
            </button>
            <button
              className="btn-outline-primary"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ currTab: "retailShop" });
              }}
            >
              No, login as retailShop
            </button>
          </div>
        );
      }
    };
    const getSignInEntity = () => {
      if (this.state.currTab === "company") return "Company";
      else if (this.state.currTab === "employee") return "Customer";
      else if (this.state.currTab === "driver") return "Driver";
      else if (this.state.currTab === "shopper") return "Shopper";
      else return "Driver";
    };
    const handleChange = (e) => {
      this.setState({ currTab: e.target.value });
    };
    return (
      <div className="container justify-content-center">
        <div className="row">
          <div className="col-3" />
          <div className="col-10">
            <div className="h3 text-center mt-3">Cargo Shippers</div>
            <div className="text-center">
              <Container>
                <FormControl>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.currTab}
                    label="Sign In As"
                    onChange={handleChange}
                  >
                    <MenuItem value={"driver"}>Driver</MenuItem>
                    <MenuItem value={"shopper"}>Shopper</MenuItem>
                    <MenuItem value={"employee"}>Customer</MenuItem>
                    <MenuItem value={"company"}>Company</MenuItem>
                    <MenuItem value={"retailShop"}>RetailShop</MenuItem>
                  </Select>
                </FormControl>
              </Container>
            </div>

            <Login onLogin={this.handleOnLogin} type={this.state.currTab} />

            <div className="d-flex justify-content-center">
              <div>Dont have a account ?&nbsp;&nbsp;</div>
              <a href="#/companySignup">Sign up as a company</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/buyerSignup">Sign up as a customer</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/driverSignup">Sign up as a driver</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/shopperSignup">Sign up as a Shopper</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/retailShopSignup">Sign up as a Retail Shop</a>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
