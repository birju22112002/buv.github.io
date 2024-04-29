/** @format */
"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import AuthorLayout from "../../components/layouts/AuthorLayout";

const AuthorPage = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "#ffffff" : "#000000";
  return (
    <AuthorLayout>
      <h1 style={{ color }}>This is Auhtor page</h1>
      <p style={{ color }}>Follow Me For More Content....</p>
    </AuthorLayout>
  );
};

export default AuthorPage;
