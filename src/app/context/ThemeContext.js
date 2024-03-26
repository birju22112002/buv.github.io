/** @format */

"use client";

import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("theme")
        : null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const switchLight = () => {
    setTheme("light");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", "light");
    }
  };

  const switchDark = () => {
    setTheme("dark");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", "dark");
    }
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
