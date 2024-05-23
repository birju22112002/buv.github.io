/** @format */
"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Card, Avatar, Button } from "antd";
import Head from "next/head";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./Posts.module.css";

const { Meta } = Card;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [allPosts, setAllPosts] = useState(posts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/post-count");
      console.log("total", data);
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${page}`);
      if (data && Array.isArray(data.posts)) {
        setAllPosts([...allPosts, ...data.posts]);
      } else {
        throw new Error("Unexpected response format");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts/1");
        // console.log("Fetched posts response:", response);

        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          setAllPosts(response.data.posts);
        } else {
          throw new Error("Unexpected response format: no posts array");
        }
      } catch (error) {
        setError("Failed to fetch posts");
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Recent blog Posts</title>
        <meta
          name='description'
          content='Blog posts about web development, programming etc'
        />
      </Head>
      <div className={theme === "dark" ? styles.darkBackground : ""}>
        <Row gutter={12}>
          {allPosts.map((post) => (
            <Col
              xs={24}
              xl={8}
              style={{ marginTop: 5, marginBottom: 5 }}
              key={post.id}>
              <Link href={`/pages/posts/${post.slug}`}>
                <Card
                  hoverable
                  className={theme === "dark" ? styles.darkCard : ""}
                  cover={
                    <Avatar
                      shape='square'
                      style={{ height: "200px" }}
                      src={post.featuredImage?.url || "/images/default.jpeg"}
                      alt={post.title}
                    />
                  }>
                  <Meta
                    title={
                      <span className={theme === "dark" ? styles.darkText : ""}>
                        {post.title}
                      </span>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        {allPosts?.length < total && (
          <Row>
            <Col span={24} style={{ textAlign: "center", padding: 20 }}>
              <Button
                size='large'
                type='primary'
                loading={loading}
                onClick={() => setPage(page + 1)}>
                Load More
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Posts;
