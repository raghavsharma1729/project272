import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  applyJob, currentUser, fileUrl, getJob,
} from '../util/fetch/api';
import { formatDate } from '../util';

const JobHomeMain = () => {
  const { id: jobId } = useParams();
  const [job, setJob] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    (async () => {
      const { user } = await currentUser();
      setEmployee(user);
      setJob(await getJob(jobId));
    })();
  }, [jobId]);

  const handleOnApply = async () => {
    await applyJob(jobId);
    window.alert('Order has been placed!');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-dark">
        <a className="navbar-brand text-light" href="#/">Cargo Shippers</a>
        <a className="nav-link" href="#/logout">Logout</a>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            {job && employee && (
            <>
              <h5>{job.title}</h5>
              <div className="imageTile">
                {job.company.profilePic
                  ? <img src={fileUrl(job.company.profilePic)} alt="" />
                  : <div>No pic available</div>}
              </div>
              <div><span className="inputLabel">Price</span><span>{job.country}</span></div>
              <div><span className="inputLabel">Company Name</span>{job.company.name}</div>
              <div><span className="inputLabel">Company Description</span>{job.company.description}</div>
              <div><span className="inputLabel">Seller will pick up the product or not</span><span>{job.inPerson ? 'Yes' : 'No'}</span></div>
              <div><span className="inputLabel">Weight allowed</span><span>{job.industry}</span></div>
              <div><span className="inputLabel">Distance</span><span>{job.distance}</span></div>
              <div><span className="inputLabel">Time</span><span>{job.time}</span></div>

              <div><span className="inputLabel">City</span><span>{job.City}</span></div>
              <div><span className="inputLabel">State</span><span>{job.state}</span></div>
              <div><span className="inputLabel">Zip</span><span>{job.zip}</span></div>
              {/* <div className="inputLabel"><span>Product added on {formatDate(job.createdAt)}</span></div> */}

              <div className="mt-3">
                <button className="btn-primary" onClick={handleOnApply}>Place order</button>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobHomeMain;
