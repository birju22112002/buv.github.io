/** @format */

import React, { useState, useContext } from "react";
import { Menu, Button, Layout } from "antd";
import Link from "next/link";
import { ThemeContext } from "../../context/ThemeContext";
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

  return (
    <Sider
      collapsible
      style={{
        backgroundColor: theme === "dark" ? "#222222" : null,
      }}>
      <Menu
        style={{
          backgroundColor: theme === "dark" ? "#222222" : null,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["2", "6", "10"]}
        mode='inline'
        inlineCollapsed={collapsed}
        theme={theme === "dark" ? "dark" : "light"}>
        <Menu.Item key='1' icon={<SettingOutlined />}>
          <Link href='/admin'>Dashboard</Link>
        </Menu.Item>

        {/* posts */}
        <SubMenu key='2' icon={<PushpinOutlined />} title='Posts'>
          <Menu.Item key='3'>
            <Link href='/admin/posts'>All Posts</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link href='/admin/posts/new'>Add New</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link href='/admin/categories'>Categorie</Link>
          </Menu.Item>
        </SubMenu>

        {/* library */}
        <SubMenu key='6' icon={<CameraOutlined />} title='Media'>
          <Menu.Item key='7'>
            <Link href='/admin/media/library'>Library</Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link href='/admin/media/new'>Add New</Link>
          </Menu.Item>
        </SubMenu>

        {/* comments */}
        <Menu.Item key='9' icon={<CommentOutlined />}>
          <Link href='/admin/comments'>Comments</Link>
        </Menu.Item>

        {/* users */}
        <SubMenu key='10' icon={<UserSwitchOutlined />} title='Users'>
          <Menu.Item key='11'>
            <Link href='/admin/users'>All Users</Link>
          </Menu.Item>
          <Menu.Item key='12'>
            <Link href='/admin/users/new'>Add New</Link>
          </Menu.Item>
        </SubMenu>

        {/* profile */}
        <Menu.Item key='13' icon={<UserOutlined />}>
          <Link href='/admin/userid'>Profile</Link>
        </Menu.Item>

        {/* Customize */}
        <Menu.Item key='14' icon={<BgColorsOutlined />}>
          <Link href='/admin/customize'>Customize</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
