/** @format */
"use client";
import { useState, useContext } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";

function Signup() {
  const { theme } = useContext(ThemeContext);

  const onFinish = (values) => {
    console.log("values => ", values);
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Signup</h1>

        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          {/* name */}
          <Form.Item
            name='name'
            rules={[{ required: true, message: "Please input your name!" }]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Name'
            />
          </Form.Item>
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

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{
                backgroundColor: theme === "dark" ? "#333333" : "#f4f4f4",
                border: "none",
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}>
              Register
            </Button>
            <br />
            <p
              style={{
                color: theme === "dark" ? "#ffffff" : "#000000",
                textDecoration: "none",
              }}>
              {" "}
              Or{" "}
              <Link
                href='/pages/signin'
                style={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  textDecoration: "underline",
                }}>
                Login now!
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;
