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

function forgotPassword() {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const ForgotPasswordRequest = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/pages/forgot", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Check your email. Password reset code is sent.");
        setVisible(true);
        setLoading(false);
        // router.push("/pages/signin");
      }
    } catch (err) {
      console.log(err);
      toast.error("Forgot Password error");
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Forgot Password</h1>

        <Form
          form={form}
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={ForgotPasswordRequest}>
          <Form.Item name='email' rules={[{ type: "email" }]}>
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          {visible && "SHOW FORM FIELD TO ENTER CODE AND NEW PASSWORD"}

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
              Submit
            </Button>
            <br />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default forgotPassword;
