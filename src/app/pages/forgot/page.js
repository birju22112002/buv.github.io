/** @format */
"use client";
import React, { useState, useContext } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/navigation";
import styles from "../signin/Signin.module.css";

function ForgotPassword() {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const forgotPasswordRequest = async (values) => {
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

  const resetPasswordRequest = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/pages/reset-password", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success(
          "Password changed successfully. Please login with your new password"
        );
        form.resetFields(["email"]);
        setLoading(false);
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Reset password failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className={
        theme === "dark" ? styles.darkBackground : styles.lightBackground
      }>
      <Row>
        <Col span={8} offset={8}>
          <h1 style={{ paddingTop: "100px", fontSize: 35 }}>
            <b>Forgot Password</b>
          </h1>
          <br />
          <Form
            form={form}
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={visible ? resetPasswordRequest : forgotPasswordRequest}>
            <Form.Item name='email' rules={[{ type: "email" }]}>
              <Input
                prefix={<MailOutlined className='site-form-item-icon' />}
                placeholder='Email'
                className={
                  theme === "dark" ? styles.transparentInput : styles.lightInput
                }
              />
            </Form.Item>

            {visible && (
              <>
                <Form.Item name='resetCode'>
                  <Input
                    prefix={<MailOutlined className='site-form-item-icon' />}
                    placeholder='Enter reset code'
                    className={
                      theme === "dark"
                        ? styles.transparentInput
                        : styles.lightInput
                    }
                  />
                </Form.Item>

                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: "Please enter your new Password!",
                    },
                  ]}>
                  <Input.Password
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='New Password'
                    className={
                      theme === "dark"
                        ? styles.transparentInput
                        : styles.lightInput
                    }
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className={
                  theme === "dark"
                    ? styles.transparentButton
                    : styles.lightButton
                }
                loading={loading}>
                Submit
              </Button>
              <br />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ForgotPassword;
