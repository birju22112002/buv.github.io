/** @format */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import AdminLayout from "../../components/layouts/AdminLayout";
import Link from "next/link";
import axios from "axios";
import { Row, Col, Divider } from "antd";
import RenderProgress from "../../components/posts/RenderProgress";

// const { Sider, Content } = Layout;
function Admin() {
  // state
  const [numbers, setNumbers] = useState({});

  useEffect(() => {
    getNumbers();
  }, []);

  const getNumbers = async () => {
    try {
      const { data } = await axios.get("/numbers");
      setNumbers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Statistics</h1>
          </Divider>
        </Col>
      </Row>

      <Row>
        {/* posts */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
          <RenderProgress
            number={numbers.posts}
            name='Posts'
            link='/pages/admin/posts'
          />
        </Col>
        {/* comments */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
          <RenderProgress
            number={numbers.comments}
            name='Comments'
            link='/pages/admin/comments'
          />
        </Col>
      </Row>

      <Row>
        {/* catgories */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
          <RenderProgress
            number={numbers.categories}
            name='Categories'
            link='/pages/admin/categories'
          />
        </Col>
        {/* users */}
        <Col
          span={12}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
          <RenderProgress
            number={numbers.users}
            name='Users'
            link='/pages/admin/users'
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Admin;
