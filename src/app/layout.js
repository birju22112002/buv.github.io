/** @format */
"use client";

import React from "react";
import "./globals.css";
import "./public/css/style.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/auth";
import TopNav from "./components/TopNav";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <TopNav />
            <Toaster />
            {/* Layout UI */}
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
