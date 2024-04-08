import axios from "axios";
import React, { useMemo } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge, Space } from "antd";
const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const user = useSelector((state) => state.user);
  const memoizedUser = useMemo(() => user, [user]);

  const handleChangeFile = (e) => {
    setLoading(true);
    const files = e.target.files;
    if (files) {
      let allFilesUpload = values.images;
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
                  allFilesUpload.push(res.data);

                  setValues({ ...values, images: allFilesUpload });
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
              resolve(uri);
            },
            "base64"
          );
        });
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    const { images } = values;

    axios
      .post(
        process.env.REACT_APP_API + "remove-images",
        { public_id },
        { headers: { authToken: memoizedUser.token } }
      )
      .then((res) => {
        let filterImages = images.filter((item) => {
          if (item.public_id !== public_id) {
            return item;
          }
          return null;
        });

        setValues({ ...values, images: filterImages });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <br />
      {values.images &&
        values.images.map((item, index) => {
          return (
            <Space size={24} key={index}>
              <Badge
                onClick={() => {
                  handleRemove(item.public_id);
                }}
                style={{ cursor: "pointer" }}
                count={"x"}
              >
                <Avatar
                  className="m-3"
                  src={item.url}
                  shape="square"
                  size={120}
                />
              </Badge>
            </Space>
          );
        })}
      <hr />
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
      <br />
    </>
  );
};

export default FileUpload;
