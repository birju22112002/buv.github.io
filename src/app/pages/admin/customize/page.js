/** @format */

"use client";
import { useState, useEffect, useContext } from "react";
import { Row, Col, Input, Button, Image, Divider } from "antd";
import Media from "../../../components/media/page";
import { MediaContext } from "../../../context/media";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../../../components/layouts/AdminLayout";
import MediaLibrary from "../../../components/media/MediaLibrary";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./Customize.module.css";

const Customize = () => {
  // context
  const [media, setMedia] = useContext(MediaContext);
  const { theme } = useContext(ThemeContext); // Get the current theme from ThemeContext
  // state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullWidthImage, setFullWidthImage] = useState(null);

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const { data } = await axios.get("/page/home");
      setTitle(data.title || "Default Title");
      setSubtitle(data.subtitle || "Default Subtitle");
      setFullWidthImage(data.fullWidthImage);
      <MediaLibrary page={page} />;
    } catch (err) {
      console.log(err.message || err);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/page", {
        page: "home",
        title,
        subtitle,
        fullWidthImage: media?.selected?._id,
      });
      setLoading(false);
      toast.success("Saved");
      // Reload homepage data after saving
      loadHomepage();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const inputStyle = {
    margin: "20px 0px",
    size: "large",
    backgroundColor: theme === "dark" ? "transparent" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    borderColor: theme === "dark" ? "#444" : "#d9d9d9",
  };

  const buttonStyle = {
    margin: "10px 0px",
    color: theme === "dark" ? "#fff" : "#000",
    backgroundColor: theme === "dark" ? "transparent" : "#f0f0f0",
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              Customize home page
            </h1>
            <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              Set full width image title and subtitle
            </p>
          </Divider>
        </Col>

        <Col span={18}>
          <Media />

          <Input
            style={inputStyle}
            size='large'
            placeholder='Give it a title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            style={inputStyle}
            size='large'
            placeholder='Give it a subtitle'
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <Button
            onClick={handleSave}
            type='default'
            style={buttonStyle}
            loading={loading}
            block>
            Save
          </Button>
        </Col>

        <Col span={6}>
          <div style={{ margin: "40px 0px 0px 20px" }}>
            {media?.selected ? (
              <Image width='100%' src={media.selected.url} />
            ) : fullWidthImage ? (
              <Image width='100%' src={fullWidthImage.url} />
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Customize;
