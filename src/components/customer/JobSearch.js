import React, { createRef, useEffect, useState } from "react";
import { searchItem } from "../../util/fetch/api";
import { formatDate, slicePage } from "../../util";
import Paginate from "../Paginate";

const ItemSearch = () => {
  const [items, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const searchTextRef = createRef();

  // TODO useCallback
  const handleOnSearch = async () => {
    const text = searchTextRef.current.value;
    setItem(await searchItem(text));
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
          {items.length === 0 && <div>No products to show</div>}
          {slicePage(items, currentPage).map((item) => {
            return (
              <div key={item._id} className="card mb-3">
                <div className="card-body">
                  <h5>
                    <a
                      href={`/#/jobHome/${item._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </h5>

                  <div>
                    <span className="inputLabel">Brand</span>
                    <span>{item.brand}</span>
                    <span className="divider" />
                    <span className="inputLabel">Price</span>
                    <span>
                      ${item.price
                      }
                    </span>
                  </div>

                  <div>
                    <span className="inputLabel">Seller name</span>
                    <span>{item.seller.name}</span>
                  </div>
                  <div>
                    <span className="inputLabel">Condition :</span>
                    <span>{item.condition}</span>
                  </div>
                  <div>
                    <span className="inputLabel">Description </span>
                    <span>{item.description}</span>
                  </div>
                  <div>
                    <span className="inputLabel">Purchased Date</span>
                    <span>{formatDate(item.purchasedDate)}</span>
                  </div>

                  <div>
                    <span className="inputLabel">Posted On</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <Paginate
            numItems={items.length}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

ItemSearch.propTypes = {};

export default ItemSearch;
