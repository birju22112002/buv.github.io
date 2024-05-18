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
        } = postData.data.post; // Adjusting to the expected structure { post: { ... } }
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

  return (
    <Row>
      <Col span={14} offset={1}>
        <h1>EDIT post</h1>
        <Input
          size='large'
          value={title}
          placeholder='Give your post a title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <div className='editor-scroll'>
          <JoditEditor
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </div>
        <br />
        <br />
      </Col>

      <Col span={6} offset={1}>
        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setVisible(true)}>
          Preview
        </Button>

        <Button
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          onClick={() => setMedia({ ...media, showMediaModal: true })}>
          <UploadOutlined /> Featured Image
        </Button>

        <h4>Categories</h4>
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

        {media?.selected ? (
          <div style={{ marginTop: "15px" }}>
            <Image width='100%' src={media?.selected?.url} />
          </div>
        ) : featuredImage?.url ? (
          <div style={{ marginTop: "15px" }}>
            <Image width='100%' src={featuredImage?.url} />
          </div>
        ) : null}

        <Button
          loading={loading}
          style={{ margin: "10px 0px 10px 0px", width: "100%" }}
          type='primary'
          onClick={handlePublish}>
          Publish
        </Button>
      </Col>

      <Modal
        title='Preview'
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={720}
        footer={null}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Modal>

      <Modal
        visible={media.showMediaModal}
        title='Media'
        onOk={() => setMedia({ ...media, showMediaModal: false })}
        onCancel={() => setMedia({ ...media, showMediaModal: false })}
        width={720}
        footer={null}>
        <Media />
      </Modal>
    </Row>
  );
}

export default EditPostComponent;
