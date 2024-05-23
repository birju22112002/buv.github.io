/** @format */

"use client";
// ToggleTheme.js
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from "./ToggleTheme.module.css";

const ToggleTheme = () => {
  const { theme, switchLight, switchDark } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    if (theme === "light") {
      switchDark();
    } else {
      switchLight();
    }
  };

  return (
    <button
      className={`${styles.themebtns} ${
        theme === "light" ? styles.light : styles.dark
      }`}
      onClick={handleToggleTheme}>
      {theme === "light" ? "🌞" : "🌗"}
    </button>
  );
};

export default ToggleTheme;
