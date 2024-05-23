/** @format */
"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import SubscriberLayout from "../../components/layouts/SubscriberLayout";

const SubscriberPage = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "#ffffff" : "#000000";
  return (
    <SubscriberLayout>
      <h1 style={{ color }}>This is subscriber page</h1>
      <p style={{ color }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vitae
        veritatis veniam itaque eaque doloremque molestias tenetur fugit quasi
        quaerat, laborum odio ut iure blanditiis, doloribus omnis laudantium?
        Rem, doloribus!
      </p>
    </SubscriberLayout>
  );
};

export default SubscriberPage;
