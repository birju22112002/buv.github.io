/** @format */

import React, { useState, useContext, useEffect } from "react";
import { Menu, Layout } from "antd";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/auth";
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

  const [auth, setAuth] = useContext(AuthContext);

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
        <SubMenu
          key='2'
          icon={<PushpinOutlined />}
          title='Posts'
          style={{
            backgroundColor: theme === "dark" ? "#222222" : null,
          }}>
          <Menu.Item key='3'>
            <Link
              href='/pages/admin/posts/post'
              className={
                current === "/pages/admin/posts/post" ? "active" : null
              }>
              All Posts
            </Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link
              href='/pages/admin/posts'
              className={current === "/pages/admin/posts" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
          <Menu.Item key='5'>
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
        <SubMenu
          key='6'
          icon={<CameraOutlined />}
          title='Media'
          style={{
            backgroundColor: theme === "dark" ? "#222222" : null,
          }}>
          <Menu.Item key='7'>
            <Link
              href='/pages/admin/media/library'
              className={
                current === "/pages/admin/media/library" ? "active" : null
              }>
              Library
            </Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link
              href='/pages/admin/media'
              className={current === "/pages/admin/media" ? "active" : null}>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* comments */}
        <Menu.Item key='9' icon={<CommentOutlined />}>
          <Link
            href='/pages/admin/comments'
            className={current === "/pages/admin/comments" ? "active" : null}>
            Comments
          </Link>
        </Menu.Item>

        {/* users */}
        <SubMenu
          key='10'
          icon={<UserSwitchOutlined />}
          title='Users'
          style={{
            backgroundColor: theme === "dark" ? "#222222" : null,
          }}>
          <Menu.Item key='11'>
            <Link
              href='/pages/admin/users'
              className={current === "/pages/admin/users" ? "active" : null}>
              All Users
            </Link>
          </Menu.Item>
          <Menu.Item key='12'>
            <Link
              href='/pages/admin/users/user'
              className={
                current === "/pages/admin/users/user" ? "active" : null
              }>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* profile */}
        <Menu.Item key='13' icon={<UserOutlined />}>
          <Link
            href={{
              pathname: `/pages/admin/profile/${auth.user?._id}`,
              query: { routename: "update-user" },
            }}
            className={
              current === `/pages/admin/profile/${auth.user?._id}`
                ? "active"
                : null
            }>
            Profile
          </Link>
        </Menu.Item>

        {/* Customize */}
        <Menu.Item key='14' icon={<BgColorsOutlined />}>
          <Link
            href='/pages/admin/customize'
            className={current === "/pages/admin/customize" ? "active" : null}>
            Customize
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
