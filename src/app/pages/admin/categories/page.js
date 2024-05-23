/** @format */
"use client";
import { useState, useContext, useEffect } from "react";
import { Layout, Form, Input, Row, Col, Button, List } from "antd";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../../../context/ThemeContext";
import CategoryUpdateModal from "../../../components/modal/CategoryUpdateModal";
import { PostContext } from "../../../context/PostContext";
import styles from "./categories.module.css";

const { Content, Sider } = Layout;

function Categories() {
  // state
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [post, setPost] = useContext(PostContext);
  const [updatingCategory, setUpdatingCategory] = useState({});
  const [visible, setVisible] = useState(false);

  //hooks
  const [form] = Form.useForm();
  const { categories } = post;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setPost((prev) => ({ ...prev, categories: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/category", values);
      setPost((prev) => ({ ...prev, categories: [data, ...categories] }));
      toast.success("Category created successfully");
      setLoading(false);
      form.resetFields(["name"]);
    } catch (err) {
      console.log(err);
      toast.error("Category create failed");
      setLoading(false);
    }
  };

  const buttonStyle = {
    backgroundColor: theme === "dark" ? "transparent" : "#f0f0f0",
    color: theme === "dark" ? "#fff" : "#000",
    border: theme === "dark" ? "2px solid #2f2f2f" : "none",
  };

  const textStyle = {
    color: theme === "dark" ? "#fff" : "#000",
  };

  const inputStyle = {
    backgroundColor: theme === "dark" ? "transparent" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    border: "1px solid",
    borderColor: theme === "dark" ? "#888" : "#d9d9d9",
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      if (data) {
        setPost((prev) => ({
          ...prev,
          categories: categories.filter((cat) => cat._id !== item._id),
        }));
        toast.success("Category deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting");
    }
  };

  const handleEdit = async (item) => {
    setUpdatingCategory(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `/category/${updatingCategory.slug}`,
        values
      );

      const newCategories = categories.map((cat) => {
        if (cat._id === data._id) {
          return data;
        }
        return cat;
      });

      setPost((prev) => ({ ...prev, categories: newCategories }));
      toast.success("Category updated successfully");
      setVisible(false);
      setUpdatingCategory({});
    } catch (err) {
      console.log(err);
      toast.error("Category update failed");
    }
  };

  return (
    <AdminLayout>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        {/* first column */}
        <Col xs={22} sm={22} lg={10} offset={1} style={{ padding: "20px" }}>
          <h1
            style={{
              color: theme === "dark" ? "#fff" : "#000",
              marginBottom: "7px",
            }}>
            Categories
          </h1>
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#000",
              marginBottom: "7px",
            }}>
            Add new category
          </p>

          <Form onFinish={onFinish} form={form}>
            <Form.Item name='name'>
              <Input
                prefix={<EditOutlined className='site-form-item-icon' />}
                placeholder='Give it a name'
                style={inputStyle}
                className={theme === "dark" ? "input-dark-theme" : ""}
              />
            </Form.Item>
            <Button
              style={{ ...buttonStyle, ...textStyle }}
              loading={loading}
              type='primary'
              htmlType='submit'>
              Submit
            </Button>
          </Form>
        </Col>
        {/* second column */}
        <Col xs={22} sm={22} lg={10} offset={1} style={{ padding: "20px" }}>
          <List
            itemLayout='horizontal'
            dataSource={categories}
            renderItem={(item, index) => (
              <>
                <List.Item
                  className={`${styles.listItem} ${
                    theme === "dark" ? styles.darkTheme : styles.lightTheme
                  }`}
                  actions={[
                    <a
                      onClick={() => handleEdit(item)}
                      style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                      edit
                    </a>,
                    <a
                      onClick={() => {
                        handleDelete(item);
                      }}
                      style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                      delete
                    </a>,
                  ]}>
                  <List.Item.Meta
                    title={
                      <span
                        style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                        {item.name}
                      </span>
                    }
                  />
                </List.Item>
                {theme === "dark" && <div className={styles.lineBreak}></div>}
              </>
            )}></List>
        </Col>
        <CategoryUpdateModal
          visible={visible}
          setVisible={setVisible}
          handleUpdate={handleUpdate}
          updatingCategory={updatingCategory}
        />
      </Row>
    </AdminLayout>
  );
}

export default Categories;
