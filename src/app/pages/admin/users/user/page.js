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
    if (auth?.token) {
      fetchUsers(auth.token); // Call fetchUsers with the JWT token
    }
  }, [auth?.token]);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      setUsers(response.data); // Update users state with the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const handleDelete = async (user) => {
    try {
      if (user._id === auth.user._id) {
        alert("You cannot delete yourself");
        return;
      }
      const { data } = await axios.delete(`/users/${user._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      toast.error("User deleted");
    } catch (err) {
      console.log(err);
      toast.error("Error deleting user");
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
            All Users ({users?.length})
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
