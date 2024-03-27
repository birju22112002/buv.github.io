/** @format */
"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import AdminNav from "../nav/AdminNav";
import { Layout } from "antd";

const { Content } = Layout;

const AdminLayout = (props) => {
  const { theme } = useContext(ThemeContext);

  const backgroundColor = theme === "dark" ? "#325e65" : "#ffffff";
  const color = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <Layout>
      <AdminNav />
      <Layout
        style={{
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
        }}>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
