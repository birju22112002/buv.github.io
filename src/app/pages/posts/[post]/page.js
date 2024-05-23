/** @format */
"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Avatar,
  Divider,
  Button,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import { ThemeContext } from "../../../context/ThemeContext";
import CommentForm from "../../../components/comments/CommentForm";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import useCategory from "../../../hooks/useCategory";
import useLatestPosts from "../../../hooks/useLatestPosts";
import styles from "./SinglePost.module.css";

dayjs.extend(relativeTime);

const { Title } = Typography;

const SinglePost = ({ postComments = [] }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { categories } = useCategory();
  const { latestPosts, latestPostsError, latestPostsLoading } =
    useLatestPosts();

  useEffect(() => {
    const fetchPostBySlug = async (slug) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${slug}`
        );
        setPost(response.data.post);
        setComments(response.data.comments || []);
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/comment/${post._id}`, { comment });
      setComments([data, ...comments]);
      setComment("");
      toast.success("Comment posted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const shareUrl = window.location.href;

  return (
    <div
      className={`${
        theme === "dark" ? styles.darkBackground : styles.lightBackground
      }`}>
      <Head>
        <title>{post.title}</title>
        <meta
          name='description'
          content={
            post.content ? post.content.substring(0, 160) : "Post description"
          }
        />
      </Head>
      <div className={theme === "dark" ? styles.darkBackground : ""}>
        <Row gutter={12}>
          <Col xm={24} xl={16}>
            <Title className={theme === "dark" ? styles.darkText : ""}>
              {post.title}
            </Title>
            <p className={theme === "dark" ? styles.darkText : ""}>
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} /{" "}
              {comments.length} Comments / in{" "}
              {post.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`} passHref>
                    <span className={theme === "dark" ? styles.darkLink : ""}>
                      {c.name}
                    </span>
                  </Link>
                </span>
              ))}
              {post.postedBy?.name && ` / by ${post.postedBy.name}`}
            </p>
            <br />
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <FacebookShareButton url={shareUrl} quote={post.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={post.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={post.title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <Card
              className={theme === "dark" ? styles.darkCard : ""}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
              }}>
              <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              <CommentForm
                comment={comment}
                setComment={setComment}
                handleSubmit={handleSubmit}
                loading={loading}
              />
              {comments && comments.length > 0 ? (
                <List
                  itemLayout='horizontal'
                  dataSource={comments}
                  renderItem={(item) => (
                    <List.Item key={item._id}>
                      <List.Item.Meta
                        className={
                          theme === "dark" ? styles.darkCommentMeta : ""
                        }
                        avatar={
                          <Avatar
                            className={
                              theme === "dark"
                                ? styles.darkAvatar
                                : styles.lightAvatar
                            }>
                            {item?.postedBy?.name?.charAt(0)}
                          </Avatar>
                        }
                        title={
                          <span
                            style={{
                              color: theme === "dark" ? "#fff" : "#000",
                            }}>
                            {item?.postedBy?.name}
                          </span>
                        }
                        description={
                          <span
                            style={{
                              color: theme === "dark" ? "#fff" : "#000",
                            }}>{`${item.content} - ${dayjs(
                            item.createdAt
                          ).fromNow()}`}</span>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <p className={theme === "dark" ? styles.darkText : ""}>
                  No comments yet.
                </p>
              )}
            </Card>
          </Col>

          <Col xs={22} xl={6} offset={1}>
            <Divider>
              <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Categories
              </h1>
            </Divider>

            {categories.map((c) => (
              <Link href={`/pages/category/${c.slug}`} key={c._id} passHref>
                <Button
                  className={
                    theme === "dark" ? styles.darkButton : styles.lightButton
                  }
                  style={{ margin: 2 }}>
                  {c.name}
                </Button>
              </Link>
            ))}

            <Divider>
              <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Latest Posts
              </h1>
            </Divider>
            {latestPostsLoading ? (
              <p className={theme === "dark" ? styles.darkText : ""}>
                Loading latest posts...
              </p>
            ) : latestPostsError ? (
              <p className={theme === "dark" ? styles.darkText : ""}>
                Error loading latest posts: {latestPostsError.message}
              </p>
            ) : latestPosts.length > 0 ? (
              latestPosts.map((p) => (
                <Link href={`/pages/posts/${p.slug}`} key={p._id} passHref>
                  <h4 className={theme === "dark" ? styles.darkLink : ""}>
                    {p.title}
                  </h4>
                </Link>
              ))
            ) : (
              <p className={theme === "dark" ? styles.darkText : ""}>
                No latest posts available.
              </p>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SinglePost;
