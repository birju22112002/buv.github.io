/** @format */
"use client";
import { useContext, useState, useEffect, useCallback } from "react";
import { Layout, Row, Col, Input, Select, Modal, Button } from "antd";
import AdminLayout from "../../components/layouts/AdminLayout";
import JoditEditor from "jodit-react";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const { Option } = Select;

function NewPost() {
  const router = useRouter();
  // load from local storage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("post-title")) {
        return localStorage.getItem("post-title");
      }
    }
  };

  const savedContent = () => {
    if (process.browser) {
      if (localStorage.getItem("post-content")) {
        return localStorage.getItem("post-content");
      }
    }
  };

  // context
  const { theme, setTheme } = useContext(ThemeContext);

  // state
  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // hook

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
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        // console.log("POST PUBLISHED RES => ", data);
        toast.success("Post created successfully");
        localStorage.removeItem("post-title");
        localStorage.removeItem("post-content");
        router.push(`/pages/posts/post`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Post create failed. Try again.");
      setLoading(false);
    }
  };

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
    localStorage.setItem("post-content", newContent);
  }, []);

  return (
    <AdminLayout>
      <Row>
        <Col span={14} offset={1}>
          <h1>Create new post</h1>
          <Input
            size='large'
            value={title}
            placeholder='Give your post a title'
            onChange={(e) => {
              setTitle(e.target.value);
              localStorage.setItem("post-title", e.target.value);
            }}
          />
          <br />
          <br />
          <div className='editor-scroll'>
            <JoditEditor
              value={content}
              onChange={handleContentChange}
              config={{
                uploader: {
                  insertImageAsBase64URI: true,
                  url: "/your-upload-endpoint",
                  headers: {},
                },
              }}
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

          <h4>Categories</h4>

          <Select
            mode='multiple'
            allowClear={true}
            placeholder='Select categories'
            style={{ width: "100%" }}
            onChange={(v) => setCategories(v)}>
            {loadedCategories.map((item) => (
              <Option key={item.name}>{item.name}</Option>
            ))}
          </Select>

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
          <JoditEditor
            value={content}
            config={{
              readOnly: true,
            }}
          />
        </Modal>
      </Row>
    </AdminLayout>
  );
}

export default NewPost;
