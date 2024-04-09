/** @format */
"use client";
import React, { useState, useContext } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/navigation";
// import { headers } from "next/headers";

function Signin() {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/signin",
        values
      );
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signin response => ", data);
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed in");
        // redirect user
        if (data?.user?.role === "Admin") {
          router.push("/pages/admin");
        } else if (data?.user?.role === "Author") {
          router.push("/author");
        } else {
          router.push("/subscriber");
        }
        // form.resetFields();
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error signing in!");
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Signin</h1>

        <Form
          form={form}
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item name='email' rules={[{ type: "email" }]}>
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
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

          <Link
            href='/pages/forgot'
            style={{
              color: theme === "dark" ? "#ffffff" : "#000000",
              textDecoration: "none",
            }}>
            Forgot Password
          </Link>
          <br />
          <br />

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={`login-form-button ${
                theme === "dark" ? "dark-theme" : ""
              }`}
              style={{
                backgroundColor: theme === "dark" ? "#333333" : "#f4f4f4",
                border: "none",
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
              loading={loading}>
              Login
            </Button>
            <br />
            <p
              style={{
                color: theme === "dark" ? "#ffffff" : "#000000",
                textDecoration: "none",
              }}>
              Or{" "}
              <Link
                href='/pages/signup'
                style={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  textDecoration: "underline",
                }}>
                Register now!
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signin;
