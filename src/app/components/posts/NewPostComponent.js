/** @format */
"use client";
import React, { useState, useEffect, useContext } from "react";
import { Layout, Row, Col, Input, Select, Modal, Button, Image } from "antd";
import dynamic from "next/dynamic";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import MediaLibrary from "../media/MediaLibrary";
import { MediaContext } from "../../context/media";
import styles from "./NewPosts.module.css";

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const { Option } = Select;

function NewPostComponent({ page = "admin" }) {
  const { theme } = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false); // This is for preview modal visibility
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const router = useRouter();

  // Function to safely access localStorage
  const safeLocalStorageGetItem = (key) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  const safeLocalStorageSetItem = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  // Initialize title and content from localStorage
  useEffect(() => {
    const savedTitle = safeLocalStorageGetItem("post-title");
    const savedContent = safeLocalStorageGetItem("post-content");
    if (savedTitle) setTitle(JSON.parse(savedTitle));
    if (savedContent) setContent(JSON.parse(savedContent));
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/create-post", {
        title,
        content,
        categories,
        featuredImage: media?.selected ? media.selected._id : null,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Post created successfully");
        // Reset the state and localStorage
        setTitle("");
        setContent("");
        setCategories([]);
        setFeaturedImage(null);
        setMedia({ ...media, selected: null });
        safeLocalStorageSetItem("post-title", "");
        safeLocalStorageSetItem("post-content", "");
        setLoading(false);
        router.push(`/pages/${page}/posts/post`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Post creation failed. Try again.");
      setLoading(false);
    }
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "transparent" : "#f0f0f0",
    color: theme === "dark" ? "#fff" : "#000",
    border: theme === "dark" ? "2px solid #2f2f2f" : "none",
  };

  const textStyle = {
    color: theme === "dark" ? "#fff" : "#000",
  };

  const inputStyle = {
    backgroundColor: theme === "dark" ? "transparent" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    borderColor: theme === "dark" ? "#555" : "#d9d9d9",
  };

  const joditConfig = {
    readonly: false,
    theme: theme === "dark" ? "dark" : "default",
    style: {
      backgroundColor: theme === "dark" ? "#2f2f2f" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    },
  };

  return (
    <Row
      gutter={[16, 16]}
      style={{ marginBottom: "20px" }}
      className={theme === "dark" ? styles.darkBackground : ""}>
      <Col span={14} offset={1} style={{ padding: "20px" }}>
        <h1
          style={{
            fontSize: 20,
            color: theme === "dark" ? "white" : "black",
          }}>
          <b>Create new post</b>
        </h1>
        <br />
        <Input
          size='large'
          value={title}
          placeholder='Give your post a title'
          onChange={(e) => {
            setTitle(e.target.value);
            safeLocalStorageSetItem(
              "post-title",
              JSON.stringify(e.target.value)
            );
          }}
          style={inputStyle}
          className={theme === "dark" ? styles.darkInput : ""}
        />
        <br />
        <br />
        <div className='editor-scroll'>
          {typeof window !== "undefined" && (
            <JoditEditor
              value={content}
              tabIndex={1}
              onBlur={(newContent) => {
                setContent(newContent);
                safeLocalStorageSetItem(
                  "post-content",
                  JSON.stringify(newContent)
                );
              }}
              config={joditConfig}
              onChange={(newContent) => {}}
            />
          )}
        </div>
        <br />
        <br />
      </Col>

      <Col span={6} offset={1}>
        <Button
          style={{
            ...buttonStyle,
            ...textStyle,
            margin: "10px 0px 10px 0px",
            width: "100%",
          }}
          onClick={() => setVisible(true)}>
          Preview
        </Button>

        <Button
          style={{
            ...buttonStyle,
            ...textStyle,
            margin: "10px 0px 10px 0px",
            width: "100%",
          }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}>
          <UploadOutlined /> Featured Image
        </Button>

        <h4 style={{ color: theme === "dark" ? "white" : "black" }}>
          Categories
        </h4>
        <Select
          mode='multiple'
          allowClear={true}
          placeholder='Select categories'
          style={{ width: "100%" }}
          onChange={(v) => setCategories(v)}
          value={categories}>
          {loadedCategories.map((item) => (
            <Option key={item.name}>{item.name}</Option>
          ))}
        </Select>
        {media?.selected && (
          <div style={{ marginTop: "15px" }}>
            <Image width='100%' src={media?.selected?.url} />
          </div>
        )}

        <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type='primary'
          onClick={handlePublish}>
          Publish
        </Button>
      </Col>

      <Modal
        visible={visible}
        title='Post Preview'
        footer={null}
        onCancel={() => setVisible(false)}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Modal>

      <Modal
        visible={media.showMediaModal}
        title='Media Library'
        footer={null}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}>
        <MediaLibrary page={page} />
      </Modal>
    </Row>
  );
}

export default NewPostComponent;
