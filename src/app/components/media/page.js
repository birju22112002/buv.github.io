/** @format */

import React from "react";
import UploadFile from "./UploadFile";
import MediaLibrary from "./MediaLibrary";
import { Tabs } from "antd";
import { MediaProvider } from "../../context/media";

const { TabPane } = Tabs;

const Media = () => {
  return (
    <MediaProvider>
      <Tabs>
        <TabPane tab='Upload File' key='1'>
          <UploadFile />
        </TabPane>
        <TabPane tab='Media Library' key='2'>
          <MediaLibrary />
        </TabPane>
      </Tabs>
    </MediaProvider>
  );
};

export default Media;
