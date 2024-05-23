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
import styles from "./AllUsers.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

const AllUsers = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const { theme } = useContext(ThemeContext);

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
    if (auth?.user && item._id === auth.user._id) {
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

  const inputStyle = {
    backgroundColor: theme === "dark" ? "transparent" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    borderColor: theme === "dark" ? "#555" : "#d9d9d9",
  };

  return (
    <AdminLayout>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={24} style={{ padding: "20px" }}>
          <h4
            style={{
              fontSize: 20,
              marginBottom: "-10px",
              color: theme === "dark" ? "#fff" : "#000",
            }}>
            <b> All users</b>
          </h4>
          <br />

          <Input
            placeholder='Search'
            type='search'
            style={inputStyle}
            className={theme === "dark" ? styles.darkInput : ""}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            itemLayout='horizontal'
            dataSource={filteredUsers}
            renderItem={(item) => (
              <>
                <List.Item
                  className={styles.listItem}
                  actions={[
                    <a
                      onClick={() => handleEdit(item._id)}
                      style={{
                        color: theme === "dark" ? "#fff" : "#000",
                      }}>
                      edit
                    </a>,
                    <a
                      onClick={() => handleDelete(item)}
                      style={{
                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                      disabled={auth?.user && item._id === auth.user._id}>
                      delete
                    </a>,
                  ]}>
                  <Avatar
                    src={item.image?.url}
                    className={theme === "dark" ? styles.avatarDark : ""}>
                    {item.name[0]}
                  </Avatar>
                  <List.Item.Meta
                    title={
                      <span
                        className={
                          theme === "dark" ? styles.textDark : styles.textLight
                        }>
                        {item.name}
                      </span>
                    }
                    style={{ marginLeft: 10 }}
                  />
                  <List.Item.Meta
                    description={
                      <span
                        className={
                          theme === "dark" ? styles.textDark : styles.textLight
                        }>
                        {item.email}
                      </span>
                    }
                    style={{ marginLeft: 10 }}
                  />
                  <List.Item.Meta
                    description={
                      <span
                        className={
                          theme === "dark" ? styles.textDark : styles.textLight
                        }>
                        {item.role}
                      </span>
                    }
                    style={{ marginLeft: 10 }}
                  />
                  <List.Item.Meta
                    description={
                      <span
                        className={
                          theme === "dark" ? styles.textDark : styles.textLight
                        }>{`${item.posts.length} post`}</span>
                    }
                    style={{ marginLeft: 10 }}
                  />
                </List.Item>

                {/* Line break between list items */}
                {theme === "dark" && <div className={styles.lineBreak}></div>}
              </>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AllUsers;
