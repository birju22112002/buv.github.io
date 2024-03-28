/** @format */
"use client";

import React from "react";
import "./globals.css";
import "./public/css/style.css";
import { ThemeProvider } from "./context/ThemeContext";
import TopNav from "./components/TopNav";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <TopNav />

          {/* Layout UI */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
