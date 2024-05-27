/** @format */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import SubscriberLayout from "../../components/layouts/SubscriberLayout";
import axios from "axios";
import { Row, Col, Divider } from "antd";
import RenderProgress from "../../components/posts/RenderProgress";

function SubscriberPage() {
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

  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "#ffffff" : "#000000";
  const backgroundColor = theme === "dark" ? "#000000" : "#f9f9f9";

  return (
    <SubscriberLayout>
      <div
        style={{ color, backgroundColor, minHeight: "100vh", padding: "20px" }}>
        <Row>
          <Col span={24}>
            <Divider>
              <h1 style={{ textAlign: "center" }}>Subscriber Dashboard</h1>
            </Divider>
          </Col>
        </Row>

        <Row>
          <Col
            span={12}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
            <RenderProgress
              number={numbers.posts}
              name='Total Posts'
              link='/pages/posts'
            />
          </Col>
          <Col
            span={12}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}>
            <RenderProgress
              number={numbers.comments}
              name='Comments'
              link='/pages/subscriber/comments'
            />
          </Col>
        </Row>
      </div>
    </SubscriberLayout>
  );
}

export default SubscriberPage;
