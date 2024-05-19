/** @format */

import { useState, useEffect } from "react";
import axios from "axios";

const useLatestPosts = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestPostsError, setLatestPostsError] = useState(null);
  const [latestPostsLoading, setLatestPostsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLatestPostsLoading(true);
      try {
        const { data } = await axios.get("/posts/1");
        // console.log("Fetched latest posts data:", data);
        if (Array.isArray(data.posts)) {
          setLatestPosts(data.posts);
        } else {
          setLatestPosts([]);
          console.error("Fetched data is not an array", data);
        }
      } catch (err) {
        setLatestPostsError(err);
        console.error("Error fetching latest posts:", err);
      } finally {
        setLatestPostsLoading(false);
      }
    };

    getPosts();
  }, []);

  return {
    latestPosts,
    latestPostsError,
    latestPostsLoading,
  };
};

export default useLatestPosts;
