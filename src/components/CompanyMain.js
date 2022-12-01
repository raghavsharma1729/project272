import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Overview from './company/Overview';
import JobPosting from './company/JobPosting';
import CompanyJobApplications from './company/CompanyJobApplications';

class CompanyMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <a className="navbar-brand text-light" href="#/">Cargo Shippers</a>
          <a className="nav-link text-light" href="#/company/overview">Overview</a>
          <a className="nav-link text-light" href="#/company/jobPosting">Different Packages</a>
          <a className="nav-link text-light" href="#/company/companyJobApplications">Orders</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/company/overview" exact>
            <Overview />
          </Route>
          <Route path="/company/jobPosting" exact>
            <JobPosting />
          </Route>
          <Route path="/company/companyJobApplications" exact>
            <CompanyJobApplications />
          </Route>
        </div>
      </>
    );
  }
}

export default CompanyMain;
