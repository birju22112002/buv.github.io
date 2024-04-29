/** @format */

import React, { useState, useContext, useEffect } from "react";
import { Menu, Layout } from "antd";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
import { useWindowWidth } from "@react-hook/window-size";
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AuthorNav = () => {
  const { theme } = useContext(ThemeContext);

  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  //hook
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        backgroundColor: theme === "dark" ? "#222222" : null,
      }}>
      <Menu
        style={{
          backgroundColor: theme === "dark" ? "#222222" : null,
        }}
        // defaultSelectedKeys={["1"]}
        defaultOpenKeys={["2", "6", "10"]}
        selectedKeys={[current]}
        mode='inline'
        inlineCollapsed={collapsed}
        theme={theme === "dark" ? "dark" : "light"}
        onClick={handleClick}>
        <Menu.Item key='1' icon={<SettingOutlined />}>
          <Link
            href='/pages/author'
            className={current === "/pages/author" ? "active" : null}>
            Dashboard
          </Link>
        </Menu.Item>

        {/* posts */}
        <SubMenu key='2' icon={<PushpinOutlined />} title='Posts'>
          <Menu.Item key='3'>
            <Link
              href='/pages/author/posts/post'
              className={
                current === "/pages/author/posts/post" ? "active" : null
              }>
              All Posts
            </Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link
              href='/pages/author/posts'
              className={current === "/pages/author/posts" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link
              href='/pages/author/categories'
              className={
                current === "/pages/author/categories" ? "active" : null
              }>
              Categories
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* library */}
        <SubMenu key='6' icon={<CameraOutlined />} title='Media'>
          <Menu.Item key='7'>
            <Link
              href='/pages/author/media/library'
              className={
                current === "/pages/author/media/library" ? "active" : null
              }>
              Library
            </Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link
              href='/pages/author/media'
              className={current === "/pages/author/media" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* comments */}
        <Menu.Item key='9' icon={<CommentOutlined />}>
          <Link
            href='/pages/author/comments'
            className={current === "/pages/author/comments" ? "active" : null}>
            Comments
          </Link>
        </Menu.Item>

        {/* profile */}
        <Menu.Item key='13' icon={<UserOutlined />}>
          <Link
            href='/author/userid'
            className={current === "/author/userid" ? "active" : null}>
            Profile
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AuthorNav;