import React, { createRef, useEffect, useState } from 'react';
import { currentUser, updateCustomer } from '../../util/fetch/api';

const Demographics = () => {
  const [customer, setCustomer] = useState(null);

  const reloadDemographics = async () => {
    const { user: customer } = await currentUser();
    setCustomer(customer);
  };
  useEffect(() => {
    (async () => {
      await reloadDemographics();
    })();
  }, []);

  const placeRef = createRef();
  const addressRef = createRef();
  const stateRef = createRef();

  const handleOnSave = async () => {
    const d = {
      place: placeRef.current.value,
      addressLine: addressRef.current.value,
      state: stateRef.current.value,
    };
    await updateCustomer(d);
    await reloadDemographics();
  };

  return (
    <div className="row">
      <div className="col-6">
        {customer && (
          <>
            <div className="inputLabel">Deliver to</div>
            <input type="text" ref={placeRef} defaultValue={customer.place} />
            <div className="inputLabel">Address</div>
            <input
              type="text"
              ref={addressRef}
              defaultValue={customer.addressLine}
            />
            <div className="inputLabel">State</div>
            <input
              type="text"
              ref={stateRef}
              defaultValue={customer.state}
            />
            <div className="mt-2">
              <button className="btn-primary" onClick={handleOnSave}>
                Save
              </button>
            </div>

          </>
        )}

      </div>
      {customer && (
        <div className="col-6">
          <div className="card mb-3">
            <div className="card-header">
              <div className="small inputLabel">Your Saved Information</div>
            </div>
            <div className="card-body">
              <div className="inputLabel">Deliver to</div>
              <div>{customer.place}</div>
              <div className="inputLabel">Address</div>
              <div>{customer.addressLine}</div>
              <div className="inputLabel">State</div>
              <div>{customer.state}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Demographics.propTypes = {};

export default Demographics;
