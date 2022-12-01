import React, { createRef, useEffect, useState } from "react";
import {
  currentUser,
  fileUrl,
  updateDriver,
  updateShopper,
} from "../../util/fetch/api";
import FileUpload from "../common/FileUpload";

const Dashboard = () => {
  const [shopper, setShopper] = useState(null);

  const reloadProfile = async () => {
    const { user: shopper } = await currentUser();
    setShopper(shopper);
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
    await updateShopper(d);
    await reloadProfile();
  };

  return (
    <div className="row">
      <div className="col-6">
        {shopper && (
          <>
            <div className="inputLabel">Name</div>
            <div>
              <input type="text" ref={nameRef} defaultValue={shopper.name} />
            </div>
            <span className="inputLabel">
              <b>{shopper.name}</b>
            </span>
            / &nbsp;<span className="inputLabel">{shopper.email}</span>
            <div className="mt-2">
              <button className="btn-primary" onClick={handleOnSave}>
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
