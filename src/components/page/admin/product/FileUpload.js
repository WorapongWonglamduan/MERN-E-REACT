import axios from "axios";
import React, { useMemo } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

const FileUpload = () => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);

  const handleChangeFile = (e) => {
    const files = e.target.files;

    console.log("files ->", files);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            files[i],
            700,
            700,
            "JPEG",
            100,
            0,
            (uri) => {
              axios
                .post(
                  process.env.REACT_APP_API + "images",
                  { image: uri },
                  { headers: { authToken: memoizedUser.token } }
                )
                .then((res) => {
                  console.log("res =>", res);
                })
                .catch((err) => console.log(err));
              resolve(uri);
            },
            "base64"
          );
        });
      }
    }
  };

  return (
    <div className="form-group">
      <label className="btn btn-primary">
        Choose file ...
        <input
          onChange={handleChangeFile}
          className="form-control"
          type="file"
          name="file"
          hidden
          multiple
          accept="images/*"
        />
      </label>
    </div>
  );
};

export default FileUpload;
