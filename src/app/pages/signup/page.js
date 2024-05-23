/** @format */
"use client";
import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "../signin/Signin.module.css";

function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth?.token) {
      router.push("/");
    }
  }, [auth, router]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/signup",
        values
      );
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        //save in context
        setAuth(data);
        //save in local storage
        localStorage.setItem("auth", JSON.stringify(data));

        toast.success("Successfully signed up!");
        router.push("/pages/admin");
        setLoading(false);
      }
    } catch (err) {
      toast.error("error");
      console.log(err);
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
            <b>Signup</b>
          </h1>
          <br />
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
                className={
                  theme === "dark" ? styles.transparentInput : styles.lightInput
                }
              />
            </Form.Item>
            {/* email */}
            <Form.Item name='email' rules={[{ type: "email" }]}>
              <Input
                prefix={<MailOutlined className='site-form-item-icon' />}
                placeholder='Email'
                className={
                  theme === "dark" ? styles.transparentInput : styles.lightInput
                }
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
                className={
                  theme === "dark" ? styles.transparentInput : styles.lightInput
                }
              />
            </Form.Item>

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
    </div>
  );
}

export default Signup;
