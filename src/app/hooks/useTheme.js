/** @format */

// hooks/useTheme.js

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchLight = () => setTheme("light");
  const switchDark = () => setTheme("dark");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, switchLight, switchDark, toggleTheme };
};

export default useTheme;
