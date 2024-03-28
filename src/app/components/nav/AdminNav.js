/** @format */

import React, { useState, useContext, useEffect } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
import { useWindowWidth } from "@react-hook/window-size";
import {
  PieChartOutlined,
  MailOutlined,
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

  const activeName = (name) => `${current === name && "active"}`;

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
        mode='inline'
        inlineCollapsed={collapsed}
        theme={theme === "dark" ? "dark" : "light"}>
        <Menu.Item key='1' icon={<SettingOutlined />}>
          <Link href='/pages/admin' className={activeName("/pages/admin")}>
            Dashboard
          </Link>
        </Menu.Item>

        {/* posts */}
        <SubMenu key='2' icon={<PushpinOutlined />} title='Posts'>
          <Menu.Item key='3'>
            <Link
              href='/admin/posts/new'
              className={activeName("/pages/posts1")}>
              All Posts
            </Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link href='/pages/posts' className={activeName("/pages/posts")}>
              Add New
            </Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link
              href='/admin/categories'
              className={activeName("/pages/posts1")}>
              Categorie
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* library */}
        <SubMenu key='6' icon={<CameraOutlined />} title='Media'>
          <Menu.Item key='7'>
            <Link
              href='/admin/media/library'
              className={activeName("/pages/posts1")}>
              Library
            </Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link
              href='/admin/media/new'
              className={activeName("/pages/posts1")}>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* comments */}
        <Menu.Item key='9' icon={<CommentOutlined />}>
          <Link href='/admin/comments' className={activeName("/pages/posts1")}>
            Comments
          </Link>
        </Menu.Item>

        {/* users */}
        <SubMenu key='10' icon={<UserSwitchOutlined />} title='Users'>
          <Menu.Item key='11'>
            <Link href='/admin/users' className={activeName("/pages/posts1")}>
              All Users
            </Link>
          </Menu.Item>
          <Menu.Item key='12'>
            <Link
              href='/admin/users/new'
              className={activeName("/pages/posts1")}>
              Add New
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* profile */}
        <Menu.Item key='13' icon={<UserOutlined />}>
          <Link href='/admin/userid' className={activeName("/pages/posts1")}>
            Profile
          </Link>
        </Menu.Item>

        {/* Customize */}
        <Menu.Item key='14' icon={<BgColorsOutlined />}>
          <Link href='/admin/customize' className={activeName("/pages/posts1")}>
            Customize
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
