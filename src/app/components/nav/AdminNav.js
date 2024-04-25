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

const AdminNav = () => {
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
            href='/pages/admin'
            className={current === "/pages/admin" ? "active" : null}>
            Dashboard
          </Link>
        </Menu.Item>

        {/* posts */}
        <SubMenu key='2' icon={<PushpinOutlined />} title='Posts'>
          <Menu.Item key='/admin/posts/new'>
            <Link
              href='/pages/posts/post'
              className={current === "/pages/posts/post" ? "active" : null}>
              All Posts
            </Link>
          </Menu.Item>
          <Menu.Item key='/pages/posts'>
            <Link
              href='/pages/posts'
              className={current === "/pages/posts" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
          <Menu.Item key='/pages/admin/categories'>
            <Link
              href='/pages/admin/categories'
              className={
                current === "/pages/admin/categories" ? "active" : null
              }>
              Categories
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* library */}
        <SubMenu key='6' icon={<CameraOutlined />} title='Media'>
          <Menu.Item key='/pages/media/library'>
            <Link
              href='/pages/media/library'
              className={current === "/pages/media/library" ? "active" : null}>
              Library
            </Link>
          </Menu.Item>
          <Menu.Item key='/pages/media'>
            <Link
              href='/pages/media'
              className={current === "/pages/media" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* comments */}
        <Menu.Item key='/pages/admin/comments' icon={<CommentOutlined />}>
          <Link
            href='/pages/admin/comments'
            className={current === "/pages/admin/comments" ? "active" : null}>
            Comments
          </Link>
        </Menu.Item>

        {/* users */}
        <SubMenu key='10' icon={<UserSwitchOutlined />} title='Users'>
          <Menu.Item key='/pages/admin/users'>
            <Link
              href='/pages/admin/users'
              className={current === "/pages/admin/users" ? "active" : null}>
              All Users
            </Link>
          </Menu.Item>
          <Menu.Item key='/pages/admin/users'>
            <Link
              href='/pages/admin/users'
              className={current === "/pages/admin/users" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* profile */}
        <Menu.Item key='/admin/userid' icon={<UserOutlined />}>
          <Link
            href='/admin/userid'
            className={current === "/admin/userid" ? "active" : null}>
            Profile
          </Link>
        </Menu.Item>

        {/* Customize */}
        <Menu.Item key='/admin/customize' icon={<BgColorsOutlined />}>
          <Link
            href='/admin/customize'
            className={current === "/admin/customize" ? "active" : null}>
            Customize
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
