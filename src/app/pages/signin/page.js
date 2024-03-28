/** @format */
"use client";
import React from "react";
import { useState } from "react"; // Import useState here
import { Form, Input, Button, Col, Row } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";

const Signin = () => {
  const [isClient, setIsClient] = useState(false);

  if (typeof window !== "undefined" && !isClient) {
    setIsClient(true);
  }

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  const onFinish = (values) => {
    console.log("values => ", values);
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Signin</h1>

        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          {/* email */}
          <Form.Item name='email' rules={[{ type: "email" }]}>
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            name='password'
            rules={[
              { required: true, message: "Please input your Password!" },
            ]}>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <br />
          <br />
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'>
              Login
            </Button>
            <br />
            Or <Link href='/pages/signup'>Register now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signin;
