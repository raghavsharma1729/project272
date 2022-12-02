import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { fileUrl, getCustomer } from '../util/fetch/api';

class CustomerHomeMain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { customer: null };
  }

  async componentDidMount() {
    const customer = await getCustomer(this.props.match.params.id);
    this.setState({ customer });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <a className="navbar-brand text-light" href="#/">ReSellit</a>
        </nav>
        <div className="container mt-3" />
        <div className="col-12 text-center">
          <h6>Buyer profile</h6>
        </div>
        <div className="col-12 mt-3">
          {this.state.customer && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="imageTile">
                <img src={fileUrl(this.state.customer.profilePic)} alt="" />
              </span>
              <div><span className="inputLabel">Name</span>{this.state.customer.name}</div>
              <div><span className="inputLabel">Email</span>{this.state.customer.email}</div>
              <div><span className="inputLabel">Address</span>{this.state.customer.addressLine}</div>
              <div><span className="inputLabel">State</span>{this.state.customer.state}</div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(CustomerHomeMain);
