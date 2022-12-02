import React, { createRef, useEffect, useState } from 'react';
import { currentUser, fileUrl, updateSeller } from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const Overview = () => {
  const [seller, setSeller] = useState({});

  const reloadProfile = async () => {
    const { user: seller } = await currentUser();
    setSeller(seller);
  };
  useEffect(() => {
    (async () => {
      await reloadProfile();
    })();
  }, []);

  const descriptionRef = createRef();

  const handleOnSave = async () => {
    const d = {
      description: descriptionRef.current.value,
    };
    await updateSeller(d);
    await reloadProfile();
    const { user: seller } = await currentUser();
    setSeller(seller);
  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateSeller({ profilePic: fileId });
    setSeller({ ...seller, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-12">
        <h6><span className="inputLabel">{seller.name}&nbsp;({seller.email})</span></h6>
        <div className="imageTile">
          {seller.profilePic
            ? <img src={fileUrl(seller.profilePic)} alt="" />
            : <div>No pic uploaded</div>}
        </div>

        <FileUpload singleFile onUpload={handleOnFileUpload} />

        <div className="inputLabel">Description</div>
        <div><input type="text" ref={descriptionRef} defaultValue={seller.description} /></div>
        <div className="mt-2">
          <button className="btn-primary" onClick={handleOnSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {};

export default Overview;
