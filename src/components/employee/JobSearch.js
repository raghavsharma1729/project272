import React, { createRef, useEffect, useState } from "react";
import { searchJobPosting } from "../../util/fetch/api";
import { formatDate, slicePage } from "../../util";
import Paginate from "../Paginate";

const JobSearch = () => {
  const [jobPosting, setJobPosting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const searchTextRef = createRef();

  // TODO useCallback
  const handleOnSearch = async () => {
    const text = searchTextRef.current.value;
    setJobPosting(await searchJobPosting(text));
  };

  useEffect(() => {
    (async () => {
      await handleOnSearch();
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex">
          <input
            type="text"
            className="w-100"
            placeholder="Search for products"
            ref={searchTextRef}
          />
          &nbsp;&nbsp;
          <button className="btn-primary" onClick={handleOnSearch}>
            Search
          </button>
        </div>

        <div className="mt-3">
          {jobPosting.length === 0 && <div>No products to show</div>}
          {slicePage(jobPosting, currentPage).map((job) => {
            return (
              <div key={job._id} className="card mb-3">
                <div className="card-body">
                  <h5>
                    <a
                      href={`/#/jobHome/${job._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {job.title}
                    </a>
                  </h5>

                  <div>
                    <span className="inputLabel">Company address</span>
                    <span>{[job.city, job.state, job.zip].join(", ")}</span>
                    <span className="divider" />
                    <span className="inputLabel">Type</span>
                    <span>
                      {job.inPerson
                        ? "Self-Drop off"
                        : "Will be picked by company"}
                    </span>
                  </div>

                  <div>
                    <span className="inputLabel">Company name</span>
                    <span>{job.company.name}</span>
                  </div>
                  <div>
                    <span className="inputLabel">Max Weight Allowed</span>
                    <span>{job.industry}</span>
                  </div>
                  <div>
                    <span className="inputLabel">Max Distance Allowed</span>
                    <span>{job.distance}</span>
                  </div>
                  <div>
                    <span className="inputLabel">Time</span>
                    <span>{job.time}</span>
                  </div>

                  <div>
                    <span className="inputLabel">Price</span>
                    <span>{job.country}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <Paginate
            numItems={jobPosting.length}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

JobSearch.propTypes = {};

export default JobSearch;
