import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./Login";
import { currentUser } from "../util/fetch/api";
import { FormControl, MenuItem, Select } from "@material-ui/core";

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: "driver" };
  }

  landingPage = (scope) => {
    let landingPage = "/driver/dashboard";

    if (scope === "seller") {
      landingPage = "/seller/overview";
    } else if (scope === "customer") {
      landingPage = "/buyer/search";
    } else if (scope === "driver") {
      landingPage = "/driver/dashboard";
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
    const handleChange = (e) => {
      this.setState({ currTab: e.target.value });
    };
    return (
      <div className="container justify-content-center">
        <div className="row">
          <div className="col-3" />
          <div className="col-10">
            <div className="h3 text-center mt-3">ReSellit</div>
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
                    <MenuItem value={"customer"}>Customer</MenuItem>
                    <MenuItem value={"seller"}>Seller</MenuItem>
                  </Select>
                </FormControl>
              </Container>
            </div>

            <Login onLogin={this.handleOnLogin} type={this.state.currTab} />

            <div className="d-flex justify-content-center">
              <div>Dont have a account ?&nbsp;&nbsp;</div>
              <a href="#/sellerSignup">Sign up as a Seller</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/buyerSignup">Sign up as a Customer</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/driverSignup">Sign up as a Driver</a>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
