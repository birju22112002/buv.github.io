/** @format */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import SubscriberNav from "../nav/SubscriberNav";
import { useRouter } from "next/navigation";
import { AuthContext, AuthProvider } from "../../context/auth";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

import { Layout } from "antd";

const { Content } = Layout;

const SubscriberLayout = (props) => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth?.token) {
      getCurrentSubscriber();
    }
  }, [auth?.token]);
  const getCurrentSubscriber = async () => {
    try {
      const { data } = await axios.get("/current-subscriber");

      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };
  if (loading) {
    return (
      <LoadingOutlined
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "50px",
          color: "red",
        }}
      />
    );
  }
  if (!auth?.user || auth?.user?.role !== "Subscriber") {
    router.push("/pages/subscriber");
    return null;
  }
  const backgroundColor = theme === "dark" ? "#325e65" : "#ffffff";
  const color = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <Layout>
      <SubscriberNav />
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

export default SubscriberLayout;
