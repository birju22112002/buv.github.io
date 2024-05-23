/** @format */
"use client";
import { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Input, Avatar } from "antd";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import Media from "../media/MediaLibrary";
import { MediaContext } from "../../context/media";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ProfileUpdate.module.css";

const { Option } = Select;

const ProfileUpdate = ({ title, page = "admin" }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const userId = searchParams.get("id") || auth?.user?._id;
        if (!userId) return; // Exit if no userId is available
        const { data } = await axios.get(`/current-user/${userId}`);

        if (data) {
          console.log("current_user", data);
          setName(data.name);
          setEmail(data.email);
          setWebsite(data.website);
          setRole(data.role);
          setId(data._id);
          setImage(data.image);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch user data");
      }
    };
    if (auth?.token) currentUser();
  }, [auth, searchParams]);

  useEffect(() => {
    if (searchParams.get("routename") === "update-user-by-admin") {
      setShowRoles(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/update-user-by-admin`, {
        id,
        name,
        email,
        password,
        website,
        role,
        image,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("User updated successfully");
        setLoading(false);
        // router.push("pages/admin/users");
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed. Try again.");
      setLoading(false);
    }
  };

  const inputStyle = {
    margin: "10px 0",
    size: "large",
    backgroundColor: theme === "dark" ? "transparent" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    borderColor: theme === "dark" ? "#444" : "#d9d9d9",
  };

  const buttonStyle = {
    margin: "10px 0",
    color: theme === "dark" ? "#fff" : "#000",
    backgroundColor: theme === "dark" ? "transparent" : "#f0f0f0",
  };

  const inputClassName = theme === "dark" ? styles.darkInput : "";
  const selectClassName = theme === "dark" ? styles.darkSelect : "";
  const buttonClassName = theme === "dark" ? styles.darkButton : "";
  const avatarClassName = theme === "dark" ? styles.darkAvatar : "";

  return (
    <Row>
      <Col span={12} offset={6} style={{ padding: "20px" }}>
        <h4
          style={{
            fontSize: 15,
            marginBottom: "-10px",
            color: theme === "dark" ? "#fff" : "#000",
          }}>
          <b>{title}</b>
        </h4>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          {media.selected ? (
            <>
              <div style={{ marginBottom: 15 }}></div>
              <Avatar
                src={media.selected.url}
                size={100}
                className={avatarClassName}
              />
            </>
          ) : image ? (
            <>
              <div style={{ marginBottom: 15 }}></div>
              <Avatar src={image.url} size={100} className={avatarClassName} />
            </>
          ) : (
            ""
          )}
        </div>
        {auth.user?.role !== "Subscriber" && <Media />}
        <Input
          className={inputClassName}
          style={inputStyle}
          size='large'
          placeholder='Full name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className={inputClassName}
          style={inputStyle}
          size='large'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className={inputClassName}
          style={inputStyle}
          size='large'
          placeholder='Website'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <Input.Password
          className={inputClassName}
          style={inputStyle}
          size='large'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showRoles && (
          <Select
            value={role}
            className={selectClassName}
            style={{ ...inputStyle, width: "100%" }}
            onChange={(v) => setRole(v)}>
            <Option value='Subscriber'>Subscriber</Option>
            <Option value='Author'>Author</Option>
            <Option value='Admin'>Admin</Option>
          </Select>
        )}
        <Button
          onClick={handleSubmit}
          type='default'
          className={buttonClassName}
          htmlType='submit'
          style={buttonStyle}
          loading={loading}
          block>
          Submit
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileUpdate;
