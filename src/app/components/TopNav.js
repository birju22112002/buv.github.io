/** @format */

import React, { useContext } from "react";
import { Menu } from "antd";
import { ThemeContext } from "../context/ThemeContext";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";

const { SubMenu } = Menu;

const TopNav = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Menu
      mode='horizontal'
      theme={theme}
      style={{
        backgroundColor: theme === "dark" ? "#222222" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}>
      <Menu.Item key='mail' icon={<MailOutlined />}>
        <Link href='/'>BUV</Link>
      </Menu.Item>
      <Menu.Item key='signup' icon={<AppstoreOutlined />}>
        <Link href='/pages/signup'>Signup</Link>
      </Menu.Item>
      <Menu.Item key='signin' icon={<AppstoreOutlined />}>
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
