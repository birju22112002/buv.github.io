/** @format */
"use client";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { ThunderboltOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Button } from "antd";
import Link from "next/link";
import FullWidthImage from "./components/pages/FullWidthImage";
import ParallaxImage from "./components/pages/ParallaxImage";
import RenderProgress from "./components/posts/RenderProgress";
import Footer from "./components/pages/Footer";
import useNumbers from "./hooks/useNumbers";
import useLatestPosts from "./hooks/useLatestPosts";
import useCategory from "./hooks/useCategory";
import { ThemeContext } from "./context/ThemeContext"; // Import ThemeContext
import styles from "./page.module.css"; // Import the CSS module

function Home() {
  // context
  const { theme } = useContext(ThemeContext); // Get the current theme from ThemeContext

  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPosts();
  const { categories } = useCategory();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [fullWidthImage, setFullWidthImage] = useState("");

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/page/home`
      );
      const data = response.data;

      if (!data) {
        throw new Error("No data returned from the server.");
      }

      setTitle(data.title || "Default Title");
      setSubtitle(data.subtitle || "Default Subtitle");
      setFullWidthImage(
        data.fullWidthImage ? data.fullWidthImage.url : "images/image1.jpeg"
      );
    } catch (err) {
      console.log(err.message || err);
    }
  };

  return (
    <>
      <div
        className={
          theme === "dark" ? styles.darkBackground : styles.lightBackground
        }>
        <FullWidthImage
          title={title}
          subtitle={subtitle}
          fullWidthImage={fullWidthImage}
        />

        <Row style={{ marginTop: 120 }}>
          {/* posts */}
          <Col
            span={6}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
            <RenderProgress
              number={numbers.posts}
              name='Posts'
              link='/pages/admin/posts'
            />
          </Col>
          {/* comments */}
          <Col
            span={6}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
            <RenderProgress
              number={numbers.comments}
              name='Comments'
              link='/pages/admin/comments'
            />
          </Col>
          {/* categories */}
          <Col
            span={6}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
            <RenderProgress
              number={numbers.categories}
              name='Categories'
              link='/pages/admin/categories'
            />
          </Col>
          {/* users */}
          <Col
            span={6}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
            <RenderProgress
              number={numbers.users}
              name='Users'
              link='/pages/admin/users'
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <ParallaxImage>
              <h2
                className={theme === "dark" ? styles.darkText : ""}
                style={{
                  textAlign: "center",
                  fontSize: "74px",
                  textShadow: "2px 2px 4px #000000",
                }}>
                BLOG POSTS
              </h2>
              <Divider className={theme === "dark" ? styles.darkDivider : ""}>
                <ThunderboltOutlined style={{ color: "white" }} />
              </Divider>
              <div style={{ textAlign: "center" }}>
                {latestPosts.map((post) => (
                  <Link href={`/pages/posts/${post.slug}`} key={post._id}>
                    <h3 className={theme === "dark" ? styles.darkText : ""}>
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </ParallaxImage>
          </Col>
        </Row>

        <Row>
          <Col
            span={24}
            style={{ textAlign: "center", marginTop: 80, marginBottom: 80 }}>
            <Divider>
              <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                {" "}
                CATEGORIES
              </h1>
            </Divider>
            <div style={{ textAlign: "center" }}>
              {categories.map((c) => (
                <Link href={`/pages/category/${c.slug}`} key={c._id}>
                  <Button
                    style={{
                      margin: 2,
                      backgroundColor: "transparent",
                      border: "1px solid",
                      color: theme === "dark" ? "#fff" : "#000",
                      transition: "all 0.3s",
                    }}
                    className={
                      theme === "dark" ? styles.darkButton : styles.lightButton
                    }>
                    {c.name}
                  </Button>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    </>
  );
}

export default Home;
