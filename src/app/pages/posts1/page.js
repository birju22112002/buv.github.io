/** @format */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Row gutter={12}>
        <Col sm={24} lg={16}>
          <pre>{JSON.stringify(posts, null, 4)}</pre>
        </Col>
        <Col sm={24} lg={8}>
          Sidebar
        </Col>
      </Row>
    </>
  );
};

export default Posts;
