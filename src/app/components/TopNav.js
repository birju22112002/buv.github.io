/** @format */
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "antd";
import {
  MailOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/auth";

const { SubMenu } = Menu;

const ToggleTheme = dynamic(() => import("./ToggleTheme"), {
  ssr: false,
});

const TopNav = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const [auth, setAuth] = useContext(AuthContext);

  const signOut = () => {
    // Remove from local storage
    localStorage.removeItem("auth");
    // Remove from context
    setAuth({ token: "", user: null });
    // Redirect to login page
    router.push("/pages/signin");
  };

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

      {auth?.user === null && (
        <>
          <Menu.Item
            style={{ marginLeft: "auto" }}
            key='signup'
            icon={<UserAddOutlined />}>
            <Link href='/pages/signup'>Signup</Link>
          </Menu.Item>
          <Menu.Item key='signin' icon={<UserOutlined />}>
            <Link href='/pages/signin'>Signin</Link>
          </Menu.Item>
        </>
      )}
      {auth?.user !== null && (
        <>
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
          <Menu.Item onClick={signOut} key='signout' icon={<LogoutOutlined />}>
            Sign Out
          </Menu.Item>
        </>
      )}
      <Menu.Item key='toggleTheme'>
        <ToggleTheme />
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
