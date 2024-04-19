/** @format */
"use client";
import { useEffect, useContext } from "react";
import { Row, Col, Button, List } from "antd";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../../context/ThemeContext";
import { PostContext } from "../../../context/PostContext";
import axios from "axios";

function Posts() {
  const [post, setPost] = useContext(PostContext);
  const { posts } = post;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts");
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    console.log("EDIT POST", post);
  };

  const handleDelete = async (post) => {
    console.log("DELETE POST", post);
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
    color: theme === "dark" ? "#fff" : "#000",
    border: "none",
  };

  const textStyle = {
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Button type='primary' style={{ ...buttonStyle, ...textStyle }}>
            <Link href='/pages/posts'>
              <PlusOutlined /> Add New
            </Link>
          </Button>
          <h1 style={{ marginTop: 15 }}>
            <b> {posts?.length} Posts</b>
          </h1>
          <List
            itemLayout='horizontal'
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                style={{ color: textStyle.color }}
                actions={[
                  <a style={textStyle} onClick={() => handleEdit(item)}>
                    edit
                  </a>,
                  <a style={textStyle} onClick={() => handleDelete(item)}>
                    delete
                  </a>,
                ]}>
                <List.Item.Meta
                  title={<span style={textStyle}>{item.title}</span>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Posts;
