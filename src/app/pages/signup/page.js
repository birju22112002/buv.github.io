/** @format */

"use client";
import React from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import dynamic from "next/dynamic";

class Signup extends React.Component {
  onFinish = (values) => {
    console.log("values => ", values);
  };

  render() {
    return (
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: "100px" }}>Signup</h1>

          <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={this.onFinish}>
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
                style={{ backgroundColor: "#1890ff", border: "none" }}>
                Register
              </Button>
              <br />
              Or{" "}
              <Link href='/pages/signin' style={{ color: "#ffffff" }}>
                Login now!
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Signup;
