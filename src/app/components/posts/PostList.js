/** @format */
"use client";
import { useContext } from "react";
import { List } from "antd";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "next/link";

const PostsList = ({ posts, handleDelete, handleEdit }) => {
  const { theme } = useContext(ThemeContext);

  const textStyle = {
    color: theme === "dark" ? "#fff" : "#000",
  };

  return (
    <List
      itemLayout='horizontal'
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          style={{ color: textStyle.color, margin: 15 }}
          actions={[
            <a style={textStyle} onClick={() => handleEdit(item)}>
              edit
            </a>,
            <a style={textStyle} onClick={() => handleDelete(item)}>
              delete
            </a>,
          ]}>
          <List.Item.Meta title={<span style={textStyle}>{item.title}</span>} />
        </List.Item>
      )}
    />
  );
};

export default PostsList;
