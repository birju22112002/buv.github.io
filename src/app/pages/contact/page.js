/** @format */
"use client";
import { useState, useContext } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const { theme } = useContext(ThemeContext); // Use the ThemeContext

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/contact", values);
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Your message has been sent");
        form.resetFields();
        setLoading(false);
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Email failed. Try again.");
    }
  };

  return (
    <Row
      className={
        theme === "dark" ? styles.darkBackground : styles.lightBackground
      }>
      <Col span={8} offset={8}>
        <h1
          style={{
            fontSize: 35,
            paddingTop: "100px",
            color: theme === "dark" ? "#fff" : "#000",
          }}>
          <b>Contact</b>
        </h1>
        <br />
        <Form
          form={form}
          name='contact_form'
          className='contact-form'
          onFinish={onFinish}>
          {/* name */}
          <Form.Item
            name='name'
            rules={[{ required: true, message: "Please enter your name" }]}
            hasFeedback>
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='Your name'
              className={
                theme === "dark" ? styles.transparentInput : styles.lightInput
              }
            />
          </Form.Item>
          {/* email */}
          <Form.Item
            name='email'
            rules={[{ required: true, message: "Please enter your email" }]}
            hasFeedback>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Your email'
              className={
                theme === "dark" ? styles.transparentInput : styles.lightInput
              }
            />
          </Form.Item>
          {/* message */}
          <Form.Item
            name='message'
            rules={[{ required: true, message: "Please enter your message" }]}
            hasFeedback>
            <Input.TextArea
              placeholder='Write your message here..'
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
                theme === "dark" ? styles.transparentButton : styles.lightButton
              }
              loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ContactForm;
