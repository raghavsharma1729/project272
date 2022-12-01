import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { fileUrl, getEmployee } from '../util/fetch/api';

class EmployeeHomeMain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { employee: null };
  }

  async componentDidMount() {
    const employee = await getEmployee(this.props.match.params.id);
    this.setState({ employee });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <a className="navbar-brand text-light" href="#/">Marketplace</a>
        </nav>
        <div className="container mt-3" />
        <div className="col-12 text-center">
          <h6>Buyer profile</h6>
        </div>
        <div className="col-12 mt-3">
          {this.state.employee && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="imageTile">
                <img src={fileUrl(this.state.employee.profilePic)} alt="" />
              </span>
              <div><span className="inputLabel">Name</span>{this.state.employee.name}</div>
              <div><span className="inputLabel">Email</span>{this.state.employee.email}</div>
              <div><span className="inputLabel">Address</span>{this.state.employee.disability}</div>
              <div><span className="inputLabel">State</span>{this.state.employee.veteranStatus}</div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(EmployeeHomeMain);
