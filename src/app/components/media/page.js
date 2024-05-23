/** @format */

import React, { useContext } from "react";
import UploadFile from "./UploadFile";
import MediaLibrary from "./MediaLibrary";
import { Tabs } from "antd";
import { MediaProvider } from "../../context/media";
import { ThemeContext } from "../../context/ThemeContext"; // Import the ThemeContext
import styles from "./Media.module.css"; // Import CSS module for additional styles

const { TabPane } = Tabs;

const Media = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from ThemeContext

  return (
    <MediaProvider>
      <Tabs
        className={theme === "dark" ? styles.darkTabs : ""}
        defaultActiveKey='1'>
        <TabPane
          tab={
            <span className={theme === "dark" ? styles.darkTabText : ""}>
              Upload File
            </span>
          }
          key='1'>
          <UploadFile />
        </TabPane>
        <TabPane
          tab={
            <span className={theme === "dark" ? styles.darkTabText : ""}>
              Media Library
            </span>
          }
          key='2'>
          <MediaLibrary />
        </TabPane>
      </Tabs>
    </MediaProvider>
  );
};

export default Media;
