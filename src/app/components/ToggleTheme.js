/** @format */

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

  const buttonStyle = {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    fontSize: "20px",
    cursor: "pointer",
    borderRadius: "3px",
    color: "white",
  };

  return (
    <>
      <button
        className={styles.themebtns}
        style={buttonStyle}
        onClick={handleToggleTheme}>
        {theme === "light" ? "🌞" : "🌗"}
      </button>
    </>
  );
};

export default ToggleTheme;
