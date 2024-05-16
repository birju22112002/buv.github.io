/** @format */
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { Row, Col, List, Avatar, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { AuthContext } from "../../../context/auth";

const AllUsers = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setUsers(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load users.");
    }
  };

  const handleEdit = (userId) => {
    router.push(`/pages/admin/users/user/${userId}`);
  };

  const handleDelete = async (item) => {
    if (item._id === auth.user._id) {
      alert("You cannot delete yourself");
      return;
    }
    try {
      const { data } = await axios.delete(`/users/${item._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        console.log("User deleted:", data);
        setUsers((previousUsers) =>
          previousUsers.filter((user) => user._id !== item._id)
        );
        toast.success("User deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(keyword)
  );

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <h4 style={{ marginBottom: "-10px" }}>All users</h4>
          <br />

          <Input
            placeholder='Search'
            type='search'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            itemLayout='horizontal'
            dataSource={filteredUsers}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => handleEdit(item._id)}>edit</a>,
                  <a
                    onClick={() => handleDelete(item)}
                    disabled={item._id === auth.user._id}>
                    delete
                  </a>,
                ]}>
                <Avatar src={item.image?.url}>{item.name[0]}</Avatar>
                <List.Item.Meta title={item.name} style={{ marginLeft: 10 }} />
                <List.Item.Meta
                  description={item.email}
                  style={{ marginLeft: 10 }}
                />
                <List.Item.Meta
                  description={item.role}
                  style={{ marginLeft: 10 }}
                />
                <List.Item.Meta
                  description={`${item.posts.length} post`}
                  style={{ marginLeft: 10 }}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AllUsers;
