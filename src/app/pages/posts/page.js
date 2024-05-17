/** @format */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";

const { Meta } = Card;

const Posts = () => {
  const [posts, setPosts] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts");
        setPosts(response.data);
      } catch (error) {
        setError("Failed to fetch posts");
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
        <meta description='Blog posts about web development, programing etc' />
      </Head>
      <Row gutter={12}>
        {posts.map((post) => (
          <Col
            xs={24}
            xl={8}
            style={{ marginTop: 5, marginBottom: 5 }}
            key={post.id}>
            <Link href={`/pages/posts/${post.slug}`}>
              <Card
                hoverable
                cover={
                  <Avatar
                    shape='square'
                    style={{ height: "200px" }}
                    src={post.featuredImage?.url || "/images/default.jpeg"}
                    alt={post.title}
                  />
                }>
                <Meta title={post.title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Posts;
