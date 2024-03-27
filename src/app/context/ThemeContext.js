/** @format */

"use client";

/** @format */
/** @jsxImportSource @emotion/react */

import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const switchLight = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  const switchDark = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#ffffff" : "#222222";
    document.body.style.color = theme === "light" ? "black" : "white";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchLight, switchDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
