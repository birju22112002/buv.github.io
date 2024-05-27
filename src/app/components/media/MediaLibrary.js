/** @format */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Upload, message, Image, Badge } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import { CloseCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { MediaContext } from "../../context/media";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Media.module.css";
const { Dragger } = Upload;

const MediaLibrary = ({ page = "admin" }) => {
  // context
  const [auth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  const [showPreview, setShowMedia] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get("/media");
        setMedia((prev) => ({ ...prev, images: data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedia();
  }, []);

  const props = {
    name: "file",
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setMedia({
          images: [...media.images, info.file.response.data],
          selected: info.file.response.data,
          showMediaModal: false,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleImageDelete = async (imageId) => {
    try {
      const { data } = await axios.delete(`/media/${imageId}`);
      if (data.ok) {
        setMedia({
          ...media,
          images: media.images.filter((image) => image._id !== imageId),
          selected: null,
        });
        toast.error("Image deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dragger {...props} accept='image/*'>
        <p
          className={`${
            theme === "dark" ? styles.darkUploadText : ""
          } ant-upload-text`}>
          <InboxOutlined />
        </p>
        <p
          className='ant-upload-text'
          style={{
            marginBottom: "-10px",
            color: theme === "dark" ? "#fff" : "#000",
          }}>
          Click or drag file to this area to upload
        </p>
      </Dragger>

      <div style={{ textAlign: "center" }}>
        {media?.images?.map(
          (image) =>
            image && (
              <Badge key={image._id}>
                <Image
                  onClick={() => setMedia({ ...media, selected: image })}
                  preview={showPreview}
                  src={image.url}
                  style={{
                    paddingTop: 5,
                    paddingRight: 10,
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                <br />
                <br />
                {(page === "author" || page === "admin") && (
                  <CloseCircleOutlined
                    onClick={() => handleImageDelete(image._id)}
                    style={{
                      marginTop: "5px",
                      color: "#f5222d",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Badge>
            )
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
