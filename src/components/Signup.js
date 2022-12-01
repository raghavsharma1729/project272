import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  signupCompany,
  signupDriver,
  signupEmployee,
  signupShopper,
  signupRetailShop,
} from "../util/fetch/api";

const Signup = ({ type, history }) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const shopId = useRef();

  const handleSignUp = () => {
    const d =
      type === "shopper"
        ? {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            retailShop: shopId.current.value,
          }
        : {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
          };
    if (type === "company") {
      signupCompany(d).then(({ token, user }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", user._id);

        history.push("/company/overview");
      });
    }
    if (type === "retailShop") {
      signupRetailShop(d).then(({ token, user }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", user._id);
        history.push("/retailShop/dashboard"); //todo
      });
    }
    if (type === "employee") {
      signupEmployee(d).then(({ token, user }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", user._id);

        history.push("/buyer/search");
      });
    }
    if (type === "driver") {
      signupDriver(d).then(({ token, user }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", user._id);

        history.push("/driver/dashboard");
      });
    }
    if (type === "shopper") {
      signupShopper(d).then(({ token, user }) => {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", user._id);
        history.push("/shopper/dashboard");
      });
    }
  };
  const getSignUpType = () => {
    if (type === "employee") return "Customer";
    else if (type === "company") return "Company";
    else if (type === "shopper") return "Shopper";
    else if (type === "driver") return "Driver";
    else if (type === "retailShop") return "RetailShop";
    else return "Customer";
  };
  let shopPicker;
  if (type === "shopper") {
    shopPicker = (
      <div className="form-group">
        <input
          type="text"
          ref={shopId}
          placeholder="shopId"
          className="form-control"
        />
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" />
        <div className="col-4">
          <h2 className="text-center mt-5">Cargo Shippers Signup</h2>
          <div className="text-center mt-5">Signup as a {getSignUpType()}</div>
          <div className="form-group mt-5">
            <input
              type="text"
              ref={name}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              ref={email}
              placeholder="Email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              ref={password}
              placeholder="Password"
              className="form-control"
            />
          </div>
          {shopPicker}
          <div className="form-group text-center">
            <button className="btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="col-4" />
      </div>
    </div>
  );
};

Signup.propTypes = {
  type: PropTypes.string,
  history: PropTypes.any,
};

export default withRouter(Signup);
