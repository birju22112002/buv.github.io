/** @format */
"use client";

import React from "react";
import "./globals.css";
import "./public/css/style.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/auth";
import { PostProvider } from "./context/PostContext";
import TopNav from "./components/TopNav";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <PostProvider>
              {" "}
              {/* Add PostProvider here */}
              <TopNav />
              <Toaster />
              {/* Layout UI */}
              <main>{children}</main>
            </PostProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
