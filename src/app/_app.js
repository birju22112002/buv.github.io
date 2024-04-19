/** @format */

// _app.js
import React from "react";
import App from "next/app";
import RootLayout from "../app/layout";
import { ThemeProvider } from "./context/theme";
import "../../public/css/style.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
