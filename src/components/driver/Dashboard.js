import React, { createRef, useEffect, useState } from 'react';
import {
  currentUser, fileUrl, updateDriver,
} from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const Dashboard = () => {
  const [driver, setDriver] = useState(null);

  const reloadProfile = async () => {
    const { user: driver } = await currentUser();
    setDriver(driver);
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
    await updateDriver(d);
    await reloadProfile();
  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateDriver({ profilePic: fileId });
    setDriver({ ...driver, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-6">
        {driver && (
          <>
            <div className="imageTile">
              {driver.profilePic
                ? <img src={fileUrl(driver.profilePic)} alt="" />
                : <div>No pic uploaded</div>}
            </div>

            <FileUpload singleFile onUpload={handleOnFileUpload} />

            <div className="inputLabel">Name</div>
            <div><input type="text" ref={nameRef} defaultValue={driver.name} /></div>

            <span className="inputLabel"><b>{driver.name}</b></span>/
            &nbsp;<span className="inputLabel">{driver.email}</span>

            <div className="inputLabel">Status - <span><b>{driver.availabilityStatus}</b></span></div>

            <div className="mt-2">
              <button className="btn-primary" onClick={handleOnSave}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
