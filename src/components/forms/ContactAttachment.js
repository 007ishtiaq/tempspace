import React from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-hot-toast";

const ContactAttachment = ({
  image,
  setImage,
  setLoading,
  btnclasses,
  loading,
}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const fileUploadAndResize = (e) => {
    if (navigator.onLine) {
      // resize
      let files = e.target.files;

      if (files) {
        // Check if the file is an image
        if (!files[0].type.startsWith("image/")) {
          setLoading(false);
          toast.error("Selected Image Type is Invalid.");
          return;
        }
      }

      if (files) {
        setLoading(true);
        Resizer.imageFileResizer(
          files[0],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/attachment`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                setImage(res.data);
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    } else {
      dispatch({
        type: "SET_NETMODAL_VISIBLE",
        payload: true,
      });
      // Reset the value of the file input
      const fileInput = document.getElementById("contact-attachment");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const handleImageRemove = (public_id) => {
    if (navigator.onLine) {
      setLoading(true);

      // Reset the value of the file input
      const fileInput = document.getElementById("contact-attachment");
      if (fileInput) {
        fileInput.value = "";
      }

      axios
        .post(
          `${process.env.REACT_APP_API}/removeattachment`,
          { public_id },
          {
            headers: {
              authtoken: user ? user.token : "",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setImage("");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      dispatch({
        type: "SET_NETMODAL_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      {loading ? (
        <div className="imgattachcont">
          <Skeleton height={100} width={100} borderRadius={0.4} />
        </div>
      ) : (
        image && (
          <Badge
            count="X"
            key={image.public_id}
            onClick={() => handleImageRemove(image.public_id)}
            style={{ cursor: "pointer" }}
            className="imgattachcont"
          >
            <Avatar src={image.url} size={100} shape="square" />
          </Badge>
        )
      )}

      <div className="">
        <label className={`mybtn btnprimary ${btnclasses}`}>
          Choose File <span className="optattach"> (optional)</span>
          <input
            id="contact-attachment"
            type="file"
            hidden
            disabled={image}
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default ContactAttachment;
