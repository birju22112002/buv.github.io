/** @format */

import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Link from "next/link";

const FullWidthImage = ({ title, subtitle, fullWidthImage }) => (
  <>
    <img
      src={fullWidthImage || "/images/image1.jpeg"}
      alt={title || "CMS"}
      style={{
        width: "100%",
        height: "500px",
        overFlow: "hidden",
        objectFit: "cover",
      }}
    />

    <div
      style={{
        textAlign: "center",
        marginTop: "-420px",
        fontSize: "75px",
        textShadow: "2px 2px 4px #000000",
        color: "white",
      }}>
      <h1>{title || "CMS"}</h1>
      <br />
      <p style={{ fontSize: "18px", marginTop: "-100px" }}>
        {subtitle || "Content Management System"}
      </p>
      <Link href='/pages/subscriber'>
        <Button type='primary' size='large' icon={<SendOutlined />}>
          Explore
        </Button>
      </Link>
    </div>
  </>
);

export default FullWidthImage;
