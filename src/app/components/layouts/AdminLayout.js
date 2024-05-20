/** @format */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import AdminNav from "../nav/AdminNav";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/auth";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

import { Layout } from "antd";
import LoadingToRedirect from "../LoadingToRedirect";

const { Content } = Layout;

const AdminLayout = (props) => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth?.token) {
      getCurrentAdmin();
    }
  }, [auth?.token]);
  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get("/current-admin");

      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };
  if (loading) {
    return <LoadingToRedirect />;
  }

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
