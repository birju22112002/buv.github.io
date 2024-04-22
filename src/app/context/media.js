/** @format */

import React, { useState, createContext } from "react";

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState({
    images: [],
    selected: "",
    showMediaModal: false,
  });

  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {children}
    </MediaContext.Provider>
  );
};
