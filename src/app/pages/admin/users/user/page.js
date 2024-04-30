/** @format */
"use client";
import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../../components/layouts/AdminLayout";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../../../context/auth";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function AllUsers() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  // hook
  const router = useRouter();
  // state
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (auth?.token) loadUsers();
  }, [auth?.token]);

  const loadUsers = async (req, res) => {
    try {
      const { data } = await axios.get("users");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (user) => {
    try {
      if (user._id === auth.user._id) {
        alert("you can not delete yourself");
        return;
      }
      // Handle deletion logic here
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout
      style={{
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}>
      <Row>
        <Col span={24}>
          <h4
            style={{
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}>
            All Users
          </h4>

          <List
            style={{
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
            itemLayout='horizontal'
            dataSource={users}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Link href={`/admin/users/${user._id}`}>edit</Link>,
                  <a
                    disabled={user?._id === auth?.user?._id}
                    onClick={() => handleDelete(user)}>
                    delete
                  </a>,
                ]}>
                <Avatar src={user?.image?.url}>{user?.name[0]}</Avatar>
                <List.Item.Meta title={user.name} style={{ marginLeft: 10 }} />
                <List.Item.Meta
                  description={user.email}
                  style={{ marginLeft: 10 }}
                />
                <List.Item.Meta
                  description={user.role}
                  style={{ marginLeft: 10 }}
                />
                <List.Item.Meta
                  description={`${user?.posts?.length || 0} post`}
                  style={{ marginLeft: 10 }}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}
