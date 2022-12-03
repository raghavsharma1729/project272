import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  putOrder, currentUser, fileUrl, getItem,
} from '../util/fetch/api';
import { formatDate } from '../util';

const ItemHomeMain = () => {
  const { id: itemId } = useParams();
  const [item, setItem] = useState(null);
  const [employee, setEmployee] = useState(null);


  useEffect(() => {
    (async () => {
      const { user } = await currentUser();
      setEmployee(user);
      setItem(await getItem(itemId));
    })();
  }, [itemId]);

  const handlePlaceOrder = async () => {
    await putOrder(itemId);
    window.alert('Order has been placed!');
    window.open("/buyer/orders");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-dark">
        <a className="navbar-brand text-light" href="#/">re$ellit</a>
        <a className="nav-link text-light" href="#/buyer/search">Search Items</a>
        <a className="nav-link" href="#/logout">Logout</a>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            {item && employee && (
              <>
                <h5>{item.title}</h5>
                <div >
                  {item.picture
                    ? <img src={fileUrl(item.picture)} alt="" style={{ width: '350px' }} />
                    : <div>No pic available</div>}
                </div>
                <div><span className="inputLabel">Brand</span><span>{item.brand}</span></div>
                <div><span className="inputLabel">Price</span><span>{item.price}</span></div>
                <div><span className="inputLabel">Seller</span>{item.seller.name}</div>
                <div className="imageTile">
                  {item.seller.profilePic
                    ? <img src={fileUrl(item.seller.profilePic)} alt="" />
                    : <div>No pic available</div>}
                </div>
                <div><span className="inputLabel">Description</span>{item.description}</div>
                <div><span className="inputLabel">Price</span><span>${item.price}</span></div>
                <div><span className="inputLabel">Condition</span><span>{item.condition}</span></div>
                <div><span className="inputLabel">Purchased Date</span><span>{formatDate(item.purchasedDate)}</span></div>
                <div><span className="inputLabel">Posted On</span><span>{formatDate(item.createdAt)}</span></div>
                {item.status === 'available' ?
                  <div className="mt-3">
                    <button className="btn-primary" onClick={handlePlaceOrder}>Place order</button>
                  </div> :
                  <div >
                    <span className="inputLabel">Status</span>
                    <span style={{ backgroundColor: 'red', padding: '6px', borderRadius: 5 }}>{item.status}</span>
                  </div>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemHomeMain;
