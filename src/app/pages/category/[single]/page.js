/** @format */
"use client";

import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button, Divider, Avatar, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import useCategory from "../../../hooks/useCategory";
import useLatestPosts from "../../../hooks/useLatestPosts";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./SingleCategory.module.css"; // Import the CSS module

dayjs.extend(relativeTime);
const { Title } = Typography;

const SingleCategory = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const { theme } = useContext(ThemeContext);

  const router = useRouter();

  // hooks
  const { categories } = useCategory();
  const { latestPosts, latestPostsError, latestPostsLoading } =
    useLatestPosts();

  useEffect(() => {
    const fetchData = async (slug) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/posts-by-category/${slug}`
        );
        setPosts(response.data.posts);
        setCategory(response.data.category);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const slugFromPathname = window.location.pathname.split("/").pop();
    if (slugFromPathname) {
      fetchData(slugFromPathname);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{category.name}</title>
        <meta
          name='description'
          content={`Read latest posts on ${category.name}`}
        />
      </Head>

      <div
        className={theme === "dark" ? styles.darkBackground : ""}
        style={{ padding: "20px" }}>
        <Row gutter={12}>
          <Col sm={24} lg={18} style={{ marginBottom: 12 }}>
            <h1
              style={{
                textAlign: "center",
                color: theme === "dark" ? "#fff" : "#000",
              }}>
              Posts in {category.name}
            </h1>

            {posts.map((post) => (
              <Card
                key={post._id}
                className={theme === "dark" ? styles.darkCard : ""}
                style={{ marginBottom: 12 }}>
                <div style={{ display: "flex" }}>
                  <Avatar
                    shape='circle'
                    size={60}
                    style={{ marginRight: 15 }}
                    src={post.featuredImage?.url || "/images/default.jpeg"}
                    alt={post.title}
                  />

                  <div>
                    <Link href={`/pages/posts/${post.slug}`}>
                      <Title
                        level={3}
                        className={theme === "dark" ? styles.darkTitle : ""}
                        style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                        {post.title}
                      </Title>
                    </Link>
                    <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                      {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / by{" "}
                      {post?.postedBy?.name}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </Col>
          <Col xs={24} xl={6}>
            <Divider className={theme === "dark" ? styles.darkDivider : ""}>
              <h1
                style={{
                  color: theme === "dark" ? "#fff" : "#000",
                  marginBottom: "7px",
                }}>
                Categories
              </h1>
            </Divider>
            {categories.map((c) => (
              <Link href={`/pages/category/${c.slug}`} key={c._id}>
                <Button
                  className={theme === "dark" ? styles.darkButton : ""}
                  style={{ margin: 2 }}>
                  {c.name}
                </Button>
              </Link>
            ))}

            <Divider className={theme === "dark" ? styles.darkDivider : ""}>
              <h1
                style={{
                  color: theme === "dark" ? "#fff" : "#000",
                  marginBottom: "7px",
                }}>
                Latest Posts
              </h1>
            </Divider>
            {latestPostsLoading ? (
              <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Loading latest posts...
              </p>
            ) : latestPostsError ? (
              <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                Error loading latest posts: {latestPostsError.message}
              </p>
            ) : latestPosts.length > 0 ? (
              latestPosts.map((p) => (
                <Link href={`/pages/posts/${p.slug}`} key={p._id}>
                  <h4 className={theme === "dark" ? styles.darkTitle : ""}>
                    {p.title}
                  </h4>
                </Link>
              ))
            ) : (
              <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                No latest posts available.
              </p>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SingleCategory;
