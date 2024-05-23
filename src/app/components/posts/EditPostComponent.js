/** @format */

import React, { useState, useEffect, useContext } from "react";
import { Layout, Row, Col, Input, Select, Modal, Button, Image } from "antd";
import JoditEditor from "jodit-react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import Media from "../media/page";
import { MediaContext } from "../../context/media";
import MediaLibrary from "../media/MediaLibrary";
import styles from "./NewPosts.module.css";

const { Option } = Select;

function EditPostComponent({ page = "admin" }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [postId, setPostId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const slug = getSlugFromUrl();
    if (slug) {
      loadPostAndCategories(slug);
    }
  }, []);

  useEffect(() => {
    if (media?.selected) {
      setFeaturedImage(media.selected);
    }
  }, [media?.selected]);

  const getSlugFromUrl = () => {
    const pathArray = window.location.pathname.split("/");
    return pathArray[pathArray.length - 1];
  };

  const loadPostAndCategories = async (slug) => {
    try {
      const [postData, categoriesData] = await Promise.all([
        axios.get(`/post/${slug}`),
        axios.get("/categories"),
      ]);

      if (postData.data) {
        const {
          title,
          content,
          categories = [],
          featuredImage,
          _id,
        } = postData.data.post;
        setTitle(title);
        setContent(content);
        setLoadedCategories(categoriesData.data || []);
        setSelectedCategories(categories.map((cat) => cat._id) || []);
        setFeaturedImage(featuredImage);
        setPostId(_id);
      } else {
        toast.error("No post data found");
        router.push(`/pages/${page}/posts`);
      }
    } catch (err) {
      console.error("Error fetching post data:", err);
      toast.error("Error fetching post data");
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/edit-post/${postId}`, {
        title,
        content,
        categories: selectedCategories,
        featuredImage: media?.selected?._id
          ? media.selected._id
          : featuredImage?._id,
        publish: true,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Post updated successfully");

        if (data.published) {
          router.push(`/pages/${page}/posts/post`);
        } else {
          router.push(`/`);
        }
      }
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
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
          style={{ fontSize: 20, color: theme === "dark" ? "white" : "black" }}>
          <b>Edit Post</b>
        </h1>
        <Input
          size='large'
          value={title}
          placeholder='Give your post a title'
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          className={theme === "dark" ? styles.darkInput : ""}
        />
        <br />
        <br />
        <div className='editor-scroll'>
          <JoditEditor
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            config={joditConfig}
            onChange={(newContent) => {}}
          />
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
          onChange={(v) => setSelectedCategories(v)}
          value={selectedCategories}>
          {loadedCategories.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>

        {featuredImage?.url && (
          <div style={{ marginTop: "15px" }}>
            <Image width='100%' src={featuredImage.url} />
          </div>
        )}
        {/* {media?.selected && (
          <div style={{ marginTop: "15px" }}>
            <Image width='100%' src={media?.selected?.url} />
          </div>
        )} */}

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

export default EditPostComponent;
