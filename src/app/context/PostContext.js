/** @format */

import { createContext, useState, useContext } from "react";

export const PostContext = createContext();

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    posts: [],
    categories: [],
  });

  return (
    <PostContext.Provider value={[post, setPost]}>
      {children}
    </PostContext.Provider>
  );
};
