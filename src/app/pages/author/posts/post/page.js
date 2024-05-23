/** @format */

"use client";
import { useState, useEffect, useContext } from "react";
import { Row, Col, Button, List, Input } from "antd";
import AuthorLayout from "../../../../components/layouts/AuthorLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../../../context/ThemeContext";
import { PostContext } from "../../../../context/PostContext";
import { useRouter } from "next/navigation";
import PostsList from "../../../../components/posts/PostList";
import { toast } from "react-hot-toast";
import axios from "axios";
import styles from "./Posts.module.css";

function Posts() {
  const [post, setPost] = useContext(PostContext);
  const { posts } = post;
  const { theme } = useContext(ThemeContext);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts-by-author");
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    router.push(`/pages/author/posts/post/${post.slug}`);
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/post/${post._id}`);
      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id),
        }));
        toast.success("Post successfully deleted");
      }
    } catch (err) {
      console.log(err);
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
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <Button
            type='primary'
            style={{ ...buttonStyle, ...textStyle, margin: "15px" }}
            className={
              theme === "dark" ? styles.darkButton : styles.lightButton
            }>
            <Link href='/pages/author/posts'>
              <PlusOutlined /> Add New
            </Link>
          </Button>
          <h1
            style={{
              marginTop: 15,
              margin: 15,
              color: theme === "dark" ? "#fff" : "#000",
            }}>
            <b> {posts?.length} Posts</b>
          </h1>

          <Input
            placeholder='Search'
            type='search'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            style={inputStyle}
            className={theme === "dark" ? styles.darkInput : ""}
          />

          <PostsList
            posts={posts?.filter((p) =>
              p.title.toLowerCase().includes(keyword)
            )}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </AuthorLayout>
  );
}

export default Posts;
