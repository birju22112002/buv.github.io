/** @format */
"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const AdminPage = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "#ffffff" : "#000000";
  return (
    <AdminLayout>
      <h1 style={{ color }}>This is Birju</h1>
      <p style={{ color }}>Follow Me For More Content....</p>
    </AdminLayout>
  );
};

export default AdminPage;
