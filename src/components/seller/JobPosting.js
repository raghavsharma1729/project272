import React, { createRef, useEffect, useState } from 'react';
import { addItem, getItems } from '../../util/fetch/api';
import { formatDate, slicePage } from '../../util';
import Paginate from '../Paginate';

const Item = () => {
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const reloadItems = async () => {
    const items = await getItems();
    setItem(items);
  };
  useEffect(() => {
    (async () => {
      await reloadItems();
    })();
  }, []);

  const titleRef = createRef();
  const descriptionRef = createRef();
  const priceRef = createRef();
  const conditionRef = createRef();
  const brandRef = createRef();
  const purchasedRef = createRef();

  const handleOnAdd = async () => {
    const d = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      condition: conditionRef.current.value,
      brand: brandRef.current.value,
      purchasedDate: purchasedRef.current.value,
    };
    await addItem(d);
    await reloadItems();
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Add a new item</h6>
        <div className="inputLabel">Name</div>
        <input type="text" ref={titleRef} />
        <div className="inputLabel">Description</div>
        <input type="text" ref={descriptionRef} />
        <div className="inputLabel">Price(Dollars)</div>
        <input type="number" ref={priceRef} />
        <div className="inputLabel">Condition</div>
        <input type="text" ref={conditionRef} />
        <div className="inputLabel">Brand</div>
        <input type="text" ref={brandRef} />
        <div className="inputLabel">Purchased Date</div>
        <input type="date" name="workStyle" ref={purchasedRef} />
        <div className="mt-3">
          <button className="btn-primary" onClick={handleOnAdd}>
            Add
          </button>
        </div>
      </div>
      <div className="col-6">
        <h6>Products</h6>
        {item.length === 0 && (
          <div>You have not added any products yet.</div>
        )}
        {slicePage(item, currentPage).map((j) => {
          return (
            <div key={j._id} className="card mb-3">
              <div className="card-body">
                <div>
                  <span className="inputLabel">Package name&nbsp;</span>
                  {j.title}
                </div>
                <div>
                  <span className="inputLabel">description&nbsp;</span>
                  {j.description}
                </div>
                <div>
                  <span className="inputLabel">Price&nbsp;</span>
                  ${j.price}
                </div>
                <div>
                  <span className="inputLabel">condition&nbsp;</span>
                  {j.condition}
                </div>
                <div>
                  <span className="inputLabel">brand&nbsp;</span>
                  {j.brand}
                </div>
                <div>
                  <span className="inputLabel">purchasedDate&nbsp;</span>
                  {formatDate(j.purchasedDate)}
                </div>
                <div className="small inputLabel">
                  Created on {formatDate(j.createdAt)}
                </div>
                <div>
                  <span className="inputLabel">Status&nbsp;</span>
                  {j.status}
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-3">
          <Paginate
            numItems={item.length}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {};

export default Item;
