/** @format */

"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Row, Col, Card, Typography, List, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import { ThemeContext } from "../../../context/ThemeContext";
import CommentForm from "../../../components/comments/CommentForm";
import relativeTime from "dayjs/plugin/relativeTime";

import { toast } from "react-hot-toast";

dayjs.extend(relativeTime);

const { Title } = Typography;

const SinglePost = ({ postComments = [] }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useContext(ThemeContext);
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostBySlug = async (slug) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${slug}`
        );
        setPost(response.data.post);
        setComments(response.data.comments || []); // Ensure comments are set and handle undefined
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
      // Assuming you have a toast function defined
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

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name='description'
          content={
            post.content ? post.content.substring(0, 160) : "Post description"
          }
        />
      </Head>
      <Row gutter={12}>
        <Col xm={24} xl={16}>
          <Title>{post.title}</Title>
          <p>
            {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} /{" "}
            {comments.length} Comments / in{" "}
            {post.categories.map((c) => (
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
                      avatar={
                        <Avatar>{item?.postedBy?.name?.charAt(0)}</Avatar>
                      }
                      title={item?.postedBy?.name}
                      description={`${item.content} - ${dayjs(
                        item.createdAt
                      ).fromNow()}`}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p>No comments yet.</p>
            )}
          </Card>
        </Col>

        <Col xs={22} xl={6} offset={1}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          officia suscipit assumenda ducimus dolorum optio, natus id blanditiis
          aliquid, quibusdam quasi alias. Nobis excepturi cupiditate minima sed
          in fugit eaque, quod vitae suscipit sit maxime. Vitae consequuntur
          alias rerum, consectetur modi incidunt unde ipsam optio amet
          praesentium quo exercitationem asperiores eveniet cupiditate illo.
          Nemo quo, esse impedit id ipsum magnam earum dolores inventore, quidem
          doloremque nesciunt ad fugit quis deleniti provident corrupti
          doloribus eum quisquam, quae non? Eveniet, accusantium doloremque, in
          repudiandae tempore voluptas velit est obcaecati qui itaque illum
          eligendi amet ipsum, culpa modi ut. Laudantium libero blanditiis qui?
        </Col>
      </Row>
    </>
  );
};

export default SinglePost;
