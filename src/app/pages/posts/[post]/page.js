/** @format */

"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Row, Col, Card, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import { ThemeContext } from "../../../context/ThemeContext";

const { Title } = Typography;
const { Meta } = Card;

const SinglePost = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPostBySlug = async (slug) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${slug}`
        );
        setPost(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError("Post not found");
        } else {
          setError(error.message);
        }
      }
    };

    const slugFromPathname = window.location.pathname.split("/").pop();

    if (slugFromPathname) {
      fetchPostBySlug(slugFromPathname);
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>{post ? post.title : "Post"}</title>
        <meta
          name='description'
          content={post ? post.description : "Post description"}
        />
      </Head>
      {post && (
        <>
          <Head>
            <title>{post.title}</title>
            <meta description={post.content.substring(0, 160)} />
          </Head>
          <Row gutter={12}>
            <Col xm={24} xl={16}>
              <Title>{post.title}</Title>
              <p>
                {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0
                Comments / in{" "}
                {post?.categories.map((c) => (
                  <span key={c._id}>
                    <Link href={`/category/${c.slug}`}>{c.name}</Link>
                  </span>
                ))}
                {post.postedBy?.name && ` / by ${post.postedBy.name}`}
              </p>
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  maxHeight: "calc(100vh - 100px)",
                  overflowY: "auto",
                }}>
                <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </Card>
            </Col>

            <Col xm={24} xl={8}>
              Sidebar
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SinglePost;
