/** @format */

"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/auth";
import Head from "next/head";
import FullWidthImage from "./components/pages/FullWidthImage";
import useNumbers from "./hooks/useNumbers";
import RenderProgress from "./components/posts/RenderProgress";
import { Row, Col, Divider, Button } from "antd";
import useLatestPosts from "./hooks/useLatestPosts";
import useCategory from "./hooks/useCategory";
import Link from "next/link";
import ParallaxImage from "./components/pages/ParallaxImage";
import { ThunderboltOutlined } from "@ant-design/icons";
import Footer from "./components/pages/Footer";
import axios from "axios";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPosts();
  const { categories } = useCategory();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  // const [loading, setLoading] = useState("");
  const [fullWidthImage, setFullWidthImage] = useState("");

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const response = await axios.get("/page/home");
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
      <Head>
        <title>Modern Content Management System - CMS</title>
        <meta
          name='description'
          content='Read latest blog posts on web development'
        />
      </Head>
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
        {/* catgories */}
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
              style={{
                textAlign: "center",
                fontSize: "74px",
                textShadow: "2px 2px 4px #000000",
                color: "#fff",
              }}>
              BLOG POSTS
            </h2>
            <Divider>
              <ThunderboltOutlined style={{ color: "white" }} />
            </Divider>
            <div style={{ textAlign: "center" }}>
              {latestPosts.map((post) => (
                <Link href={`/pages/posts/${post.slug}`} key={post._id}>
                  <h3>{post.title}</h3>
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
          <Divider>CATEGORIES</Divider>
          <div style={{ textAlign: "center" }}>
            {categories.map((c) => (
              <Link href={`/pages/category/${c.slug}`} key={c._id}>
                <Button style={{ margin: 2 }}>{c.name}</Button>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Home;
