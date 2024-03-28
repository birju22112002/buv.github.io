/** @format */
"use client";
import React, { useContext } from "react";
import { Layout } from "antd";
import { ThemeContext } from "../../context/ThemeContext";
import AdminLayout from "../../components/layouts/AdminLayout";

const { Content, Sider } = Layout;

function NewPost() {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "#ffffff" : "#000000";
  return (
    <AdminLayout>
      <h1 style={{ color }}>Create new post</h1>
      <p style={{ color }}>...</p>
    </AdminLayout>
  );
}

export default NewPost;
