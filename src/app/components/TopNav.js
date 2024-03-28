/** @format */

// TopNav.js
import React, { useContext } from "react";
import { Menu } from "antd";

import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ThemeContext } from "../context/ThemeContext";

const { SubMenu } = Menu;

const ToggleTheme = dynamic(() => import("./ToggleTheme"), {
  ssr: false,
});

const TopNav = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Menu
      mode='horizontal'
      theme={theme}
      style={{
        backgroundColor: theme === "dark" ? "#222222" : "#f3f3f3",
        color: theme === "dark" ? "#ffffff" : "#222222",
      }}>
      <Menu.Item key='mail' icon={<MailOutlined />}>
        <Link href='/'>BUV</Link>
      </Menu.Item>
      <Menu.Item key='signup' icon={<UserAddOutlined />}>
        <Link href='/pages/signup'>Signup</Link>
      </Menu.Item>
      <Menu.Item key='signin' icon={<UserOutlined />}>
        <Link href='/pages/signin'>Signin</Link>
      </Menu.Item>
      <SubMenu
        key='SubMenu'
        icon={<SettingOutlined />}
        title='Dashboard'
        style={{
          marginLeft: "auto",
        }}>
        <Menu.ItemGroup
          title='Management'
          style={{
            backgroundColor: theme === "dark" ? "#222222" : null,
          }}>
          <Menu.Item key='setting:2'>
            <Link href='/pages/admin'>Admin</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key='toggleTheme'>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
