import React, { createRef, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { currentUser, updateRetailShop } from "../../util/fetch/api";

const Dashboard = () => {
  const [RetailShop, setRetailShop] = useState(null);

  const reloadProfile = async () => {
    const { user: RetailShop } = await currentUser();
    setRetailShop(RetailShop);
  };
  useEffect(() => {
    (async () => {
      await reloadProfile();
    })();
  }, []);

  const nameRef = createRef();

  const handleOnSave = async () => {
    const d = {
      name: nameRef.current.value,
    };
    await updateRetailShop(d);
    await reloadProfile();
  };

  return (
    <div className="row">
      {RetailShop && (
        <>
          <Container fluid>
            <div className="inputLabel">Name</div>
            <div>
              <input type="text" ref={nameRef} defaultValue={RetailShop.name} />
            </div>
            <span className="inputLabel">
              <b>{RetailShop.name}</b>
            </span>
            / &nbsp;<span className="inputLabel">{RetailShop.email}</span>
            <div className="mt-2">
              <button className="btn-primary" onClick={handleOnSave}>
                Save
              </button>
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default Dashboard;
