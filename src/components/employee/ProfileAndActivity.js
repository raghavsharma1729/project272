import React, { createRef, useEffect, useState } from 'react';
import {
  currentUser, fileUrl, updateEmployee,
} from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const ProfileAndActivity = () => {
  const [employee, setEmployee] = useState(null);

  const reloadProfile = async () => {
    const { user: employee } = await currentUser();
    setEmployee(employee);
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
    await updateEmployee(d);
    await reloadProfile();
  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateEmployee({ profilePic: fileId });
    setEmployee({ ...employee, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-6">
        {employee && (
          <>
            <div className="imageTile">
              {employee.profilePic
                ? <img src={fileUrl(employee.profilePic)} alt="" />
                : <div>No pic uploaded</div>}
            </div>

            <FileUpload singleFile onUpload={handleOnFileUpload} />

            <div className="inputLabel">Name</div>
            <div><input type="text" ref={nameRef} defaultValue={employee.name} /></div>

            <span className="inputLabel"><b>{employee.name}</b></span>/
            &nbsp;<span className="inputLabel">{employee.email}</span>

            <div className="mt-2">
              <button className="btn-primary" onClick={handleOnSave}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

ProfileAndActivity.propTypes = {};

export default ProfileAndActivity;
