/** @format */
"use client";
import { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Input, List } from "antd";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/auth";
import { ThemeContext } from "../../../context/ThemeContext";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { toast } from "react-hot-toast";
import styles from "./Comments.module.css";

dayjs.extend(localizedFormat);

function Comments() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  // hook
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
      getTotal();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (page === 1) return;
    if (auth?.token) fetchComments();
  }, [page]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/comments/${page}`);
      setComments((prevComments) => [...prevComments, ...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/comment-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/comment/${comment._id}`);
      if (data?.ok) {
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== comment._id)
        );
        setTotal((prevTotal) => prevTotal - 1);
        toast.success("Comment deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );

  const listStyle = {
    backgroundColor: theme === "dark" ? "#000" : "#fff",
  };

  const listItemStyle = {
    color: theme === "dark" ? "#fff" : "#000",
  };
  const inputStyle = {
    backgroundColor: theme === "dark" ? "transparent" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    borderColor: theme === "dark" ? "#555" : "#d9d9d9",
  };

  return (
    <AdminLayout>
      <Row className={styles.container}>
        <Col span={24}>
          <h1 style={{ marginTop: 15, color: listItemStyle.color }}>
            {comments?.length} Comments
          </h1>

          <Input
            placeholder='Search'
            type='search'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            style={{ ...inputStyle, marginBottom: 15 }}
            className={theme === "dark" ? styles.darkInput : ""}
          />
          <List
            itemLayout='horizontal'
            dataSource={filteredComments}
            style={listStyle}
            renderItem={(item) => (
              <>
                <List.Item
                  actions={[
                    <Link
                      href={`/pages/posts/${item?.postId?.slug}#${item._id}`}
                      style={listItemStyle}>
                      view
                    </Link>,
                    <a onClick={() => handleDelete(item)} style={listItemStyle}>
                      delete
                    </a>,
                  ]}
                  className={styles.listItem}
                  style={listStyle}>
                  <List.Item.Meta
                    description={
                      <span style={listItemStyle}>
                        On {item?.postId?.title} | {item?.postedBy?.name} |{" "}
                        {dayjs(item.createdAt).format("L LT")}
                      </span>
                    }
                    title={<span style={listItemStyle}>{item.content}</span>}
                  />
                </List.Item>
                {theme === "dark" && <div className={styles.lineBreak}></div>}
              </>
            )}
          />
          {/* <pre>{JSON.stringify(comments, null, 4)}</pre> */}
        </Col>
      </Row>
      {page * 6 < total && (
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button
              size='large'
              type='primary'
              loading={loading}
              onClick={() => setPage(page + 1)}>
              Load More
            </Button>
          </Col>
        </Row>
      )}
    </AdminLayout>
  );
}

export default Comments;
